import { View, Text, Pressable } from "react-native";
import React from "react";
import { Redirect, Stack, Tabs, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { useAppSelector } from "@/redux/hooks/hooks";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="signUp"
        options={{
          title: "Register",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
