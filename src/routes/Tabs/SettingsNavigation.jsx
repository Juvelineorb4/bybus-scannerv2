import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "@/screens/Settings/Settings";

const Stack = createNativeStackNavigator();

const SettingsNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={`Settings`}>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigation;
