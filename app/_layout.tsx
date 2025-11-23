// app/_layout.tsx
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import useAuthStore from "./stores/useAuthStore";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const customerId = useAuthStore((state) => state.customer_id);
  const hasHydrated = useAuthStore.persist?.hasHydrated?.() ?? false;

  useEffect(() => {
    const redirect = () => {
      if (!hasHydrated) return;

      const isInTabs = segments[0] === "(tabs)" || segments[0] === "tabs";
      const isAtLogin = segments[0] === "login";
      const isAtRoot = segments.length === 0;

      if (!customerId && !isAtLogin) {
        router.replace("/login");
        return;
      }

      if (customerId && (isAtLogin || isAtRoot || !isInTabs)) {
        router.replace("/tabs/home");
      }
    };

    redirect();

    if (!hasHydrated) {
      const unsubscribe = useAuthStore.persist?.onFinishHydration?.(() => {
        redirect();
      });

      return () => unsubscribe?.();
    }
  }, [customerId, hasHydrated, router, segments]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/*
        El Stack maneja todas las pantallas fuera de (tabs)
        y también el grupo de tabs como una sola pantalla principal
      */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="product-details" options={{ headerShown: false }} />
    </Stack>
  );
}
