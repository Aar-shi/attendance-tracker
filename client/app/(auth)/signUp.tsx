import React, { useState } from "react";
import "../global.css";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { signUpUser } from "@/redux/slice/authSlice";

const departments = [
  "Computer Science (CSE)",
  "Information Technology (IT)",
  "Electronics & Communication (ECE)",
  "Mechanical Engineering",
  "Civil Engineering",
  "Food Technology",
];

const roles = ["Student", "Teacher"];

const SignUp = () => {
  const dispatch = useAppDispatch();
  const { isSigningUp } = useAppSelector((state) => state.auth);
  const [department, setDepartment] = useState("Select Department");
  const [role, setRole] = useState("Select Role");

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [section, setSection] = useState("");
  const [password, setPassword] = useState("");

  const [deptModal, setDeptModal] = useState(false);
  const [roleModal, setRoleModal] = useState(false);

  const handleSignUp = async () => {
    const data = {
      name,
      role: role.toLowerCase(),
      department: department !== "Select Department" ? department : "",
      institutionId: role === "Teacher" ? id : rollNo,
      section,
      password,
    };
    await dispatch(signUpUser(data));
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ padding: 24, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="items-center mt-6 mb-10">
            <View className="w-24 h-24 rounded-3xl bg-primary/10 items-center justify-center rotate-3 shadow-sm">
              <Ionicons name="school" size={48} color="#059669" />
            </View>
            <Text className="mt-6 text-3xl font-black text-foreground">
              Get Started
            </Text>
            <Text className="text-mutedForeground text-lg font-medium mt-1 text-center opacity-80">
              Join our smart attendance platform
            </Text>
          </View>

          {/* Form Section */}
          <View className="space-y-4">
            {/* Full Name */}
            <View className="bg-card border border-border/50 rounded-2xl px-5 py-4 flex-row items-center shadow-sm">
              <Ionicons name="person-outline" size={20} color="#94a3b8" />
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="#94a3b8"
                value={name}
                onChangeText={setName}
                className="flex-1 text-foreground text-base ml-3 font-medium"
              />
            </View>

            {/* Role Dropdown */}
            <TouchableOpacity
              className="bg-card border border-border/50 rounded-2xl px-5 py-4 mt-4 flex-row items-center justify-between shadow-sm"
              onPress={() => setRoleModal(true)}
              activeOpacity={0.8}
            >
              <View className="flex-row items-center">
                <Ionicons name="briefcase-outline" size={20} color="#94a3b8" />
                <Text
                  className={`text-base ml-3 font-medium ${role === "Select Role" ? "text-slate-400" : "text-foreground"}`}
                >
                  {role}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={18} color="#94a3b8" />
            </TouchableOpacity>

            {/* STUDENT FIELDS */}
            {role === "Student" && (
              <View className="space-y-4 mt-4">
                {/* Roll Number */}
                <View className="bg-card border border-border/50 rounded-2xl px-5 py-4 flex-row items-center shadow-sm mb-4">
                  <Ionicons name="id-card-outline" size={20} color="#94a3b8" />
                  <TextInput
                    placeholder="University Roll Number"
                    placeholderTextColor="#94a3b8"
                    value={rollNo}
                    onChangeText={setRollNo}
                    className="flex-1 text-foreground text-base ml-3 font-medium"
                  />
                </View>

                {/* Section */}
                <View className="bg-card border border-border/50 rounded-2xl px-5 py-4 flex-row items-center shadow-sm mb-4">
                  <Ionicons name="grid-outline" size={20} color="#94a3b8" />
                  <TextInput
                    placeholder="Section (A / B / C)"
                    placeholderTextColor="#94a3b8"
                    value={section}
                    onChangeText={setSection}
                    className="flex-1 text-foreground text-base ml-3 font-medium"
                  />
                </View>

                {/* Department Dropdown */}
                <TouchableOpacity
                  className="bg-card border border-border/50 rounded-2xl px-5 py-4 flex-row items-center justify-between shadow-sm mb-4"
                  onPress={() => setDeptModal(true)}
                  activeOpacity={0.8}
                >
                  <View className="flex-row items-center">
                    <Ionicons
                      name="business-outline"
                      size={20}
                      color="#94a3b8"
                    />
                    <Text
                      className={`text-base ml-3 font-medium ${department === "Select Department" ? "text-slate-400" : "text-foreground"}`}
                    >
                      {department}
                    </Text>
                  </View>
                  <Ionicons name="chevron-down" size={18} color="#94a3b8" />
                </TouchableOpacity>
              </View>
            )}

            {/* TEACHER FIELDS */}
            {role === "Teacher" && (
              <View className="space-y-4 mt-4">
                {/* Institution / Employee ID */}
                <View className="bg-card border border-border/50 rounded-2xl px-5 py-4 flex-row items-center shadow-sm mb-4">
                  <Ionicons name="id-card-outline" size={20} color="#94a3b8" />
                  <TextInput
                    placeholder="Institution / Employee ID"
                    placeholderTextColor="#94a3b8"
                    value={id}
                    onChangeText={setId}
                    className="flex-1 text-foreground text-base ml-3 font-medium"
                  />
                </View>

                {/* Department */}
                <View className="bg-card border border-border/50 rounded-2xl px-5 py-4 flex-row items-center shadow-sm mb-4">
                  <Ionicons name="business-outline" size={20} color="#94a3b8" />
                  <TextInput
                    placeholder="Department"
                    placeholderTextColor="#94a3b8"
                    className="flex-1 text-foreground text-base ml-3 font-medium"
                  />
                </View>
              </View>
            )}

            {/* Password */}
            <View className="bg-card border border-border/50 rounded-2xl px-5 py-4 mt-4 flex-row items-center shadow-sm">
              <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" />
              <TextInput
                placeholder="Create New Password"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                className="flex-1 text-foreground text-base ml-3 font-medium"
              />
            </View>
            <Text className="text-mutedForeground text-xs ml-2 mt-1 font-medium opacity-70">
              Minimum 8 characters with a mix of symbols
            </Text>

            {/* Confirm Password */}
            <View className="bg-card border border-border/50 rounded-2xl px-5 py-4 mt-4 mb-8 flex-row items-center shadow-sm">
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color="#94a3b8"
              />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                className="flex-1 text-foreground text-base ml-3 font-medium"
              />
            </View>
          </View>

          {/* Submit */}
          <TouchableOpacity
            onPress={handleSignUp}
            disabled={isSigningUp}
            activeOpacity={0.8}
            className={`py-5 rounded-2xl items-center shadow-lg ${isSigningUp ? "bg-primary/70" : "bg-primary shadow-primary/30"}`}
          >
            <Text className="text-primaryForeground text-lg font-bold tracking-wide">
              {isSigningUp ? "Registering..." : "Create Account"}
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <View className="items-center mt-10 mb-6">
            <Text className="text-mutedForeground font-medium">
              Already have an account?{" "}
              <Text
                onPress={() => router.replace("/login")}
                className="text-primary font-bold"
              >
                Login
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Department Modal */}
      <Modal visible={deptModal} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/60 px-6">
          <View className="bg-card w-full rounded-3xl overflow-hidden shadow-2xl">
            <View className="bg-primary/5 p-6 border-b border-border/50">
              <Text className="text-xl font-bold text-foreground">
                Select Department
              </Text>
            </View>
            <ScrollView className="max-h-96 p-4">
              {departments.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className={`py-4 px-2 rounded-xl flex-row items-center justify-between ${department === item ? "bg-primary/10" : ""}`}
                  onPress={() => {
                    setDepartment(item);
                    setDeptModal(false);
                  }}
                >
                  <Text
                    className={`text-base ${department === item ? "text-primary font-bold" : "text-foreground font-medium"}`}
                  >
                    {item}
                  </Text>
                  {department === item && (
                    <Ionicons name="checkmark" size={20} color="#059669" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Role Modal */}
      <Modal visible={roleModal} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/60 px-6">
          <View className="bg-card w-full rounded-3xl overflow-hidden shadow-2xl">
            <View className="bg-primary/5 p-6 border-b border-border/50">
              <Text className="text-xl font-bold text-foreground">
                Select Your Role
              </Text>
            </View>
            <View className="p-4">
              {roles.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className={`py-5 px-4 rounded-xl flex-row items-center justify-between mb-2 ${role === item ? "bg-primary/10" : "bg-slate-50"}`}
                  onPress={() => {
                    setRole(item);
                    setRoleModal(false);
                  }}
                >
                  <View className="flex-row items-center">
                    <Ionicons
                      name={
                        item === "Student" ? "school-outline" : "person-outline"
                      }
                      size={24}
                      color={role === item ? "#059669" : "#64748b"}
                    />
                    <Text
                      className={`text-lg ml-4 ${role === item ? "text-primary font-bold" : "text-slate-600 font-semibold"}`}
                    >
                      {item}
                    </Text>
                  </View>
                  {role === item && (
                    <Ionicons
                      name="radio-button-on"
                      size={24}
                      color="#059669"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SignUp;
