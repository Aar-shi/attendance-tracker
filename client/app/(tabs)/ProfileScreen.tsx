import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";


export default function ProfileScreen() {
  return (
    <ScrollView className="flex-1 bg-background px-4 pt-10">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-xl font-semibold text-foreground">
          My Profile
        </Text>
      </View>

      {/* Profile Card */}
      <View className="bg-card rounded-3xl items-center py-6 mb-6 shadow-sm">
        {/* Avatar */}
        <View className="relative">
          <Image
          source={require("../../assets/images/profile_pic.png")}// I have used this style because normal react r moton import kore picture anle error marche
          className="w-28 h-28 rounded-full border-4 border-primary"
          />
        {/* Camera Icon */}
          <View className="absolute bottom-1 right-1 bg-primary p-2 rounded-full">
            <Ionicons name="create-outline" size={16} color="white" />
          </View>
        </View>

        {/* Name */}
        <Text className="text-lg font-semibold text-foreground mt-4">
          Alex Johnson
        </Text>

        <Text className="text-sm text-mutedForeground">
          Computer Science • Year 3
        </Text>

        <Text className="text-xs text-mutedForeground mt-1">
          ID: 2023-CS-042
        </Text>
      </View>

      {/* Stats Grid */}
      <View className="flex-row flex-wrap justify-center gap-4 mb-6">
        <StatCard
          icon="book-outline"
          value="12"
          label="Total Classes"
        />
        <StatCard
          icon="trending-up-outline"
          value="85%"
          label="Attendance"
        />
        <StatCard
          icon="time-outline"
          value="142"
          label="Hours"
        />
        <StatCard
          icon="flame-outline"
          value="15"
          label="Day Streak"
        />
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity className="flex-row items-center justify-between bg-card px-5 py-4 rounded-2xl border border-border mb-10">
        <View className="flex-row items-center">
          <Ionicons name="person-outline" size={20} color="#166534" />
          <Text className="ml-3 text-foreground font-medium">
            Edit Profile
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#166534" />
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ---------- Reusable Stat Card ---------- */
function StatCard({
  icon,
  value,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
}) {
  return (
    <View className="bg-card w-[44%] rounded-2xl p-4 mb-4 border border-border items-center">
      <View className="w-10 h-10 rounded-xl bg-accent items-center justify-center mb-3">
        <Ionicons name={icon} size={20} color="#166534" />
      </View>

      <Text className="text-xl font-semibold text-foreground text-center">
        {value}
      </Text>

      <Text className="text-sm text-mutedForeground text-center mt-1">
        {label}
      </Text>
    </View>
  );
}
