import { useRouter } from "expo-router";
import { Pressable, SafeAreaView, Text, View } from "react-native";

export default function FouailleHome() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 p-2">
      <View className="justify-evenly flex-row">
        <Pressable
          className="items-center"
          onPress={() => router.navigate("/fouaille/scan")}
        >
          <Text>Scan a QRCode</Text>
        </Pressable>

        <Pressable
          className="items-center"
          onPress={() => router.navigate("/fouaille/presets")}
        >
          <Text>Edit presets</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
