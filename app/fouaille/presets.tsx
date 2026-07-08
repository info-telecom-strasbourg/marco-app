import { useGetProductTypes } from "@/query/fouaille/productTypes";
import type { Preset } from "@/schemas/fouaille/preset";
import { usePresetStore } from "@/store/preset";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function PresetItem({ item }: { item: Preset }) {
  return (
    <View className="flex-row flex-1 gap-1 p-2">
      <View>
        <Text style={{}}>{item.name}</Text>
        <Text style={{}}>{item.description}</Text>
      </View>

      <View>
        <Text style={{}}>{item.products.length}</Text>
      </View>
    </View>
  );
}

export default function PresetPage() {
  const [activeChip, setActiveChip] = useState<number>(3);
  const [filteredPresets, setFilteredPresets] = useState<Preset[]>([]);

  const { data: productTypes } = useGetProductTypes();
  const { presets } = usePresetStore();

  useEffect(() => {
    if (!productTypes?.data) return;

    setFilteredPresets(
      presets.filter((preset) => preset.category === activeChip),
    );
  }, [productTypes, presets, activeChip]);

  return (
    <SafeAreaView style={{ flex: 1, padding: 4 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          padding: 8,
        }}
      >
        <TouchableOpacity onPress={() => setActiveChip(3)}>
          <Text style={{ color: activeChip === 3 ? "red" : "black" }}>
            Afterwork
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveChip(4)}>
          <Text style={{ color: activeChip === 4 ? "red" : "black" }}>
            Repas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveChip(1)}>
          <Text style={{ color: activeChip === 1 ? "red" : "black" }}>
            Soirée
          </Text>
        </TouchableOpacity>
      </View>

      <FlashList data={filteredPresets} renderItem={PresetItem} />
    </SafeAreaView>
  );
}
