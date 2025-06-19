import { Pressable, SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import { ToastAndroid } from "react-native";

import { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function onLoginPress() {
    ToastAndroid.showWithGravity(
      `Log in using credentials: ${username} - ${password}`, 2, 0);

    const query = fetch("https://app-pprd.its-tps.fr/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: username, password })
    });

    query
      .then(res => res.text())
      .then(payload => ToastAndroid.showWithGravity(payload, 2, 0))
  }

  return (
    <>
      <TextInput style={styles.input} onChangeText={setUsername} placeholder="Username" />
      <TextInput style={styles.input} onChangeText={setPassword} secureTextEntry={true} placeholder="Password" />

      <Pressable style={styles.button} onPress={() => onLoginPress()}>
        <Text style={styles.buttonLabel}>Se connecter</Text>
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

