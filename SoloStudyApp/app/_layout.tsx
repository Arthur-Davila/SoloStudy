import { Ionicons } from "@expo/vector-icons";
import {Drawer} from "expo-router/drawer";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout(){
  return(<GestureHandlerRootView style={{ flex: 1 }}>
   <Drawer screenOptions={{drawerActiveTintColor: "#e91e63",drawerHideStatusBarOnOpen: true,drawerType: "front",headerShown: false,drawerStyle: {backgroundColor: "#fff", width: 240} }
  }>
    <Drawer.Screen
      name="index"
      options={{
        title: "Home",
        headerShown: true,
        drawerLabel: "Home",
        drawerIcon: ({ color, size }) => (
        <Ionicons name="home" size={size} color={color} />),
      }}
    />
    <Drawer.Screen
      name="Tags"
      options={{
        title: "Tags",
        headerShown: true,
        drawerLabel: "Tags",
        drawerIcon: ({ color, size }) => (
        <Ionicons name="pricetag" size={size} color={color} />),
      }}
    />
    <Drawer.Screen
      name="Settings"
      options={{
        title: "Settings",
        headerShown: true,
        drawerLabel: "Settings",
        drawerIcon: ({ color, size }) => (
        <Ionicons name="settings" size={size} color={color} />),
      }}
    />
   </Drawer>
  </GestureHandlerRootView>);
  }