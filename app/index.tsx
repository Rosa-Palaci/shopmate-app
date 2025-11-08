import { Stack, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { View, Text } from "react-native";
import { useEffect } from "react";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login"); // 👈 cambia aquí si tu ruta se llama diferente
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF5F5",
        }}
      >
        <LottieView
          source={require("../assets/animations/loading.json")}
          autoPlay
          loop
          style={{ width: 150, height: 150 }}
        />
        <Text
          style={{
            color: "#E63946",
            marginTop: 20,
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Cargando...
        </Text>
      </View>
    </>
  );
}
