import AsyncStorage from "@react-native-async-storage/async-storage";

const getAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    console.log(typeof token);
    if (token !== null) {
      return JSON.parse(token);
    }
  } catch (error) {
    console.log(error);
  }
};

export default getAccessToken;
