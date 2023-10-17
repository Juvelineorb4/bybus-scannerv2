import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Scan from "@/screens/Scan/Scan";
import Scanner from "@/screens/Scan/Scanner";
import Header from "../Header/Header";

const Stack = createNativeStackNavigator();

const ScanNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={`Scan`}>
      <Stack.Screen
        name="Scan"
        component={Scan}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Scanner"
        component={Scanner}
        options={{
          header: () => <Header mode="back-only" color='yellow' />,
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};

export default ScanNavigation;
