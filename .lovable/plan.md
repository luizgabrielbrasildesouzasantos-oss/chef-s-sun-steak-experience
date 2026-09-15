# Carne de Sol do Chef — website, pedidos e gestão

## Objetivo
Criar uma experiência gastronômica premium, mobile-first e totalmente funcional para descoberta, cardápio, reservas, pedidos online e administração do restaurante.

## Direção visual
- Interface cinematográfica em preto quase absoluto e carvão, com off-white e dourado usado apenas em detalhes.
- Títulos serifados editoriais e textos sans-serif contemporâneos.
- Fotografia gastronômica quente como protagonista, composições assimétricas e bastante espaço negativo.
- Nada de aparência SaaS, excesso de cards, gradientes artificiais, sombras pesadas ou bordas muito arredondadas.
- Animações discretas de reveal, parallax leve, zoom de imagem e transições, sempre respeitando redução de movimento.

## Site público
- Página inicial longa com cabeçalho transparente/fixo, hero cinematográfico, experiência à mesa, favoritos, categorias, história, galeria com lightbox, ambiente, reserva, localização, horários, Instagram e rodapé.
- Páginas próprias para Cardápio, Reservas, Localização, Privacidade e Termos, com navegação consistente e metadados exclusivos.
- Informações ainda não fornecidas — endereço, telefone, horários, Instagram e textos históricos — aparecerão como campos pendentes de cadastro, sem dados inventados.
- Imagens gastronômicas coesas serão produzidas para viabilizar a direção visual; o painel permitirá substituí-las pelas fotos oficiais.

## Cardápio e pedido online
- Busca, categorias, produtos, disponibilidade e destaques vindos do banco.
- Itens iniciais marcados claramente como conteúdo de demonstração, sem inventar nomes comerciais, ingredientes ou preços reais.
- Carrinho com quantidades, subtotal e taxa aplicável; acesso flutuante no celular.
- Checkout em etapas: cliente, entrega/retirada/local, endereço, pagamento, revisão e confirmação com número do pedido.
- Valores, disponibilidade e totais serão recalculados no servidor antes da criação do pedido.

## Reservas
- Formulário com nome, telefone, data, horário, pessoas e observações.
- Validação no servidor e confirmação visual.
- Administração dos estados pendente, confirmada, concluída e cancelada.

## Administração
- Área `/admin` autenticada, com visual editorial próprio da marca.
- Painel com indicadores reais do banco e visão de pedidos em tempo real.
- Gestão de pedidos, cardápio, categorias, produtos, clientes, reservas, pagamentos, cupons, horários, configurações e acessos administrativos.
- Produtos históricos serão inativados em vez de apagados.

## Banco, segurança e pagamentos
- Estrutura relacional para restaurante, perfis, papéis, categorias, produtos, imagens, clientes, endereços, pedidos, itens, pagamentos, eventos, reservas, cupons, horários e configurações.
- Papéis administrativos em tabela separada, proteção por linha, permissões mínimas e rotas administrativas protegidas.
- Cliente nunca poderá definir preço, total, estado de pagamento, estado administrativo ou permissões.
- Camada de pagamento desacoplada para Mercado Pago ou Stripe, com Pix/cartão conforme o provedor escolhido.
- Nenhum dado de cartão será armazenado. Confirmação financeira dependerá de webhook assinado.
- Nesta entrega, sem credenciais do provedor, o checkout ficará pronto em modo de configuração, sem cobrar de verdade.

## SEO, acessibilidade e desempenho
- Títulos e descrições únicos, Open Graph, canonical, robots, sitemap e dados estruturados Restaurant somente com fatos disponíveis.
- Contraste, foco visível, navegação por teclado, labels, textos alternativos e redução de movimento.
- Imagens responsivas e carregadas sob demanda, componentes divididos por responsabilidade e JavaScript contido.
- Revisão visual desktop e nos tamanhos móveis 390×844, 393×852 e 430×932, incluindo overflow e legibilidade.

## Ordem de implementação
1. Sistema visual, imagens e estrutura compartilhada.
2. Banco, autenticação, políticas e conteúdo editável.
3. Site público, páginas e animações.
4. Cardápio, carrinho, checkout e confirmação.
5. Reservas e painel administrativo.
6. SEO, acessibilidade, segurança e validação responsiva final.

## Limites desta etapa
- A referência visual anexada não está disponível nos arquivos recebidos; a criação seguirá fielmente a direção detalhada no briefing.
- Integração financeira real exigirá posteriormente a escolha do provedor, credenciais e regras reais de taxa/entrega.
- Mapa, Instagram e dados comerciais reais só serão publicados após cadastro; nenhum endereço, contato ou URL será inventado.
