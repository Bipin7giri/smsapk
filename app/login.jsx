import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { api } from "../api";
import { useFocusEffect } from "@react-navigation/native";
import { COLORS } from "../constants";
import getAccessToken from "../helper/getAccessToken";
const Login = ({ navigation }) => {
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("access_token", JSON.stringify(value));
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  const router = useRouter();
  const getAccessTOkens = async () => {
    return await getAccessToken();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isLoggedIn, setIsLogged] = useState(null);
  const handleLogin = () => {
    // Validate form data
    setIsloading(true);
    const validationErrors = {};
    if (!email) {
      validationErrors.email = "Email is required";
      setValid(false);
      setIsloading(false);
    }
    if (!password) {
      validationErrors.password = "Password is required";
      setValid(false);
      setIsloading(false);
    }
    if (email) {
      const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (emailPattern.test(email)) {
        setValid(true);
      } else {
        setValid(false);
        setIsloading(false);
      }
    }
    setErrors(validationErrors);
    if (valid === true) {
      api
        .post("/auth/admin/login", { email: email, password: password })
        .then((res) => {
          storeData(res?.data?.access_token);
          //  AsyncStorage.setItem("token", res?.data?.access_token);
          console.log(res);
          router.push("/dashboard");
          setIsloading(false);
        })
        .catch((err) => {
          setApiError(err?.response?.data?.message);
          console.log(err);
          setIsloading(false);
        });
    }
  };
  useEffect(() => {
    if (getAccessTOkens) {
      setIsLogged(true);
      router.push("/dashboard");
    } else {
      isLoggedIn(false);
    }
  }, [navigation]);
  useFocusEffect(
    React.useCallback(() => {
      console.log("Screen was focused");
      if (isLoggedIn) {
        router.push("/dashboard");
      }
      // Do something when the screen is focused, e.g. fetch data
      return () => {
        console.log("Screen was unfocused");
        if (isLoggedIn) {
          router.push("/dashboard");
        }
        // Do something when the screen is unfocused, e.g. clean up
      };
    }, [])
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {apiError && <Text style={styles.errorText}>{apiError}</Text>}
      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {isloading ? (
          <ActivityIndicator color={COLORS.tertiary} size="small" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          router.push(`/dashboard`);
        }}
        style={{ marginTop: 10 }}
      >
        <Text>Dashbaord</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Login;
