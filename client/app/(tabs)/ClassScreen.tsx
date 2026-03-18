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
  const dispatch = useAppDispatch();

  const handleFetchClassrooms = async () => {
    setClasses(classrooms);
  };

  useEffect(() => {
    handleFetchClassrooms();
  }, []);

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
      <View className="flex-row justify-between items-center px-5 pt-4">
        <Text className="text-2xl font-bold text-foreground">
          My Classes
        </Text>

        <View className="flex-row items-center gap-2 p-1 rounded-lg">
          <Ionicons name="people-outline" size={18} color="black" />
          <Text className="text-sm text-foreground">
            Student Mode
          </Text>
        </View>
      </View>

      {/* ---------- SEARCH BAR ---------- */}
      <View className="flex-row items-center px-5 mt-4 mb-1 gap-3">
        <View className="flex-1 bg-card rounded-xl px-4 py-3 border border-border">
          <TextInput
            onChangeText={handleSearch}
            placeholder="Search classes..."
            placeholderTextColor="#000"
            className="text-foreground"
          />
        </View>

        <TouchableOpacity className="bg-primary p-3 rounded-xl">
          <Ionicons name="filter" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* ---------- CLASS LIST ---------- */}
      <FlatList
        className="pt-2"
        data={isSearchEmpty ? classes : filteredClasses}
        keyExtractor={(item) => item.classId}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
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
            className="mb-4 rounded-2xl"
          >
            <View className="bg-card border border-border rounded-2xl p-4 mb-4">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-lg font-bold text-foreground">
                    {item.name}
                  </Text>
                  <Text className="text-sm text-mutedForeground mt-1">
                    Prof. {item.teacherName}
                  </Text>
                </View>

                <Ionicons name="people-outline" size={20} color="black" />
              </View>

              <View className="flex-row justify-between mt-4">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="time-outline" size={16} color="black" />
                  <Text className="text-sm text-foreground">
                    {new Date(item.createdAt).toDateString()}
                  </Text>
                </View>

                <View className="flex-row items-center gap-2">
                  <Ionicons name="people-outline" size={16} color="black" />
                  <Text className="text-sm text-foreground">
                    100 Students
                  </Text>
                </View>

                <Ionicons
                  name="arrow-forward-outline"
                  size={18}
                  color="black"
                />
              </View>
            </View>
          </Pressable>
        )}
      />

      {/* ================= FAB MENU ================= */}

      {menuVisible && (
        <View className="absolute bottom-24 right-6 items-end gap-3">
          {/* CREATE */}
          <TouchableOpacity
            onPress={() => {
              setMenuVisible(false);
              router.push({
                pathname: "/form",
                params: { type: "create" },
              });
            }}
            className="bg-card px-4 py-3 rounded-xl border border-border shadow-md flex-row items-center gap-2"
          >
            <Ionicons name="add-circle-outline" size={20} color="black" />
            <Text className="text-cardForeground font-medium">
              Create Class
            </Text>
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
            className="bg-card px-4 py-3 rounded-xl border border-border shadow-md flex-row items-center gap-2"
          >
            <Ionicons name="school-outline" size={20} color="black" />
            <Text className="text-cardForeground font-medium">
              Enroll Class
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* FLOATING "+" BUTTON */}
      <TouchableOpacity
        onPress={() => setMenuVisible(!menuVisible)}
        className="absolute bottom-6 right-6 bg-primary w-16 h-16 rounded-full items-center justify-center shadow-lg"
      >
        <Ionicons name="add" size={34} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}