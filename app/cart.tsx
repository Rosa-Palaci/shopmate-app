import React, { useContext } from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import { Text, Button, Card, IconButton } from "react-native-paper";
import { useRouter } from "expo-router";
import { colors } from "../theme";
import { useCart } from "./context/CartContext";

export default function Cart() {
  const router = useRouter();
  const { cart, updateQuantity, total } = useCart();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      {/* 🔙 Flecha volver */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
          marginTop: 50,
        }}
      >
        <IconButton
          icon="arrow-left"
          iconColor={colors.primary}
          size={28}
          onPress={() => router.back()}
        />
        <Text
          variant="headlineSmall"
          style={{
            color: colors.primary,
            fontWeight: "bold",
            marginLeft: 8,
          }}
        >
          Tu carrito de compras
        </Text>
      </View>

      {/* 🛍️ Lista de productos */}
      {cart.length > 0 ? (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              style={{
                marginBottom: 14,
                borderRadius: 16,
                backgroundColor: "#fff",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={item.image}
                  style={{
                    width: 80,
                    height: 80,
                    borderTopLeftRadius: 16,
                    borderBottomLeftRadius: 16,
                  }}
                  resizeMode="contain"
                />

                <View
                  style={{
                    flex: 1,
                    padding: 12,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontWeight: "600", fontSize: 16 }}>
                    {item.name}
                  </Text>
                  <Text style={{ marginTop: 2 }}>
                    ${item.price} × {item.qty}
                  </Text>
                  <Text style={{ fontWeight: "bold", marginTop: 4 }}>
                    Subtotal: ${item.price * item.qty}
                  </Text>

                  {/* ➕➖ botones para editar cantidad */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 6,
                    }}
                  >
                    <IconButton
                      icon="minus-circle-outline"
                      size={22}
                      iconColor={colors.primary}
                      onPress={() => updateQuantity(item.id, item.qty - 1)}
                    />
                    <Text style={{ marginHorizontal: 8 }}>{item.qty}</Text>
                    <IconButton
                      icon="plus-circle-outline"
                      size={22}
                      iconColor={colors.primary}
                      onPress={() => updateQuantity(item.id, item.qty + 1)}
                    />
                  </View>
                </View>
              </View>
            </Card>
          )}
        />
      ) : (
        <Text style={{ textAlign: "center", marginTop: 40, color: "#999" }}>
          Tu carrito está vacío 🛍️
        </Text>
      )}

      {/* 💵 Total y botón de pago */}
      {cart.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text
            variant="titleMedium"
            style={{
              fontWeight: "600",
              textAlign: "right",
              marginBottom: 12,
              color: "#000",
            }}
          >
            Total: ${total}
          </Text>

          <Button
            mode="contained"
            buttonColor={colors.primary}
            textColor="#fff"
            style={{ borderRadius: 12 }}
            onPress={() => alert("Compra realizada 🛍️")}
          >
            Proceder al pago
          </Button>
        </View>
      )}
    </View>
  );
}
