import Icon from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function HomeLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Mon profil",
          tabBarIcon: () => <Icon size={16} name="home" />,
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "Historique",
          tabBarIcon: () => <Icon size={16} name="history" />,
        }}
      />

      <Tabs.Screen
        name="products"
        options={{
          title: "Produits",
          tabBarIcon: () => <Icon size={16} name="product-hunt" />,
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Mon panier",
          tabBarIcon: () => <Icon size={16} name="shopping-cart" />,
        }}
      />
    </Tabs>
  );
}
