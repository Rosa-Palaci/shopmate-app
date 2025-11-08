import React, { useMemo } from "react";
import {
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  Text,
  Button,
  IconButton,
  Card,
  ActivityIndicator,
} from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "../../theme";
import { useCart } from "../context/CartContext";
import { useProducts, getSimilarProducts } from "@/services/react-query/products";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const productId = Array.isArray(id) ? id[0] : id;
  const { addToCart } = useCart();
  const {
    data: products = [],
    isPending,
    isError,
  } = useProducts();

  const product = useMemo(() => {
    if (!productId) return undefined;
    return products.find((item) => item.id === productId);
  }, [productId, products]);

  const similarProducts = useMemo(() => {
    if (!product) return [];
    return getSimilarProducts(product, products);
  }, [product, products]);

  if (isPending) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator animating color={colors.primary} size="large" />
        <Text style={{ marginTop: 12, color: colors.primary }}>
          Cargando detalles del producto...
        </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
          paddingHorizontal: 24,
        }}
      >
        <Text
          variant="titleMedium"
          style={{ color: "#d9534f", textAlign: "center", marginBottom: 12 }}
        >
          No pudimos cargar la información del producto.
        </Text>
        <Button
          onPress={() => router.back()}
          mode="contained"
          style={{ backgroundColor: colors.primary }}
        >
          Volver
        </Button>
      </View>
    );
  }

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
