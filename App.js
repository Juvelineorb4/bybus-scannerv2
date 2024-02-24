import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Navigation from "@/routes/Navigation";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { RecoilRoot } from "recoil";
// exportaciones amplify
import { Amplify } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { StatusBar } from "expo-status-bar";

// Configuracion de Amplify
Amplify.configure(awsconfig);
SplashScreen.preventAutoHideAsync();
export default function App() {
  const [fontsLoaded] = useFonts({
    thin: require("@/utils/fonts/Montserrat-Thin.ttf"),
    regular: require("@/utils/fonts/Montserrat-Regular.ttf"),
    light: require("@/utils/fonts/Montserrat-Light.ttf"),
    bold: require("@/utils/fonts/Montserrat-Bold.ttf"),
    extralight: require("@/utils/fonts/Montserrat-ExtraLight.ttf"),
    medium: require("@/utils/fonts/Montserrat-Medium.ttf"),
    black: require("@/utils/fonts/Montserrat-Black.ttf"),
    semibold: require("@/utils/fonts/Montserrat-SemiBold.ttf"),
    thinItalic: require("@/utils/fonts/Montserrat-ThinItalic.ttf"),
    mediumItalic: require("@/utils/fonts/Montserrat-MediumItalic.ttf"),
    lightItalic: require("@/utils/fonts/Montserrat-LightItalic.ttf"),
    boldItalic: require("@/utils/fonts/Montserrat-BoldItalic.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RecoilRoot>
          <BottomSheetModalProvider>
            <StatusBar style="dark" />
            <Navigation />
          </BottomSheetModalProvider>
        </RecoilRoot>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
