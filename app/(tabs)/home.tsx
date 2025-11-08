import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  Text,
  Searchbar,
  Button,
  IconButton,
  FAB,
  ActivityIndicator,
} from "react-native-paper";
import { useRouter } from "expo-router";
import { colors } from "../../theme";
import { useCart } from "../context/CartContext";
import { useProducts, type Product } from "@/services/react-query/products";

const { width } = Dimensions.get("window");

// 🖼️ Carrusel local
const carouselImages = [
  require("../../assets/images/banner1.png"),
  require("../../assets/images/banner2.png"),
  require("../../assets/images/banner3.png"),
  require("../../assets/images/banner4.png"),
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todo");
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const {
    data: products = [],
    isPending,
    isError,
  } = useProducts();

  // 🎠 Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % carouselImages.length;
      scrollRef.current?.scrollTo({
        x: nextIndex * (width * 0.85),
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const categories = useMemo(() => {
    const unique = new Set(products.map((product) => product.category));
    return ["Todo", ...Array.from(unique)];
  }, [products]);

  useEffect(() => {
    if (selectedCategory !== "Todo" && !categories.includes(selectedCategory)) {
      setSelectedCategory("Todo");
    }
  }, [categories, selectedCategory]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchQuery = product.name
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchCategory =
        selectedCategory === "Todo" || product.category === selectedCategory;
      return matchQuery && matchCategory;
    });
  }, [products, query, selectedCategory]);

  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* 🔍 Header fijo */}
      <View
        style={{
          marginTop: 60,
          marginHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Searchbar
          placeholder="Buscar productos..."
          value={query}
          onChangeText={setQuery}
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderRadius: 16,
            elevation: 2,
          }}
          iconColor={colors.primary}
          inputStyle={{ fontSize: 16 }}
        />

        <IconButton
          icon="cart-outline"
          iconColor={colors.primary}
          size={28}
          onPress={() => router.push("/cart")}
          style={{ marginLeft: 8 }}
        />
      </View>

      {/* 🔄 Scroll principal */}
      <FlatList
        ListHeaderComponent={
          <>
            {/* 🎠 Carrusel */}
            <View style={{ marginTop: 20, alignItems: "center" }}>
              <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                {carouselImages.map((img, index) => (
                  <Image
                    key={index}
                    source={img}
                    style={{
                      width: width * 0.85,
                      height: 160,
                      borderRadius: 25,
                      marginHorizontal: 10,
                    }}
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>

              {/* ⭕ Indicadores */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 8,
                }}
              >
                {carouselImages.map((_, i) => (
                  <View
                    key={i}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      marginHorizontal: 4,
                      backgroundColor:
                        i === currentIndex ? colors.primary : "#f5b5b5",
                    }}
                  />
                ))}
              </View>
            </View>

            {/* 🏷️ Productos recomendados */}
            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: 25,
                borderBottomWidth: 1,
                borderBottomColor: "#f4caca",
                paddingBottom: 10,
              }}
            >
              <Text
                variant="titleLarge"
                style={{
                  color: colors.primary,
                  fontWeight: "700",
                  fontSize: 22,
                  marginBottom: 10,
                }}
              >
                Productos recomendados
              </Text>

              {isPending && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 12,
                    gap: 8,
                  }}
                >
                  <ActivityIndicator animating color={colors.primary} />
                  <Text style={{ color: colors.primary }}>
                    Cargando productos...
                  </Text>
                </View>
              )}

              {isError && (
                <Text style={{ color: "#d9534f", marginBottom: 12 }}>
                  No pudimos cargar los productos. Intenta nuevamente en unos
                  momentos.
                </Text>
              )}

              {/* Filtros */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    mode={selectedCategory === cat ? "contained" : "outlined"}
                    onPress={() => setSelectedCategory(cat)}
                    textColor={
                      selectedCategory === cat ? "#fff" : colors.primary
                    }
                    buttonColor={
                      selectedCategory === cat ? colors.primary : "#fff"
                    }
                    style={{
                      borderRadius: 20,
                      marginRight: 10,
                      borderColor: colors.primary,
                    }}
                  >
                    {cat}
                  </Button>
                ))}
              </ScrollView>
            </View>
          </>
        }
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2} // 🧩 Dos columnas
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 120,
          paddingTop: 15,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              width: (width - 48) / 2, // Ajuste automático de ancho
              marginBottom: 20,
              backgroundColor: "#fff",
              borderRadius: 16,
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
              overflow: "hidden",
            }}
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
            <View style={{ padding: 8 }}>
              {/* 🔗 Al presionar el nombre → Detalle */}
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "../product-details",
                    params: { id: item.id },
                  })
                }
              >
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
              </TouchableOpacity>
              <Text
                style={{
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: 14,
                  marginBottom: 6,
                }}
              >
                ${item.price}
              </Text>
              <Button
                mode="contained"
                buttonColor={colors.primary}
                textColor="#fff"
                style={{ borderRadius: 8, paddingVertical: 1 }}
                onPress={() => handleAddToCart(item)}
              >
                Agregar
              </Button>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View
            style={{
              marginTop: 40,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 32,
            }}
          >
            {isPending ? (
              <ActivityIndicator animating color={colors.primary} size="large" />
            ) : isError ? (
              <Text
                style={{
                  color: "#d9534f",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                Ocurrió un problema al cargar los productos.
              </Text>
            ) : (
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                No encontramos productos para tu búsqueda.
              </Text>
            )}
          </View>
        }
      />

      {/* 💬 FAB Asistente */}
      <FAB
        icon="chat"
        color="#fff"
        onPress={() => router.push({ pathname: "/assistant", params: {} })}
        style={{
          position: "absolute",
          right: 20,
          bottom: 24,
          backgroundColor: colors.primary,
          elevation: 5,
        }}
      />
    </View>
  );
}
