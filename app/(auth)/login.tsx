import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
  Image,
} from "react-native";
import { useState } from "react";
import { useAuth } from "@/auth/useAuth";

function LoginForm() {
  const { signIn } = useAuth();

  const [username, setUsername] = useState<string>("root@admin.dev");
  const [password, setPassword] = useState<string>("password");

  function onLoginPress() {
    ToastAndroid.showWithGravity(
      `Log in using credentials: ${username} - ${password}`,
      2,
      0,
    );

    signIn({ email: username, password }).then((payload) =>
      ToastAndroid.showWithGravity(
        payload
          ? `Connected as ${payload.user.user_name}`
          : "Invalid credentials",
        2,
        0,
      ),
    );
  }

  return (
    <>
      <Text>Sign In URL is: {process.env.EXPO_PUBLIC_API_URL}</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder="Password"
      />

      <Pressable style={styles.button} onPress={onLoginPress}>
        <Text style={styles.buttonLabel}>Se connecter</Text>
      </Pressable>
    </>
  );
}

export default function AuthLogin() {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../../assets/PRTS.png")} />
      <LoginForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 40,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 320,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    width: 320,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  toggleText: {
    color: "black",
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
  errorText: {
    color: "red",
  },
});
