import type { Coffee } from "./types";

export const SAMPLE_COFFEES: Coffee[] = [
  {
    id: "1",
    name: "Etiope Yirgacheffe",
    description: "Un café vibrante con notas florales y cítricas intensas. Cuerpo ligero y acidez brillante.",
    roastLevel: "Light",
    notes: ["floral", "cítrico", "limón", "té verde"],
    price: 18.50,
    imageUrl: "https://picsum.photos/seed/ethiopia/400/400",
    origin: "Etiopía",
    stock: 25
  },
  {
    id: "2",
    name: "Colombia Huila",
    description: "Clásico perfil colombiano con dulzor de caramelo y notas de chocolate con leche. Acidez media.",
    roastLevel: "Medium",
    notes: ["chocolate", "caramelo", "nuez"],
    price: 15.00,
    imageUrl: "https://picsum.photos/seed/colombia/400/400",
    origin: "Colombia",
    stock: 40
  },
  {
    id: "3",
    name: "Sumatra Mandheling",
    description: "Café terroso y complejo con notas de especias y chocolate oscuro. Cuerpo completo y baja acidez.",
    roastLevel: "Dark",
    notes: ["especias", "chocolate oscuro", "tierra"],
    price: 17.00,
    imageUrl: "https://picsum.photos/seed/sumatra/400/400",
    origin: "Indonesia",
    stock: 15
  },
  {
    id: "4",
    name: "Brasil Cerrado",
    description: "Cuerpo cremoso con notas de chocolate y frutos secos. Muy equilibrado y versátil.",
    roastLevel: "Medium",
    notes: ["chocolate", "maní", "cremoso"],
    price: 14.50,
    imageUrl: "https://picsum.photos/seed/brazil/400/400",
    origin: "Brasil",
    stock: 50
  },
  {
    id: "5",
    name: "Costa Rica Tarrazú",
    description: "Notas de frutas rojas y miel. Acidez cítrica elegante y cuerpo medio.",
    roastLevel: "Medium",
    notes: ["frutas rojas", "miel", "cítrico"],
    price: 19.00,
    imageUrl: "https://picsum.photos/seed/costarica/400/400",
    origin: "Costa Rica",
    stock: 20
  }
];
