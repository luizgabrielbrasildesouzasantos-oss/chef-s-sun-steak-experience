import { createServerFn } from "@tanstack/react-start";

// IMPORTANTE: identifica sua aplicação nas chamadas ao Nominatim e ao
// Overpass. O Nominatim exige isso na política de uso deles; o Overpass
// também tende a bloquear requisições sem identificação.
// Troque o e-mail abaixo pelo seu.
// https://operations.osmfoundation.org/policies/nominatim/
const APP_USER_AGENT = "LeadHunter/1.0 (contato: fabioeanieli@gmail,com)";

const OVERPASS_ENDPOINT = "https://overpass-api.de/api/interpreter";
const NOMINATIM_ENDPOINT = "https://nominatim.openstreetmap.org/search";

const ALL_STATES = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS",
  "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC",
  "SE", "SP", "TO",
];

// Mapa de nicho -> tags do OpenStreetMap. OSM não tem uma tag exata para
// "clínica de estética" ou "barbearia", então usamos a aproximação mais
// próxima disponível (ver aviso no README/chat).
const CATEGORY_TAGS: Record<string, Array<[string, string]>> = {
  "Clínica de estética": [["shop", "beauty"]],
  Barbearia: [["shop", "hairdresser"]],
  Restaurante: [["amenity", "restaurant"]],
  "Salão de beleza": [["shop", "beauty"]],
  "Clínica odontológica": [["amenity", "dentist"]],
  "Oficina mecânica": [["shop", "car_repair"]],
};

function tagsForCategory(category: string): Array<[string, string]> {
  if (category !== "Todos os nichos" && CATEGORY_TAGS[category]) {
    return CATEGORY_TAGS[category]!;
  }

  // "Todos os nichos": une todas as tags conhecidas, sem duplicar.
  const seen = new Set<string>();
  const all: Array<[string, string]> = [];
  for (const pairs of Object.values(CATEGORY_TAGS)) {
    for (const pair of pairs) {
      const key = pair.join("=");
      if (!seen.has(key)) {
        seen.add(key);
        all.push(pair);
      }
    }
  }
  return all;
}

export type PlaceLead = {
  id: string;
  name: string;
  category: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  website: string | null;
  mapsUrl: string;
  lastSeen: string;
};

type SearchInput = {
  category: string;
  state: string; // "Brasil inteiro" ou uma UF (ex: "SP")
  city: string;
};

type OverpassElement = {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
};

type Bbox = { south: number; west: number; north: number; east: number };

async function geocodeCity(query: string): Promise<Bbox | null> {
  const url = `${NOMINATIM_ENDPOINT}?format=json&limit=1&countrycodes=br&q=${encodeURIComponent(
    query
  )}`;

  const response = await fetch(url, {
    headers: { "User-Agent": APP_USER_AGENT },
  });

  if (!response.ok) return null;

  const results = (await response.json()) as Array<{
    boundingbox: [string, string, string, string]; // [south, north, west, east]
  }>;

  const first = results[0];
  if (!first) return null;

  const [south, north, west, east] = first.boundingbox.map(Number);
  return { south: south!, west: west!, north: north!, east: east! };
}

function buildOverpassQuery(
  tagPairs: Array<[string, string]>,
  areaFilter: string
): string {
  const statements = tagPairs
    .flatMap(([key, value]) => [
      `node["${key}"="${value}"]${areaFilter};`,
      `way["${key}"="${value}"]${areaFilter};`,
    ])
    .join("\n  ");

  return `[out:json][timeout:50];\n(\n  ${statements}\n);\nout center 40;`;
}

const OVERPASS_MIRRORS = [
  OVERPASS_ENDPOINT,
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
];

// Tenta cada servidor público do Overpass; se um estiver ocupado (429/504)
// ou falhar, passa para o próximo. Nunca repassa o HTML bruto do erro.
async function runOverpassQuery(query: string): Promise<OverpassElement[]> {
  let lastStatus = 0;
  for (const endpoint of OVERPASS_MIRRORS) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": APP_USER_AGENT,
        },
        body: `data=${encodeURIComponent(query)}`,
        signal: AbortSignal.timeout(55000),
      });
      if (!response.ok) {
        lastStatus = response.status;
        continue;
      }
      const data = (await response.json()) as { elements?: OverpassElement[] };
      return data.elements ?? [];
    } catch {
      continue;
    }
  }
  throw new Error(
    lastStatus === 429 || lastStatus === 504
      ? "Os servidores gratuitos do OpenStreetMap estão sobrecarregados agora. Tente novamente em alguns minutos ou busque por uma cidade específica."
      : "Não foi possível consultar o OpenStreetMap agora. Tente novamente em instantes."
  );
}

