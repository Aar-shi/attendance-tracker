import { router, Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Pressable, StatusBar, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useEffect } from "react";
import { checkAuth } from "@/redux/slice/authSlice";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar barStyle={"default"} />
        <RootNavigator />
      </Provider>
    </SafeAreaProvider>
  );
}
// Separate navigator to make sure <Provider> is mounted before useAppSelector is used
export const RootNavigator = () => {
  const authUser = useAppSelector((state) => state.auth.authUser);
  const dispatch = useAppDispatch();

  const checkAuthStatus = async () => {
    dispatch(checkAuth());
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          flex: 1,
        },
      }}
    >
      {/* public routes */}
      <Stack.Protected guard={!authUser ? true : false}>
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>
      {/* protected routes */}
      <Stack.Protected guard={authUser ? true : false}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="[classID]"
          options={({ route }) => {
            const params = route.params as {
              classID?: string;
              className?: string;
            };

            return {
              headerShown: true,
              title: params?.className ?? "Class",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: "#e9faee",
              },

              headerLeft: () => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      router.back();
                    }}
                    className="text-center p-2 rounded-full bg-white  mr-4"
                  >
                    <Ionicons name="arrow-back-outline" size={20} />
                  </TouchableOpacity>
                );
              },
            };
          }}
        />
      </Stack.Protected>
    </Stack>
  );
};
