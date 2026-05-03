import { View, Text, Pressable, Platform } from "react-native";
import React from "react";
import { Tabs, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";

export default function MainTabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: Platform.OS === "ios" ? 90 : 70,
          paddingBottom: Platform.OS === "ios" ? 30 : 12,
          paddingTop: 12,
        },
        tabBarLabelStyle: {
          fontWeight: "700",
          fontSize: 11,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ClassScreen"
        options={{
          title: "Classes",
          headerShown: false,
          tabBarButton: (props) => <SpecialTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

// Class tab button (Center FAB)
const SpecialTabButton = ({ onPress }: any) => {
  const pathName = usePathname();
  const focused =
    pathName.includes("ClassScreen") || pathName.includes("[classID]");

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={{
        top: -24,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 24,
          backgroundColor: focused ? colors.primary : "#0f172a",
          justifyContent: "center",
          alignItems: "center",
          shadowColor: focused ? colors.primary : "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 15,
          elevation: 10,
          transform: [{ rotate: "0deg" }],
        }}
      >
        <Ionicons name="journal" size={28} color="white" />
      </View>
      <Text
        style={{
          fontSize: 11,
          fontWeight: "800",
          color: focused ? colors.primary : "#94a3b8",
          marginTop: 8,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        Classes
      </Text>
    </TouchableOpacity>
  );
};

import { TouchableOpacity } from "react-native";
