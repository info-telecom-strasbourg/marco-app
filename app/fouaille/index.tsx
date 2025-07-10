import { useRouter } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function FouailleHome() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 p-2">
      <View className="justify-evenly flex-row">
        <TouchableOpacity className="items-center" onPress={() => router.navigate("/fouaille/scan")}>
          <Text>Scan a QRCode</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center" onPress={() => router.navigate("/fouaille/presets")}>
          <Text>Edit presets</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
