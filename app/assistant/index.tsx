import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text, Button, IconButton } from "react-native-paper";
import { useRouter } from "expo-router";
import { colors } from "../../theme";

const options = [
  "Deportes",
  "Belleza",
  "Línea Blanca",
  "Bebés",
  "Mascotas",
  "Hogar",
  "Electrónica",
  "Niños",
  "Ropa para él",
  "Juguetes",
  "Ropa para ella",
  "Accesorios",
  "Maquillaje",
  "Videojuegos",
  "Zapatos",
];

export default function AssistantSurvey() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const toggleOption = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : prev.length < 6
        ? [...prev, option]
        : prev
    );
  };

  const handleContinue = () => {
    if (selected.length >= 3) {
      router.push("/assistant/chat");
    } else {
      alert("Selecciona al menos 3 opciones 🛍️");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        paddingTop: 60,
      }}
    >
      {/* 🔙 Flecha de regreso */}
      <IconButton
        icon="arrow-left"
        size={28}
        iconColor="#fff"
        onPress={() => router.back()}
        style={{
          backgroundColor: colors.primary,
          marginBottom: 10,
        }}
      />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 🩷 Header */}
        <Text
          style={{
            color: colors.primary,
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Mis intereses
        </Text>

        <Text
          style={{
            color: "#000",
            fontSize: 18,
            textAlign: "center",
            marginTop: 8,
            fontWeight: "600",
          }}
        >
          Rosa, ¿qué te gusta comprar?
        </Text>

        <Text
          style={{
            color: "#555",
            textAlign: "center",
            marginTop: 4,
            marginBottom: 20,
          }}
        >
          Selecciona de 3 a 6 opciones
        </Text>

        {/* 🧩 Opciones */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {options.map((opt) => {
            const isSelected = selected.includes(opt);
            return (
              <TouchableOpacity
                key={opt}
                onPress={() => toggleOption(opt)}
                style={{
                  width: "48%",
                  backgroundColor: isSelected ? "#ffe6f6" : "#fff",
                  borderColor: isSelected ? colors.primary : "#ccc",
                  borderWidth: 1.5,
                  borderRadius: 16,
                  paddingVertical: 18,
                  marginBottom: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  elevation: isSelected ? 3 : 0,
                }}
              >
                <Text
                  style={{
                    color: isSelected ? colors.primary : "#555",
                    fontWeight: "600",
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 💾 Botón Guardar */}
        <Button
          mode="contained"
          buttonColor={colors.primary}
          textColor="#fff"
          style={{
            borderRadius: 10,
            marginTop: 20,
            paddingVertical: 5,
          }}
          onPress={handleContinue}
        >
          Guardar y continuar
        </Button>
      </ScrollView>
    </View>
  );
}
