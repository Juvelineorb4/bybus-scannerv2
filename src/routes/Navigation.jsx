import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// amplify
import { Auth, Hub } from "aws-amplify";

// recoil
import {
  userAuthenticated,
  tokenProfileGlobal,
  errorMessageLogin,
} from "@/atoms/Modals";
import { useRecoilState, useSetRecoilState } from "recoil";

// graphql
import { API } from "aws-amplify";
import * as mutations from "@/graphql/mutations";
// Hooks Custom
import WelcomeNavigation from "./WelcomeNavigation";
import Tabs from "./Tabs/Tabs";

const Navigation = () => {
  const [userAuth, setUserAuth] = useRecoilState(userAuthenticated);
  const [tokenProfile, setTokenProfile] = useRecoilState(tokenProfileGlobal);
  const setError = useSetRecoilState(errorMessageLogin);
  const Stack = createNativeStackNavigator();

  //para esuchar que esta succdiendo con auth
  useEffect(() => {
    // crear subscripcion
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      console.log("HUB: ", event);
      switch (event) {
        case "signIn":
          checkUser();
          break;
        case "signOut":
          setTokenProfile(null);
          setUserAuth(null);
          
          break;
      }
    });
    // Preguntar si el usuario existe
    checkUser();
    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log("OBSERVAR CAMBIOS", {
      userAuth: userAuth?.attributes?.name,
      tokenProfile: tokenProfile?.name,
    });
  }, [userAuth, tokenProfile]);

  const checkUser = async () => {
    try {
      const result = await Auth.currentAuthenticatedUser();

      if (
        !result?.signInUserSession?.accessToken?.payload["cognito:groups"] &&
        !result?.signInUserSession?.accessToken?.payload[
          "cognito:groups"
        ]?.includes("agency")
      ) {
        console.log("mi pana no tenes permiso");
        await Auth.signOut();
        setError("Usuario no Autorizado: Solo se Permiten cuentas de empresas");
        return;
      }

      setUserAuth(result);
    } catch (error) {
      console.log(error.message);
      console.log("Not signed in");
      setUserAuth(null);
      setTokenProfile(null);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Welcome_Navigation"}>
        <Stack.Screen
          name={`Welcome_Navigation`}
          component={WelcomeNavigation}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={`Tabs`}
          component={Tabs}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
