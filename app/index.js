import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter, Stack } from "expo-router";
import { COLORS, FONT, icons, images, SIZES } from "../constants";
import { ScrollView } from "react-native-gesture-handler";

const Home = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.pink_400 },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <View
        style={{
          flex: 1,
          padding: SIZES.small,
          backgroundColor: COLORS.pink_400,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: SIZES.large,
              color: COLORS.white,
            }}
          >
            Wellcome
          </Text>
          <Text
            style={{
              fontSize: SIZES.xxLarge,
              color: COLORS.lightWhite,
            }}
          >
            To SMS
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/login");
            }}
            style={{
              marginTop: SIZES.large,
              borderColor: COLORS.lightWhite,
              borderWidth: 1,
              padding: SIZES.small,
            }}
          >
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: SIZES.large,
                color: COLORS.white,
              }}
            >
              Get Start
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
