import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { Text, Card, Searchbar } from "react-native-paper";
import { useRouter } from "expo-router";
import { colors } from "../../theme";

export default function Catalog() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const categories = [
    {
      id: "1",
      name: "Mujer",
      image: require("../../assets/images/categorias/mujer.png"),
    },
    {
      id: "2",
      name: "Hombre",
      image: require("../../assets/images/categorias/hombre.png"),
    },
    {
      id: "3",
      name: "Niños y niñas",
      image: require("../../assets/images/categorias/ninos.png"),
    },
    {
      id: "4",
      name: "Bebés 0 - 4 años",
      image: require("../../assets/images/categorias/bebes.png"),
    },
    {
      id: "5",
      name: "Zapatos",
      image: require("../../assets/images/categorias/zapatos.png"),
    },
    {
      id: "6",
      name: "Belleza",
      image: require("../../assets/images/categorias/belleza.png"),
    },
    {
      id: "7",
      name: "Relojes, lentes y joyería",
      image: require("../../assets/images/categorias/relojes.png"),
    },
    {
      id: "8",
      name: "Deportes",
      image: require("../../assets/images/categorias/deportes.png"),
    },
    {
      id: "9",
      name: "Electrónica",
      image: require("../../assets/images/categorias/electronica.png"),
    },
    {
      id: "10",
      name: "Hogar",
      image: require("../../assets/images/categorias/hogar.png"),
    },
    {
      id: "11",
      name: "Línea blanca y electrodomésticos",
      image: require("../../assets/images/categorias/linea-blanca.png"),
    },
    {
      id: "12",
      name: "Muebles",
      image: require("../../assets/images/categorias/muebles.png"),
    },
    {
      id: "13",
      name: "Juguetes",
      image: require("../../assets/images/categorias/juguetes.png"),
    },
    {
      id: "14",
      name: "Videojuegos",
      image: require("../../assets/images/categorias/videojuegos.png"),
    },
    {
      id: "15",
      name: "Autos y motos",
      image: require("../../assets/images/categorias/autos.png"),
    },
    {
      id: "16",
      name: "Vinos y gourmet",
      image: require("../../assets/images/categorias/vinos.png"),
    },
    {
      id: "17",
      name: "Mascotas",
      image: require("../../assets/images/categorias/mascotas.png"),
    },
    {
      id: "18",
      name: "Librería y papelería",
      image: require("../../assets/images/categorias/libreria.png"),
    },
    {
      id: "19",
      name: "Outlet Liverpool",
      image: require("../../assets/images/categorias/outlet.png"),
    },
    {
      id: "20",
      name: "Halloween y día de muertos",
      image: require("../../assets/images/categorias/halloween.png"),
    },
    {
      id: "21",
      name: "Navidad",
      image: require("../../assets/images/categorias/navidad.png"),
    },
  ];

  // 🔍 Filtro por texto del buscador
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleCategoryPress = (categoryName: string) => {
    router.push({
      pathname: "/category-products",
      params: { category: categoryName },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* 🔍 Buscador */}
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 10,
          marginBottom: 8,
        }}
      >
        <Searchbar
          placeholder="Buscar categorías..."
          value={query}
          onChangeText={setQuery}
          style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            elevation: 2,
          }}
          inputStyle={{ fontSize: 16 }}
          iconColor={colors.primary}
        />
      </View>

      {/* 📦 Lista de categorías */}
      <FlatList
        data={filteredCategories}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleCategoryPress(item.name)}
            style={{
              flex: 1,
              marginVertical: 8,
              marginHorizontal: 4,
            }}
          >
            <Card
              style={{
                borderRadius: 16,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
                height: 140,
                padding: 8,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 3,
                shadowOffset: { width: 0, height: 2 },
                elevation: 2,
              }}
            >
              {/* 🖼️ Imagen (espacio reservado) */}
              <Image
                source={item.image}
                resizeMode="contain"
                style={{
                  width: "75%",
                  height: 60,
                  marginBottom: 6,
                }}
              />
              <Text
                style={{
                  color: "#000",
                  fontWeight: "600",
                  textAlign: "center",
                  fontSize: 14,
                }}
              >
                {item.name}
              </Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
