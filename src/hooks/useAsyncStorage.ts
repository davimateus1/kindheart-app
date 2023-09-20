import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAsyncStorage<T>() {
  const storeData = async (key: string, value: T): Promise<boolean> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  };

  const getData = async (key: string): Promise<T | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value) as T;
      }
      return null;
    } catch {
      return null;
    }
  };

  const removeData = async (key: string): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  };

  return { storeData, getData, removeData };
}
