import { Stack, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { View, Text } from "react-native";
import { useEffect } from "react";
import useAuthStore from "./stores/useAuthStore";

export default function SplashScreen() {
  const router = useRouter();
  const hasHydrated = useAuthStore.persist?.hasHydrated?.() ?? false;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const navigateAfterSplash = () => {
      const targetRoute = useAuthStore.getState().customer_id
        ? "/tabs/home"
        : "/login";

      timer = setTimeout(() => {
        router.replace(targetRoute);
      }, 3000);
    };

    if (hasHydrated) {
      navigateAfterSplash();
    } else {
      const unsubscribe = useAuthStore.persist?.onFinishHydration?.(() => {
        navigateAfterSplash();
      });

      return () => {
        if (timer) clearTimeout(timer);
        unsubscribe?.();
      };
    }

    return () => timer && clearTimeout(timer);
  }, [hasHydrated, router]);

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
