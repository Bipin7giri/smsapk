import React from "react";
import { StyleSheet, Image } from "react-native";

const Avatar = ({ imageUrl, size }) => {
  const styles = StyleSheet.create({
    avatar: {
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 2,
      borderColor: "#fff",
    },
  });

  return <Image source={{ uri: imageUrl }} style={styles.avatar} />;
};

export default Avatar;