// Normaliza telefones para evitar duplicar o "55" na hora de abrir o WhatsApp
// (alguns registros do OSM já vêm com o código do país incluso).
function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("55") && digits.length > 11) {
    return digits.slice(2);
  }
  return digits;
}

function elementToLead(
  element: OverpassElement,
  fallback: { category: string; city: string; state: string }
): PlaceLead | null {
  const tags = element.tags ?? {};
  const name = tags["name"];
  if (!name) return null; // Sem nome não é um lead utilizável.

  const lat = element.lat ?? element.center?.lat;
  const lon = element.lon ?? element.center?.lon;

  const addressParts = [
    tags["addr:street"],
    tags["addr:housenumber"],
    tags["addr:suburb"],
    tags["addr:city"],
  ].filter(Boolean);

  const phoneRaw = tags["phone"] ?? tags["contact:phone"] ?? "";
  const website = tags["website"] ?? tags["contact:website"] ?? null;

  const mapsUrl =
    lat != null && lon != null
      ? `https://www.google.com/maps?q=${lat},${lon}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${name} ${fallback.city}`
        )}`;

  return {
    id: `${element.type}/${element.id}`,
    name,
    category:
      tags["shop"] === "beauty"
        ? fallback.category // OSM não distingue estética de salão de beleza
        : fallback.category,
    city: tags["addr:city"] || fallback.city,
    state: tags["addr:state"] || fallback.state,
    address: addressParts.join(", "),
    phone: phoneRaw ? normalizePhone(phoneRaw) : "",
    website,
    mapsUrl,
    lastSeen: "Agora",
  };
}

// Busca leads gratuitamente no OpenStreetMap (Overpass API), sem chave de
// API. Cobre o Brasil inteiro fazendo uma consulta por estado quando nenhum
// estado/cidade específico é escolhido.
export const searchLeadsServerFn = createServerFn({ method: "POST" })
  .validator((data: SearchInput) => data)
  .handler(async ({ data }): Promise<PlaceLead[]> => {
    const tagPairs = tagsForCategory(data.category);
    const category = data.category === "Todos os nichos" ? "Empresa" : data.category;

    const rawResults: OverpassElement[] = [];

    if (data.city.trim()) {
      // Cidade específica: geocodifica com o Nominatim e busca na bbox.
      const bbox = await geocodeCity(
        data.state !== "Brasil inteiro"
          ? `${data.city}, ${data.state}, Brasil`
          : `${data.city}, Brasil`
      );

      if (!bbox) {
        throw new Error(
          `Não encontrei "${data.city}" no OpenStreetMap. Tente conferir a grafia.`
        );
      }

      const filter = `(${bbox.south},${bbox.west},${bbox.north},${bbox.east})`;
      const query = buildOverpassQuery(tagPairs, filter);
      rawResults.push(...(await runOverpassQuery(query)));
    } else {
      const targetStates =
        data.state !== "Brasil inteiro" ? [data.state] : ALL_STATES;

      // Roda poucas consultas em paralelo por vez: o Overpass é um serviço
      // público e gratuito, então evitamos sobrecarregá-lo.
      const concurrency = 2;
      const errors: string[] = [];

      for (let i = 0; i < targetStates.length; i += concurrency) {
        const batch = targetStates.slice(i, i + concurrency);
        const batchResults = await Promise.allSettled(
          batch.map(async (uf) => {
            const filter = `(area.searchArea)`;
            const query = `[out:json][timeout:50];\narea["ISO3166-2"="BR-${uf}"]["admin_level"="4"]->.searchArea;\n(\n  ${tagPairs
              .flatMap(([key, value]) => [
                `node["${key}"="${value}"]${filter};`,
                `way["${key}"="${value}"]${filter};`,
              ])
              .join("\n  ")}\n);\nout center 40;`;

            return runOverpassQuery(query);
          })
        );

        for (const result of batchResults) {
          if (result.status === "fulfilled") {
            rawResults.push(...result.value);
          } else {
            errors.push(
              result.reason instanceof Error
                ? result.reason.message
                : String(result.reason)
            );
          }
        }
      }

      // Se TODAS as consultas falharam, algo está errado de verdade (rede,
      // bloqueio, timeout) — melhor mostrar o erro do que fingir "0 leads".
      if (rawResults.length === 0 && errors.length > 0) {
        throw new Error(
          `Falha ao consultar o OpenStreetMap em todos os estados. Detalhe: ${errors[0]}`
        );
      }
    }

    const seen = new Set<string>();
    const leads: PlaceLead[] = [];

    for (const element of rawResults) {
      const lead = elementToLead(element, {
        category,
        city: data.city,
        state: data.state !== "Brasil inteiro" ? data.state : "",
      });
      if (!lead || seen.has(lead.id)) continue;
      seen.add(lead.id);
      leads.push(lead);
    }

    return leads;
  });
