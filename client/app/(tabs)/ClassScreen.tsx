import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ClassItem } from "@/types/classes";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchClassrooms } from "@/redux/slice/classroomSlice";

export default function ClassScreen() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [isSearchEmpty, setIsSearchEmpty] = useState(true);
  const [searchParams, setSearchParams] = useState<string>();
  const [filteredClasses, setFilteredClasses] = useState<ClassItem[]>([]);

  // ⭐ FAB MENU STATE
  const [menuVisible, setMenuVisible] = useState(false);

  //redux states
  const classrooms: ClassItem[] | null = useAppSelector(
    (state) => state.classroom.classrooms,
  );
  const currentUser = useAppSelector((state) => state.auth.authUser);
  const dispatch = useAppDispatch();

  const handleFetchClassrooms = async () => {
    setClasses(classrooms || []);
  };

  useEffect(() => {
    handleFetchClassrooms();
  }, [classrooms]);

  const handleSearch = (text: string) => {
    setSearchParams(text);

    if (text.length > 0) setIsSearchEmpty(false);
    else setIsSearchEmpty(true);

    const data: ClassItem[] = classes.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredClasses(data);
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      {/* ---------- HEADER ---------- */}
      <View className="px-6 pt-6 pb-2">
        <View className="flex-row justify-between items-end">
          <View>
            <Text className="text-4xl font-black text-foreground">
              Classes <Text className="text-primary">.</Text>
            </Text>
            <Text className="text-mutedForeground font-semibold mt-1 opacity-70">
              Manage your academic schedule
            </Text>
          </View>

          <View className="bg-primary/10 px-3 py-1.5 rounded-xl flex-row items-center">
            <Ionicons name="person" size={14} color="#059669" />
            <Text className="text-[10px] font-bold text-primary ml-1.5 uppercase tracking-tighter">
              {currentUser?.role || "STUDENT"}
            </Text>
          </View>
        </View>
      </View>

      {/* ---------- SEARCH BAR ---------- */}
      <View className="flex-row items-center px-6 mt-6 mb-4 gap-4">
        <View className="flex-1 bg-white rounded-2xl px-5 py-4 flex-row items-center shadow-sm border border-border/40">
          <Ionicons name="search-outline" size={20} color="#94a3b8" />
          <TextInput
            onChangeText={handleSearch}
            placeholder="Search your classes..."
            placeholderTextColor="#94a3b8"
            className="flex-1 text-foreground font-medium ml-3"
          />
        </View>

        <TouchableOpacity className="bg-white p-4 rounded-2xl shadow-sm border border-border/40">
          <Ionicons name="options-outline" size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>

      {/* ---------- CLASS LIST ---------- */}
      <FlatList
        data={isSearchEmpty ? classes : filteredClasses}
        keyExtractor={(item) => item.classId}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View className="items-center justify-center mt-20 opacity-50">
            <Ionicons name="book-outline" size={80} color="#94a3b8" />
            <Text className="text-lg font-bold text-slate-400 mt-4">No classes found</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: `/[classID]/Announcements`,
                params: {
                  classID: item.classId,
                  className: item.name,
                },
              })
            }
            className="mb-6"
          >
            <View className="bg-white rounded-[32px] p-6 shadow-sm border border-border/30 relative overflow-hidden">
              {/* Decorative accent */}
              <View className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mt-8" />
              
              <View className="flex-row justify-between items-start">
                <View className="flex-1 pr-4">
                  <Text className="text-2xl font-black text-foreground" numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text className="text-mutedForeground font-bold mt-1 opacity-70">
                    Prof. {item.teacherName}
                  </Text>
                </View>
                <View className="bg-slate-50 p-3 rounded-2xl">
                  <Ionicons name="journal-outline" size={22} color="#475569" />
                </View>
              </View>

              <View className="flex-row justify-between items-center mt-8 pt-6 border-t border-slate-50">
                <View className="flex-row space-x-4">
                  <View className="flex-row items-center bg-slate-50 px-3 py-1.5 rounded-xl mr-3">
                    <Ionicons name="calendar-outline" size={14} color="#64748b" />
                    <Text className="text-[11px] font-bold text-slate-500 ml-2">
                      {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </Text>
                  </View>

                  <View className="flex-row items-center bg-slate-50 px-3 py-1.5 rounded-xl">
                    <Ionicons name="people-outline" size={14} color="#64748b" />
                    <Text className="text-[11px] font-bold text-slate-500 ml-2">
                      100+
                    </Text>
                  </View>
                </View>

                <View className="bg-primary/10 p-2 rounded-full">
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color="#059669"
                  />
                </View>
              </View>
            </View>
          </Pressable>
        )}
      />

      {/* ================= FAB MENU ================= */}

      {menuVisible && (
        <View className="absolute bottom-28 right-8 items-end space-y-4">
          {/* CREATE */}
          <TouchableOpacity
            onPress={() => {
              setMenuVisible(false);
              router.push({
                pathname: "/form",
                params: { type: "create" },
              });
            }}
            className="bg-white px-6 py-4 rounded-2xl border border-border/50 shadow-xl flex-row items-center mb-4"
          >
            <Text className="text-foreground font-black mr-4 text-base">
              Create New
            </Text>
            <View className="bg-primary/20 p-2 rounded-xl">
              <Ionicons name="add-circle" size={24} color="#059669" />
            </View>
          </TouchableOpacity>

          {/* ENROLL */}
          <TouchableOpacity
            onPress={() => {
              setMenuVisible(false);
              router.push({
                pathname: "/form",
                params: { type: "enroll" },
              });
            }}
            className="bg-white px-6 py-4 rounded-2xl border border-border/50 shadow-xl flex-row items-center"
          >
            <Text className="text-foreground font-black mr-4 text-base">
              Join Class
            </Text>
            <View className="bg-blue-100 p-2 rounded-xl">
              <Ionicons name="school" size={24} color="#2563eb" />
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* FLOATING "+" BUTTON */}
      <TouchableOpacity
        onPress={() => setMenuVisible(!menuVisible)}
        activeOpacity={0.9}
        className={`absolute bottom-8 right-8 w-16 h-16 rounded-3xl items-center justify-center shadow-2xl shadow-primary/40 ${menuVisible ? 'bg-slate-900' : 'bg-primary'}`}
      >
        <Ionicons name={menuVisible ? "close" : "add"} size={36} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}