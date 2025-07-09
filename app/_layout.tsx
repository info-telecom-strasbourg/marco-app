import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInPage from './auth/login';

import HomePage from './(home)/home';
import ProductPage from './(home)/product';
import CartPage from './(home)/cart';

import FouailleHome from './fouaille/home';
import ScanPage from './fouaille/scan';

import { useAuthStore } from "@/store/auth";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function RootLayout() {
  const { user } = useAuthStore();

  const Stack = createNativeStackNavigator();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          {!user ? (
            // Global routes
            <Stack.Screen name='sign_in' component={SignInPage} options={{ headerTitle: "Connexion" }} />
          ) : (
            <>
              <Stack.Group>
                <Stack.Screen name='Products' component={ProductPage} options={{ headerTitle: "Produits" }} />
                <Stack.Screen name='Home' component={HomePage} options={{ headerTitle: "Mon compte fouaille" }} />
                <Stack.Screen name='Cart' component={CartPage} options={{ headerTitle: "Mon panier" }} />
              </Stack.Group>

              <Stack.Group>
                <Stack.Screen name='Fouaille' component={FouailleHome} />
                <Stack.Screen name='Scanner' component={ScanPage} options={{ presentation: 'modal' }} />
              </Stack.Group>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}
