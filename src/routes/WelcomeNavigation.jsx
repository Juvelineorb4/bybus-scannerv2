import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "@/screens/Auth/Welcome";
import Login from "@/screens/Auth/Login";
import Header from "./Header/Header";
import Profiles from "@/screens/Auth/Profiles";

// recoil
import { useRecoilValue } from "recoil";
import { userAuthenticated, tokenProfileGlobal } from "@/atoms/Modals";
const Stack = createNativeStackNavigator();

const WelcomeNavigation = () => {
  const userAuth = useRecoilValue(userAuthenticated);
  const tokenProfile = useRecoilValue(tokenProfileGlobal);
  return (
    <Stack.Navigator initialRouteName={userAuth ? "Welcome" : "Profiles"}>
      {!userAuth ? (
        <>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Profiles"
          component={Profiles}
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default WelcomeNavigation;
