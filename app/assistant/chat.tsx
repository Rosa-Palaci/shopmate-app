import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Text, IconButton, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { colors } from "../../theme";

// 🧩 Tipado del mensaje
type Message = {
  from: "user" | "bot";
  text: string;
  products?: {
    id: string;
    name: string;
    price: number;
    category: string;
    image: any;
  }[];
};

// 🛍️ Productos locales
const products = [
  {
    id: "p1",
    name: "Bocina Bluetooth",
    price: 899,
    category: "Tecnología",
    image: require("../../assets/images/products/bocina.avif"),
  },
  {
    id: "p2",
    name: "Gorro de Invierno",
    price: 249,
    category: "Ropa",
    image: require("../../assets/images/products/gorro.avif"),
  },
  {
    id: "p3",
    name: "Lámpara de Escritorio",
    price: 499,
    category: "Hogar",
    image: require("../../assets/images/products/lampara.avif"),
  },
  {
    id: "p4",
    name: "Perfume Floral",
    price: 1299,
    category: "Accesorios",
    image: require("../../assets/images/products/perfume.avif"),
  },
  {
    id: "p5",
    name: "Playera Rosa Claro",
    price: 399,
    category: "Ropa",
    image: require("../../assets/images/products/playera.avif"),
  },
  {
    id: "p6",
    name: "Vestido Dorado",
    price: 799,
    category: "Ropa",
    image: require("../../assets/images/products/vestido-dorado.avif"),
  },
  {
    id: "p7",
    name: "Lavadora EcoSmart",
    price: 6899,
    category: "Hogar",
    image: require("../../assets/images/products/lavadora.avif"),
  },
];

export default function AssistantChat() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Hola, Rosa 👋 ¿Cómo puedo ayudarte hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // 💬 Enviar mensaje del usuario
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    simulateBotResponse(input);
  };

  // 🤖 Simular respuesta del asistente con efecto typing
  const simulateBotResponse = (userInput: string) => {
    setIsTyping(true);

    setTimeout(() => {
      const found = products.filter(
        (p) =>
          p.name.toLowerCase().includes(userInput.toLowerCase()) ||
          p.category.toLowerCase().includes(userInput.toLowerCase())
      );

      let botMessage: Message;

      if (found.length > 0) {
        botMessage = {
          from: "bot",
          text: "Encontré esto para ti 👇",
          products: found,
        };
      } else {
        botMessage = {
          from: "bot",
          text: "No encontré coincidencias exactas 😔 pero puedes intentar buscar en el catálogo.",
        };
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 1500); // ⏱️ efecto typing de 1.5 segundos
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* 🔙 Header */}
      <View
        style={{
          backgroundColor: colors.primary,
          paddingTop: 60,
          paddingBottom: 16,
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <IconButton
          icon="arrow-left"
          size={26}
          iconColor="#fff"
          onPress={() => router.back()}
        />
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "600",
            marginLeft: 8,
          }}
        >
          Asistente de compras
        </Text>
      </View>

      {/* 💬 Chat */}
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 16, marginTop: 10 }}
        contentContainerStyle={{ paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg, index) => (
          <View
            key={index}
            style={{
              alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.from === "user" ? colors.primary : "#fff",
              borderRadius: 16,
              padding: 12,
              marginBottom: 10,
              maxWidth: "80%",
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 3,
            }}
          >
            <Text
              style={{
                color: msg.from === "user" ? "#fff" : "#000",
                fontSize: 15,
              }}
            >
              {msg.text}
            </Text>

            {/* 🧩 Mostrar productos si los hay */}
            {msg.products &&
              msg.products.map((p) => (
                <View
                  key={p.id}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 12,
                    marginTop: 10,
                    padding: 10,
                    elevation: 2,
                    shadowColor: "#000",
                    shadowOpacity: 0.05,
                  }}
                >
                  <Image
                    source={p.image}
                    style={{
                      width: "100%",
                      height: 120,
                      borderRadius: 10,
                      marginBottom: 6,
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      fontWeight: "600",
                      color: colors.primary,
                      fontSize: 15,
                      marginBottom: 4,
                    }}
                  >
                    {p.name}
                  </Text>
                  <Text
                    style={{
                      color: "#000",
                      fontWeight: "bold",
                      marginBottom: 8,
                    }}
                  >
                    ${p.price}
                  </Text>
                  <Button
                    mode="contained"
                    buttonColor={colors.primary}
                    textColor="#fff"
                    onPress={() => alert(`Agregado ${p.name} al carrito 🛒`)}
                    style={{
                      borderRadius: 8,
                      paddingVertical: 2,
                    }}
                  >
                    Agregar
                  </Button>
                </View>
              ))}
          </View>
        ))}

        {/* ⌨️ Indicador de escritura */}
        {isTyping && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={{ color: "#777", marginLeft: 8 }}>
              El asistente está escribiendo...
            </Text>
          </View>
        )}
      </ScrollView>

      {/* 📝 Campo de texto */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderColor: "#eee",
          paddingHorizontal: 10,
          paddingVertical: 6,
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <TextInput
          placeholder="Escribe o pregunta sobre algún artículo..."
          value={input}
          onChangeText={setInput}
          style={{
            flex: 1,
            fontSize: 15,
            padding: 10,
            color: "#000",
          }}
          onSubmitEditing={handleSend}
        />
        <IconButton
          icon="send"
          iconColor={colors.primary}
          size={24}
          onPress={handleSend}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
