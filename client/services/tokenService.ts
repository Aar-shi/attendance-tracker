import * as SecureStore from "expo-secure-store";

export const saveToken = async (jwt: string) => {
  await SecureStore.setItemAsync("jwt", jwt);
};

export const getToken = async () => {
  return await SecureStore.getItemAsync("jwt");
};

export const clearToken = async () => {
  await SecureStore.deleteItemAsync("jwt");
};
