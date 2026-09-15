import heroImage from "@/assets/hero-carne-sol.jpg";
import experienceImage from "@/assets/experience-carne-sol.jpg";
import environmentImage from "@/assets/ambiente-restaurante.jpg";
import drinksImage from "@/assets/drinks-mesa.jpg";
import petiscosImage from "@/assets/petiscos-brasileiros.jpg";
import dessertImage from "@/assets/sobremesa-brasileira.jpg";

export const images = { heroImage, experienceImage, environmentImage, drinksImage, petiscosImage, dessertImage };

export type MenuItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number | null;
  image: string;
  featured?: boolean;
  demo: true;
};

export const categories = ["Todos", "Carne de Sol", "Pratos Executivos", "Petiscos", "Drinks", "Sobremesas"];

export const demoMenu: MenuItem[] = [
  { id: "demo-carne", category: "Carne de Sol", name: "Prato em cadastro", description: "Nome, composição e preço serão publicados após o cadastro oficial no painel.", price: null, image: heroImage, featured: true, demo: true },
  { id: "demo-executivo", category: "Pratos Executivos", name: "Prato executivo em cadastro", description: "Conteúdo demonstrativo. Consulte a equipe para disponibilidade e valores.", price: null, image: experienceImage, featured: true, demo: true },
  { id: "demo-petisco", category: "Petiscos", name: "Petisco em cadastro", description: "Conteúdo demonstrativo aguardando informações oficiais do restaurante.", price: null, image: petiscosImage, featured: true, demo: true },
  { id: "demo-drink", category: "Drinks", name: "Drink em cadastro", description: "Carta de bebidas aguardando cadastro oficial.", price: null, image: drinksImage, featured: true, demo: true },
  { id: "demo-sobremesa", category: "Sobremesas", name: "Sobremesa em cadastro", description: "Receita e valor serão publicados pela equipe do restaurante.", price: null, image: dessertImage, featured: true, demo: true },
];
