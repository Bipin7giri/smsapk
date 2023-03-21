import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        width: 40,
        height: 40,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.small,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={{
          width: dimension,
          height: dimension,
          borderRadius: SIZES.small,
        }}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;

const styles = StyleSheet.create({});
