import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Share,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";

export default function FormScreen() {
  const { type } = useLocalSearchParams(); // "create" or "enroll"
  

  // ---------- STATES ----------
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [classId, setClassId] = useState("");

  const [generatedId, setGeneratedId] = useState<string | null>(null);

  // ---------- GENERATE CLASS ID ----------
  const generateClassId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const length = Math.floor(Math.random() * 3) + 6; // 6–8 length
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // ---------- SHARE ----------
  const handleShare = async () => {
    if (!generatedId) return;
    await Share.share({
      message: `Join my class using ID: ${generatedId}`,
    });
  };

  // ---------- VALIDATION ----------
  const isCreateValid =
    department && section && subjectName && subjectCode;

  const isEnrollValid = classId.length >= 6 && classId.length <= 8;

  // ---------- ACTIONS ----------
  const handleCreate = () => {
    const id = generateClassId();
    setGeneratedId(id);
  };

  const handleEnroll = () => {
    Alert.alert("Success", `Enrolled with ID: ${classId}`);
  };

  return (
     <>
     <Stack.Screen options={{ headerShown: false }} />
    <SafeAreaView className="flex-1 bg-background px-5">
      {/* HEADER */}
      <View className="mt-4 mb-6">
        <Text className="text-2xl font-bold text-foreground">
          {type === "create" ? "Create Class" : "Enroll Class"}
        </Text>
      </View>

      {/* ================= CREATE CLASS ================= */}
      {type === "create" && !generatedId && (
        <View className="gap-4">
          <TextInput
            placeholder="Department"
            value={department}
            onChangeText={setDepartment}
            className="bg-card p-4 rounded-xl border border-border text-foreground"
          />

          <TextInput
            placeholder="Section"
            value={section}
            onChangeText={setSection}
            className="bg-card p-4 rounded-xl border border-border text-foreground"
          />

          <TextInput
            placeholder="Subject Name"
            value={subjectName}
            onChangeText={setSubjectName}
            className="bg-card p-4 rounded-xl border border-border text-foreground"
          />

          <TextInput
            placeholder="Subject Code"
            value={subjectCode}
            onChangeText={setSubjectCode}
            className="bg-card p-4 rounded-xl border border-border text-foreground"
          />

          {/* BUTTONS */}
          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              onPress={() => router.back()}
              className="px-6 py-3 rounded-xl bg-secondary"
            >
              <Text className="text-secondaryForeground">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={!isCreateValid}
              onPress={handleCreate}
              className={`px-6 py-3 rounded-xl ${
                isCreateValid ? "bg-primary" : "bg-muted"
              }`}
            >
              <Text className="text-primaryForeground font-semibold">
                Create
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* AFTER CREATION (SHOW ID + SHARE) */}
      {type === "create" && generatedId && (
        <View className="items-center mt-10 gap-4">
          <Text className="text-lg text-foreground">
            Class Created Successfully 🎉
          </Text>

          <View className="flex-row items-center gap-3 bg-card px-5 py-4 rounded-xl border border-border">
            <Text className="text-xl font-bold text-primary">
              {generatedId}
            </Text>

            <TouchableOpacity onPress={handleShare}>
              <Ionicons name="share-social-outline" size={22} color="black" />
            </TouchableOpacity>
          </View>
<TouchableOpacity
  onPress={() => {
    // RESET EVERYTHING
    setDepartment("");
    setSection("");
    setSubjectName("");
    setSubjectCode("");
    setGeneratedId(null);

    // optional: stay on same screen (form resets automatically)
  }}
  className="mt-6 bg-primary px-6 py-3 rounded-xl"
>
  <Text className="text-primaryForeground">Done</Text>
</TouchableOpacity>
        </View>
      )}

      {/* ================= ENROLL CLASS ================= */}
      {type === "enroll" && (
        <View className="gap-4">
          <TextInput
            placeholder="Enter Class-ID"
            value={classId}
            onChangeText={setClassId}
            maxLength={8}
            className="bg-card p-4 rounded-xl border border-border text-foreground"
          />

          <Text className="text-sm text-mutedForeground">
            Class-ID must be 6–8 letters or numbers. No spaces or symbols.
          </Text>

          {/* BUTTONS */}
          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              onPress={() => router.back()}
              className="px-6 py-3 rounded-xl bg-secondary"
            >
              <Text className="text-secondaryForeground">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={!isEnrollValid}
              onPress={handleEnroll}
              className={`px-6 py-3 rounded-xl ${
                isEnrollValid ? "bg-primary" : "bg-muted"
              }`}
            >
              <Text className="text-primaryForeground font-semibold">
                Enroll
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
    </>
  );
}