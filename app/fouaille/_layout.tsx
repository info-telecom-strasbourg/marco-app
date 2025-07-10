import { Tabs } from "expo-router";

export default function FouailleLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Fouaille",
        }}
      />

      <Tabs.Screen name="scan" options={{ title: "Scan" }} />
      <Tabs.Screen name="presets" options={{ title: "Presets" }} />
      <Tabs.Screen name="[orderId]" options={{ href: null }} />
    </Tabs>
  );
}
