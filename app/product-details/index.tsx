import React from "react";
import {
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Text, Button, IconButton, Card } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "../../theme";
import { useCart } from "../stores/useCartStore";

const featuredProducts = [
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

export default function ProductDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { addToCart } = useCart(); // ✅ Usamos la tienda global

  const product = featuredProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <Text variant="titleMedium" style={{ color: colors.primary }}>
          Producto no encontrado 🥲
        </Text>
        <Button
          onPress={() => router.back()}
          mode="contained"
          style={{ marginTop: 12, backgroundColor: colors.primary }}
        >
          Volver
        </Button>
      </View>
    );
  }

  const similarProducts = featuredProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 20 }}
    >
      <IconButton
        icon="arrow-left"
        size={28}
        iconColor={colors.primary}
        onPress={() => router.back()}
        style={{
          marginBottom: 10,
          marginTop: 20,
          alignSelf: "flex-start",
        }}
      />

      <Image
        source={product.image}
        style={{
          width: "100%",
          height: 250,
          borderRadius: 16,
          marginBottom: 20,
        }}
        resizeMode="contain"
      />

      <Text
        variant="titleLarge"
        style={{
          color: colors.primary,
          fontWeight: "700",
          marginBottom: 8,
        }}
      >
        {product.name}
      </Text>

      <Text
        style={{
          color: "#000",
          fontWeight: "bold",
          fontSize: 18,
          marginBottom: 4,
        }}
      >
        ${product.price}
      </Text>

      <Text style={{ color: "#777", fontSize: 14, marginBottom: 12 }}>
        Categoría: {product.category}
      </Text>

      <Text
        style={{
          color: "#444",
          fontSize: 15,
          lineHeight: 22,
          marginBottom: 20,
        }}
      >
        {product.description}
      </Text>

      {/* 🛒 Botón agregar al carrito */}
      <Button
        mode="contained"
        buttonColor={colors.primary}
        textColor="#fff"
        style={{
          borderRadius: 12,
          paddingVertical: 5,
          marginBottom: 30,
        }}
        onPress={() => {
          addToCart(product);
          console.log(`✅ ${product.name} agregado al carrito`);
        }}
      >
        Agregar al carrito
      </Button>

      {similarProducts.length > 0 && (
        <View>
          <Text
            variant="titleMedium"
            style={{
              color: colors.primary,
              fontWeight: "700",
              fontSize: 20,
              marginBottom: 12,
            }}
          >
            Productos similares
          </Text>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={similarProducts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card
                style={{
                  width: 180,
                  marginRight: 12,
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  elevation: 2,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/product-details",
                      params: { id: item.id },
                    })
                  }
                >
                  <Image
                    source={item.image}
                    style={{
                      width: "100%",
                      height: 130,
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                    }}
                    resizeMode="contain"
                  />
                  <Card.Content style={{ paddingVertical: 8 }}>
                    <Text
                      style={{
                        color: colors.primary,
                        fontWeight: "600",
                        fontSize: 14,
                        marginBottom: 4,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: 14,
                      }}
                    >
                      ${item.price}
                    </Text>
                  </Card.Content>
                </TouchableOpacity>
              </Card>
            )}
          />
        </View>
      )}
    </ScrollView>
  );
}
