import React, { useMemo } from "react";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import { Text, IconButton, Card, ActivityIndicator } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { colors } from "../../theme";
import { useProducts } from "@/services/react-query/products";
import { useCart } from "../context/CartContext";

export default function CategoryProducts() {
  const { category } = useLocalSearchParams();
  const router = useRouter();
  const categoryName = Array.isArray(category) ? category[0] : category;
  const displayCategoryName = categoryName ?? "Productos";
  const {
    data: products = [],
    isPending,
    isError,
  } = useProducts();
  const { addToCart } = useCart();

  const filteredProducts = useMemo(() => {
    if (!categoryName) return products;
    return products.filter(
      (product) => product.category.toLowerCase() === categoryName.toLowerCase()
    );
  }, [categoryName, products]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        paddingTop: 60, // espacio superior para notch y margen
      }}
    >
      {/* 🔙 Flecha de regreso */}
      <IconButton
        icon="arrow-left"
        size={28}
        iconColor={colors.primary}
        onPress={() => router.back()}
        style={{
          alignSelf: "flex-start",
          marginBottom: 10,
          backgroundColor: "#fff",
          borderRadius: 30,
          elevation: 2,
        }}
      />

      {/* 🏷️ Encabezado de categoría */}
      <Text
        style={{
          color: colors.primary,
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        {displayCategoryName}
      </Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 12 }}
        renderItem={({ item }) => (
          <Card
            style={{
              width: "48%",
              marginBottom: 16,
              borderRadius: 16,
              overflow: "hidden",
              backgroundColor: "#fff",
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
                style={{ width: "100%", height: 130 }}
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
                    marginBottom: 8,
                  }}
                >
                  ${item.price}
                </Text>
                <TouchableOpacity
                  onPress={() => addToCart(item)}
                  style={{
                    backgroundColor: colors.primary,
                    borderRadius: 8,
                    paddingVertical: 6,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "600" }}>
                    Agregar al carrito
                  </Text>
                </TouchableOpacity>
              </Card.Content>
            </TouchableOpacity>
          </Card>
        )}
        ListEmptyComponent={
          <View
            style={{
              marginTop: 40,
              alignItems: "center",
              paddingHorizontal: 20,
            }}
          >
            {isPending ? (
              <ActivityIndicator
                animating
                color={colors.primary}
                size="large"
              />
            ) : isError ? (
              <Text
                style={{
                  color: "#d9534f",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                No pudimos cargar los productos de esta categoría.
              </Text>
            ) : (
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                No hay productos disponibles para esta categoría.
              </Text>
            )}
          </View>
        }
      />
    </View>
  );
}
