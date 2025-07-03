import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInPage from './auth/login';

import HomePage from './(home)/home';
import ProductPage from './(home)/product';
import CartPage from './(home)/cart';

import ScanPage from './fouaille/scan';
import { useAuthStore } from "@/store/auth";

export default function RootLayout() {
  const { user } = useAuthStore();

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          // Global routes
          <Stack.Screen name='sign_in' component={SignInPage} options={{ headerTitle: "Connexion" }} />
        ) : (
          <>
            {/* Main routes (not admin) */}
            <Stack.Screen name='home' component={HomePage} options={{ headerTitle: "Mon compte fouaille" }} />
            <Stack.Screen name='product' component={ProductPage} options={{ headerTitle: "Produits" }} />
            <Stack.Screen name='cart' component={CartPage} options={{ headerTitle: "Mon panier" }} />

            {/* Admin-specific routes (fouaille) */}
            <Stack.Screen name='scan' component={ScanPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
