import React, { useEffect } from "react";
import "../global.css";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchClassrooms } from "@/redux/slice/classroomSlice";
import { Ionicons } from "@expo/vector-icons";

const Index = () => {
  const currentUser = useAppSelector((state) => state.auth.authUser);
  const classCount = useAppSelector((state) => state.classroom.classCount);
  const dispatch = useAppDispatch();
  const handleClassFetch = async () => {
    await dispatch(fetchClassrooms());
  };

  useEffect(() => {
    handleClassFetch();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View className="flex-row justify-between items-start mb-10">
          <View className="flex-1">
            <Text className="text-mutedForeground text-base font-semibold tracking-wide uppercase opacity-70">
              Welcome Back
            </Text>
            <Text className="text-4xl font-black text-foreground mt-1 leading-tight">
              {currentUser?.name.split(" ")[0]}{" "}
              <Text className="text-primary">.</Text>
            </Text>
          </View>

          <TouchableOpacity className="bg-white p-3 rounded-2xl shadow-sm border border-border/50">
            <Ionicons name="notifications-outline" size={24} color="#0f172a" />
            <View className="absolute top-3 right-3 w-3 h-3 bg-destructive rounded-full border-2 border-white" />
          </TouchableOpacity>
        </View>

        {/* Hero Stats Card */}
        <View className="bg-slate-900 rounded-[32px] p-8 mb-10 shadow-2xl shadow-slate-900/20 relative overflow-hidden">
          {/* Background Decoration */}
          <View className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
          <View className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />

          <View className="flex-row justify-between items-end">
            <View>
              <Text className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">
                Overall Attendance
              </Text>
              <View className="flex-row items-baseline">
                <Text className="text-6xl font-black text-white">85</Text>
                <Text className="text-2xl font-bold text-primary ml-1">%</Text>
              </View>
            </View>
            <View className="bg-primary/20 px-4 py-2 rounded-2xl border border-primary/30">
              <Text className="text-primary font-bold">↑ 2.4%</Text>
            </View>
          </View>

          <View className="h-[1px] bg-slate-800 my-6" />

          <View className="flex-row justify-between">
            <View>
              <Text className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                Total Classes
              </Text>
              <Text className="text-xl font-bold text-white">{classCount}</Text>
            </View>
            <View>
              <Text className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                Status
              </Text>
              <Text className="text-xl font-bold text-emerald-400">
                Exemplary
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions / Section Label */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-2xl font-black text-foreground">
              Upcoming
            </Text>
            <View className="h-1 w-8 bg-primary rounded-full mt-1" />
          </View>
          <TouchableOpacity>
            <Text className="text-primary font-bold text-sm">
              View Schedule
            </Text>
          </TouchableOpacity>
        </View>

        {/* Up Next Card */}
        <TouchableOpacity
          activeOpacity={0.9}
          className="bg-white p-7 rounded-[28px] border border-border/40 shadow-sm mb-10"
        >
          <View className="flex-row justify-between items-start mb-6">
            <View className="bg-primary/10 p-3 rounded-2xl">
              <Ionicons name="wifi-outline" size={28} color="#059669" />
            </View>
            <View className="bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              <Text className="text-emerald-700 text-xs font-bold">
                LIVE NOW
              </Text>
            </View>
          </View>

          <Text className="text-2xl font-black text-foreground">
            Digital Communication
          </Text>
          <Text className="text-mutedForeground font-semibold mt-1 opacity-70">
            Prof. Moumita Sengupta
          </Text>

          <View className="flex-row mt-6 space-x-4">
            <View className="flex-row items-center bg-slate-50 px-3 py-2 rounded-xl">
              <Ionicons name="time-outline" size={16} color="#64748b" />
              <Text className="text-slate-600 font-bold text-xs ml-2">
                10:00 - 11:30 AM
              </Text>
            </View>
            <View className="flex-row items-center bg-slate-50 px-3 py-2 rounded-xl ml-3">
              <Ionicons name="people-outline" size={16} color="#64748b" />
              <Text className="text-slate-600 font-bold text-xs ml-2">
                34 Enrolled
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Recent Activity Section */}
        <Text className="text-2xl font-black text-foreground mb-6">
          Activity Log
        </Text>

        <View className="bg-white p-6 rounded-[28px] border border-border/40 shadow-sm flex-row justify-between items-center mb-8">
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-12 bg-emerald-100 rounded-2xl items-center justify-center">
              <Ionicons name="checkmark-circle" size={24} color="#059669" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="font-bold text-foreground text-lg">
                Analog Circuit
              </Text>
              <Text className="text-mutedForeground text-sm font-medium opacity-70">
                Marked at 09:45 AM
              </Text>
            </View>
          </View>

          <View className="bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <Text className="text-emerald-600 font-bold text-xs">On Time</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
