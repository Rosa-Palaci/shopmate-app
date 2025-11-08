import React from "react";
import { View } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { colors } from "../../theme";

export default function CategoryProducts() {
  const { category } = useLocalSearchParams();
  const router = useRouter();

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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colors.primary,
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          {category}
        </Text>

        <Text style={{ color: "#555", fontSize: 16, textAlign: "center" }}>
          Aquí se mostrarán los productos de la categoría seleccionada.
        </Text>
      </View>
    </View>
  );
}
