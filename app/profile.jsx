import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONT, icons, SIZES } from "../constants";
import { Stack, useRouter } from "expo-router";
import ScreenHeaderBtn from "../components/header/ScreenHeaderBtn";
import { ScrollView } from "react-native-gesture-handler";
import { api, useGetMe } from "../api";
const Profile = () => {
  const router = useRouter();
  const { data, isloading, isError } = useGetMe();
  console.log(data);
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.white },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.chevronLeft}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView style={styles.container}>
        {isloading && <ActivityIndicator />}
        <View style={styles.header}>
          <Image
            style={styles.photo}
            source={{
              uri: data.avatar,
            }}
          />
          <Text
            style={styles.name}
          >{`${data.firstName} ${data.lastName}`}</Text>
          <Text style={styles.title}>BCA</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>
            <View style={styles.sectionContent}>
              <Text style={styles.sectionItem}>Email: {data?.email}</Text>
              <Text style={styles.sectionItem}>
                Phonenumber: {data?.phoneNumber}
              </Text>
              <Text style={styles.sectionItem}>Address: {data?.address}</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Subjects</Text>
            <View style={styles.sectionContent}>
              <View style={styles.sectionItem}>
                {data?.classes?.map((item) => {
                  return (
                    <Text key={item.id} style={styles.sectionItemTitle}>
                      {item?.subjectId?.subject_name}
                    </Text>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.tertiary,
  },
  title: {
    fontSize: 16,
    color: "gray",
  },
  body: {},
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.tertiary,
  },
  sectionContent: {
    marginTop: 8,
  },
  sectionItem: {
    marginVertical: 4,
  },
  sectionItemTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  sectionItemDesc: {
    fontSize: 14,
    color: "gray",
  },
});
