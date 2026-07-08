import Icon from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function FouailleLayout() {
  return (
    <Tabs
      screenOptions={{
        sceneStyle: { backgroundColor: "white" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Fouaille",
          tabBarIcon: () => <Icon size={16} name="home" />,
        }}
      />

      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: () => <Icon size={16} name="camera" />,
        }}
      />

      <Tabs.Screen
        name="presets"
        options={{
          title: "Presets",
          tabBarIcon: () => <Icon size={16} name="address-book" />,
        }}
      />

      <Tabs.Screen name="carts/[cartId]" options={{ href: null }} />
    </Tabs>
  );
}
