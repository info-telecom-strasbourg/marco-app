import { Pressable, SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import { ToastAndroid } from "react-native";

import { useState } from "react";
import { useAuth } from "@/auth/useAuth";

function LoginForm() {
  const { signIn } = useAuth();

  const [username, setUsername] = useState<string>('admin@local.dev');
  const [password, setPassword] = useState<string>('pekorapeko');

  function onLoginPress() {
    ToastAndroid.showWithGravity(
      `Log in using credentials: ${username} - ${password}`, 2, 0);

    signIn({ email: username, password })
      .then(payload => ToastAndroid.showWithGravity(`Connected as ${payload.user}`, 2, 0))
  }

  return (
    <>
      <TextInput style={styles.input} onChangeText={setUsername} placeholder="Username" />
      <TextInput style={styles.input} onChangeText={setPassword} secureTextEntry={true} placeholder="Password" />

      <Pressable style={styles.button} onPress={() => onLoginPress()}>
        <Text style={styles.buttonLabel}>Se connecter</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => { }}>
        <Text style={styles.buttonLabel}>Dev: Go to homepage</Text>
      </Pressable>
    </>
  )
}

export default function AuthLogin() {
  return (
    <SafeAreaView style={styles.container}>
      <LoginForm />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

