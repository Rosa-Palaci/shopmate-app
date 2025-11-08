import { useQuery } from "@tanstack/react-query";
import type { ImageSourcePropType } from "react-native";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image: ImageSourcePropType;
};

const productMocks: Product[] = [
  {
    id: "p1",
    name: "Bocina Bluetooth",
    price: 899,
    category: "Tecnología",
    description: "Bocina portátil con conexión Bluetooth y sonido envolvente.",
    image: require("../../assets/images/products/bocina.avif"),
  },
  {
    id: "p2",
    name: "Gorro de Invierno",
    price: 249,
    category: "Ropa",
    description: "Gorro tejido con diseño moderno, ideal para días fríos.",
    image: require("../../assets/images/products/gorro.avif"),
  },
  {
    id: "p3",
    name: "Lámpara de Escritorio",
    price: 499,
    category: "Hogar",
    description:
      "Lámpara LED con brazo flexible y brillo ajustable para estudio u oficina.",
    image: require("../../assets/images/products/lampara.avif"),
  },
  {
    id: "p4",
    name: "Perfume Floral",
    price: 1299,
    category: "Accesorios",
    description:
      "Fragancia elegante con notas florales y toques de vainilla, perfecta para uso diario.",
    image: require("../../assets/images/products/perfume.avif"),
  },
  {
    id: "p5",
    name: "Playera Rosa Claro",
    price: 399,
    category: "Ropa",
    description:
      "Playera de algodón color rosa claro, cómoda y perfecta para cualquier ocasión.",
    image: require("../../assets/images/products/playera.avif"),
  },
  {
    id: "p6",
    name: "Vestido Dorado",
    price: 799,
    category: "Ropa",
    description:
      "Vestido elegante color dorado, ideal para eventos especiales o de noche.",
    image: require("../../assets/images/products/vestido-dorado.avif"),
  },
  {
    id: "p7",
    name: "Lavadora EcoSmart",
    price: 6899,
    category: "Hogar",
    description:
      "Lavadora de carga frontal con eficiencia energética A+, diseño compacto y moderno.",
    image: require("../../assets/images/products/lavadora.avif"),
  },
];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchProducts = async (): Promise<Product[]> => {
  await wait(400);
  return productMocks;
};

export const productsKeys = {
  all: ["products"] as const,
};

export function useProducts() {
  return useQuery({
    queryKey: productsKeys.all,
    queryFn: fetchProducts,
  });
}

export function getProductById(id: string) {
  return productMocks.find((product) => product.id === id);
}

export function getSimilarProducts(product: Product, products: Product[]) {
  return products.filter(
    (item) => item.category === product.category && item.id !== product.id
  );
}
