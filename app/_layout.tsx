import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInPage from './auth/login';

import HomePage from './(home)/product';

import ScanPage from './fouaille/scan';
import { CartProvider } from "../src/store/cart";

export default function RootLayout() {
  const Stack = createNativeStackNavigator();

  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="sign_in">
          {/* Global routes */}
          <Stack.Screen name='sign_in' component={SignInPage} />

          {/* Main routes (not admin) */}
          <Stack.Screen name='home' component={HomePage} />

          {/* Admin-specific routes (fouaille) */}
          <Stack.Screen name='scan' component={ScanPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  )
}

