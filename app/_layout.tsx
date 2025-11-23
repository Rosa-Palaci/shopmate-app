// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
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
