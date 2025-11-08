import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Text as RNText,
} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    birthdate: "",
    gender: "",
    postalCode: "",
  });

  const handleChange = (key: string, value: string) => {
    // Autoformato para fecha de nacimiento
    if (key === "birthdate") {
      // Solo números
      value = value.replace(/[^0-9]/g, "");
      // Agregar diagonales automáticamente
      if (value.length > 2 && value.length <= 4) {
        value = value.slice(0, 2) + "/" + value.slice(2);
      } else if (value.length > 4) {
        value =
          value.slice(0, 2) +
          "/" +
          value.slice(2, 4) +
          "/" +
          value.slice(4, 8);
      }
    }

    // Solo números en código postal
    if (key === "postalCode") {
      value = value.replace(/[^0-9]/g, "");
    }

    setForm({ ...form, [key]: value });
  };

  // 🧠 Validaciones
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const passwordChecks = {
    minLength: form.password.length >= 8,
    lowercase: /[a-z]/.test(form.password),
    uppercase: /[A-Z]/.test(form.password),
    number: /[0-9]/.test(form.password),
  };

  const allPasswordValid = Object.values(passwordChecks).every(Boolean);

  const validateBirthdate = (date: string) =>
    /^\d{2}\/\d{2}\/\d{4}$/.test(date);

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert("Campos obligatorios", "Completa los campos requeridos.");
      return;
    }
    if (!validateEmail(form.email)) {
      Alert.alert("Correo inválido", "Por favor ingresa un correo válido con @.");
      return;
    }
    if (!allPasswordValid) {
      Alert.alert(
        "Contraseña inválida",
        "La contraseña debe cumplir con todos los requisitos."
      );
      return;
    }
    if (form.birthdate && !validateBirthdate(form.birthdate)) {
      Alert.alert(
        "Formato de fecha inválido",
        "La fecha debe tener el formato DD/MM/AAAA."
      );
      return;
    }

    Alert.alert("✨ Registro exitoso", "Tu cuenta ha sido creada correctamente.");
    router.replace("/(tabs)/home");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          paddingHorizontal: 24,
          paddingTop: 50,
        }}
      >
        {/* 🔙 Flecha de regreso */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            position: "absolute",
            top: 45,
            left: 20,
            zIndex: 2,
          }}
        >
          <Ionicons name="arrow-back" size={28} color={colors.primary} />
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={{
            paddingBottom: 60,
            paddingTop: 30,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              textAlign: "center",
              marginBottom: 25,
              color: colors.primary,
              fontWeight: "700",
              fontSize: 26,
            }}
          >
            Crear cuenta
          </Text>

          {/* 🩷 Campos de texto */}
          <TextInput
            label="Nombres"
            mode="outlined"
            value={form.name}
            onChangeText={(v) => handleChange("name", v)}
            style={{ marginBottom: 12, borderRadius: 28, backgroundColor: "white" }}
            outlineColor="#f0c5ca"
            activeOutlineColor="#ff5b6bff"
            theme={{ roundness: 28 }}
          />

          <TextInput
            label="Apellidos"
            mode="outlined"
            value={form.lastname}
            onChangeText={(v) => handleChange("lastname", v)}
            style={{ marginBottom: 12, borderRadius: 28, backgroundColor: "white" }}
            outlineColor="#f0c5ca"
            activeOutlineColor="#ff5b6bff"
            theme={{ roundness: 28 }}
          />

          <TextInput
            label="Correo electrónico"
            mode="outlined"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(v) => handleChange("email", v)}
            style={{ marginBottom: 12, borderRadius: 28, backgroundColor: "white" }}
            outlineColor="#f0c5ca"
            activeOutlineColor="#ff5b6bff"
            theme={{ roundness: 28 }}
          />

          {/* 🔒 Contraseña + Validación */}
          <View style={{ marginBottom: 12 }}>
            <TextInput
              label="Contraseña"
              mode="outlined"
              secureTextEntry
              value={form.password}
              onChangeText={(v) => handleChange("password", v)}
              style={{
                borderRadius: 28,
                backgroundColor: "white",
              }}
              outlineColor="#f0c5ca"
              activeOutlineColor="#ff5b6bff"
              theme={{ roundness: 28 }}
            />

            {/* ✅ Validaciones visibles justo debajo */}
            {form.password.length > 0 && (
              <View
                style={{
                  marginTop: 6,
                  marginLeft: 10,
                }}
              >
                <RNText style={{ color: "#555", marginBottom: 6 }}>
                  Su contraseña debe contener:
                </RNText>

                {[
                  { label: "Al menos 8 caracteres de largo", valid: passwordChecks.minLength },
                  { label: "Letras minúsculas (a-z)", valid: passwordChecks.lowercase },
                  { label: "Letras mayúsculas (A-Z)", valid: passwordChecks.uppercase },
                  { label: "Números (0-9)", valid: passwordChecks.number },
                ].map((rule, index) => (
                  <View
                    key={index}
                    style={{ flexDirection: "row", alignItems: "center", marginBottom: 3 }}
                  >
                    <Ionicons
                      name={rule.valid ? "checkmark-circle" : "close-circle"}
                      size={18}
                      color={rule.valid ? "green" : "#E63946"}
                      style={{ marginRight: 6 }}
                    />
                    <RNText style={{ color: rule.valid ? "green" : "#E63946" }}>
                      {rule.label}
                    </RNText>
                  </View>
                ))}
              </View>
            )}
          </View>

          <TextInput
            label="Fecha de nacimiento"
            mode="outlined"
            placeholder="DD/MM/AAAA"
            keyboardType="numeric"
            value={form.birthdate}
            onChangeText={(v) => handleChange("birthdate", v)}
            maxLength={10}
            style={{ marginBottom: 12, borderRadius: 28, backgroundColor: "white" }}
            outlineColor="#f0c5ca"
            activeOutlineColor="#ff5b6bff"
            theme={{ roundness: 28 }}
          />

          <TextInput
            label="Código Postal"
            mode="outlined"
            keyboardType="numeric"
            value={form.postalCode}
            onChangeText={(v) => handleChange("postalCode", v)}
            style={{ marginBottom: 12, borderRadius: 28, backgroundColor: "white" }}
            outlineColor="#f0c5ca"
            activeOutlineColor="#ff5b6bff"
            theme={{ roundness: 28 }}
          />

          {/* 🎀 Selector de género */}
          <View
            style={{
              marginTop: 10,
              marginBottom: 25,
              borderRadius: 28,
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#f0c5ca",
              paddingVertical: 16,
              paddingHorizontal: 16,
            }}
          >
            <Text style={{ color: "gray", fontSize: 15, marginBottom: 12 }}>
              Selecciona tu género
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {["Femenino", "Masculino", "Prefiero no decirlo"].map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleChange("gender", option)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 4,
                  }}
                >
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                      borderWidth: 2,
                      borderColor: colors.primary,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 6,
                    }}
                  >
                    {form.gender === option && (
                      <View
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 6,
                          backgroundColor: colors.primary,
                        }}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#333",
                      flexShrink: 1,
                      maxWidth: 100,
                    }}
                    numberOfLines={1}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 🧷 Botón principal */}
          <Button
            mode="contained"
            onPress={handleRegister}
            buttonColor={colors.primary}
            textColor="#fff"
            style={{
              borderRadius: 28,
              width: "100%",
              marginTop: 5,
            }}
            disabled={!allPasswordValid}
          >
            Crear cuenta
          </Button>
        </ScrollView>
      </View>
    </>
  );
}
