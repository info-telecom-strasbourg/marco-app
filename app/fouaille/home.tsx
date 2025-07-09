import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function FouailleHome({ route }) {
  const navigation = useNavigation();
  const [scannerData, setScannerData] = useState('');

  useEffect(() => {
    if (route.params?.scanData) {
      setScannerData(route.params.scanData)
    }
  }, [route.params?.scanData]);

  return (
    <SafeAreaView className="flex-1 p-2">
      <View className="justify-evenly flex-row">
        <TouchableOpacity className="items-center" onPress={() => navigation.navigate("Scanner")}>
          <Text>Scan a QRCode</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center" onPress={() => navigation.navigate("Presets")}>
          <Text>Edit presets</Text>
        </TouchableOpacity>

      </View>

      {scannerData && <Text>{scannerData}</Text>}
    </SafeAreaView>
  )
}
