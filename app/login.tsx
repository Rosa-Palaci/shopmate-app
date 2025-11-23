import React, { useEffect, useState } from "react";
import { Alert, View, TouchableOpacity, Image, Dimensions } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { Stack, useRouter } from "expo-router";
import { colors } from "../theme";
import useAuthStore from "./stores/useAuthStore";

const { height, width } = Dimensions.get("window");

export default function Login() {
  const router = useRouter();
  const [customerId, setCustomerId] = useState("");
  const hydratedCustomerId = useAuthStore((state) => state.customer_id);
  const saveId = useAuthStore((state) => state.setCustomerId);
  const hasHydrated = useAuthStore.persist?.hasHydrated?.() ?? false;

  /*
   * Flujo original de autenticación con correo y contraseña conservado para referencia:
   *
   * const [email, setEmail] = useState("");
   * const [password, setPassword] = useState("");
   *
   * <TextInput
   *   label="Correo electrónico"
   *   mode="outlined"
   *   value={email}
   *   onChangeText={setEmail}
   *   keyboardType="email-address"
   *   autoCapitalize="none"
   *   style={{ marginBottom: 12, borderRadius: 28, backgroundColor: "white" }}
   *   outlineColor="#f0c5ca"
   *   activeOutlineColor="#ff5b6bff"
   *   theme={{ roundness: 28 }}
   * />
   *
   * <TextInput
   *   label="Contraseña"
   *   mode="outlined"
   *   value={password}
   *   onChangeText={setPassword}
   *   secureTextEntry
   *   style={{ marginBottom: 18, borderRadius: 28, backgroundColor: "white" }}
   *   outlineColor="#f0c5ca"
   *   activeOutlineColor="#ff5b6bff"
   *   theme={{ roundness: 28 }}
   * />
   *
   * <Button
   *   mode="contained"
   *   onPress={handleEmailLogin}
   *   buttonColor={colors.primary}
   *   textColor="#fff"
   *   style={{ borderRadius: 28, width: "100%", marginTop: 5 }}
   * >
   *   Iniciar sesión
   * </Button>
   */

  useEffect(() => {
    if (hasHydrated && hydratedCustomerId) {
      router.replace("/tabs/home");
      return;
    }

    if (!hasHydrated) {
      const unsubscribe = useAuthStore.persist?.onFinishHydration?.(() => {
        if (useAuthStore.getState().customer_id) {
          router.replace("/tabs/home");
        }
      });

      return () => unsubscribe?.();
    }
  }, [hasHydrated, hydratedCustomerId, router]);

  const handleLogin = () => {
    if (!customerId) {
      Alert.alert("Error", "Por favor ingresa un Customer ID válido");
      return;
    }

    saveId(customerId);
    router.replace("/tabs/home");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <View
          style={{
            height: height * 0.55,
            width: "100%",
            backgroundColor: "#FFEAEA",
            borderBottomLeftRadius: 60,
            borderBottomRightRadius: 60,
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../assets/images/shopping.png")}
            style={{
              width: width * 0.95,
              height: "90%",
              resizeMode: "contain",
              marginTop: 20,
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 24,
            paddingVertical: 10,
          }}
        >
          <View style={{ width: "100%" }}>
            <Text
              style={{
                textAlign: "center",
                marginBottom: 20,
                color: colors.primary,
                fontWeight: "700",
                fontSize: 26,
              }}
            >
              Bienvenida a ShopMate
            </Text>

            <TextInput
              label="Customer ID"
              placeholder="Customer ID"
              mode="outlined"
              value={customerId}
              onChangeText={setCustomerId}
              keyboardType="numeric"
              autoCapitalize="none"
              style={{
                marginBottom: 18,
                borderRadius: 28,
                backgroundColor: "white",
              }}
              outlineColor="#f0c5ca"
              activeOutlineColor="#ff5b6bff"
              theme={{ roundness: 28 }}
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              buttonColor={colors.primary}
              textColor="#fff"
              style={{
                borderRadius: 28,
                width: "100%",
                marginTop: 5,
              }}
            >
              Entrar
            </Button>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            <Text style={{ color: "gray", fontSize: 15 }}>
              ¿No tienes cuenta?
            </Text>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: "600",
                  fontSize: 15,
                  marginLeft: 4,
                }}
              >
                Regístrate aquí
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
