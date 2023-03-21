import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import ScreenHeaderBtn from "../components/header/ScreenHeaderBtn";
import { COLORS, icons, images } from "../constants";
import { ScrollView } from "react-native-gesture-handler";
import CoursesCard from "../components/courses/CoursesCard";

const dashboard = () => {
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const router = useRouter();
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={images.profile}
              dimension="100%"
              handlePress={() => router.push("/profile")}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CoursesCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default dashboard;

const styles = StyleSheet.create({});
