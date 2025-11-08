import React from "react";
import { View } from "react-native";
import { Text, Button, Avatar, Divider } from "react-native-paper";
import { colors } from "../../theme";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();

  // 🔧 Aquí luego se pueden conectar los datos reales del usuario
  const user = {
    name: "Rosa Palacios",
    email: "rosa.palacios@example.com",
    birthday: "12/03/2001",
    gender: "Femenino",
    postalCode: "04510",
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        paddingTop: 40,
      }}
    >
      {/* 🧍 Avatar y nombre */}
      <View style={{ alignItems: "center", marginBottom: 24 }}>
        <Avatar.Text
          size={96}
          label={user.name.charAt(0)}
          style={{ backgroundColor: colors.primary }}
          color="#fff"
        />
        <Text
          variant="titleLarge"
          style={{
            marginTop: 12,
            color: colors.primary,
            fontWeight: "600",
          }}
        >
          {user.name}
        </Text>
        <Text style={{ color: "#777" }}>{user.email}</Text>
      </View>

      <Divider bold style={{ marginBottom: 20 }} />

      {/* 🧾 Datos del usuario */}
      <Text variant="titleMedium" style={{ color: colors.primary }}>
        Información personal
      </Text>
      <View style={{ marginVertical: 10 }}>
        <Text>📅 Fecha de nacimiento: {user.birthday}</Text>
        <Text>⚧ Género: {user.gender}</Text>
        <Text>📍 Código postal: {user.postalCode}</Text>
      </View>

      <Divider bold style={{ marginVertical: 20 }} />

      {/* ⚙️ Acciones */}
      <Button
        mode="outlined"
        textColor={colors.primary}
        style={{
          borderColor: colors.primary,
          borderRadius: 12,
          marginBottom: 12,
        }}
        onPress={() => alert("Editar perfil próximamente ✏️")}
      >
        Editar perfil
      </Button>

      <Button
        mode="contained"
        buttonColor={colors.primary}
        style={{ borderRadius: 12 }}
        onPress={() => router.replace("/login")}
      >
        Cerrar sesión
      </Button>
    </View>
  );
}
