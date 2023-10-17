import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  Animated,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styles from "@/utils/styles/Tabs.module.css";
import SettingsNavigation from "./SettingsNavigation";
import ScanNavigation from "./ScanNavigation";

const Tab = createBottomTabNavigator();
const global = require('@/utils/styles/global.js');
const { width } = Dimensions.get("window");
const MARGIN = 0;
const TAB_BAR_WIDTH = width - 2 * MARGIN;
const TAB_WIDTH = TAB_BAR_WIDTH / 2

function MyTabBar({ state, descriptors, navigation }) {
  const [translateX] = useState(new Animated.Value(0));

  const translateTab = (index) => {
    Animated.spring(translateX, {
      toValue: index * TAB_WIDTH,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    translateTab(state.index);
  }, [state.index]);
  return (
    <View
      style={[styles.tabBarContainer, global.bgWhite, { width: TAB_BAR_WIDTH, bottom: MARGIN }]}
    >
      <View
        style={{
          width: TAB_WIDTH,
          ...StyleSheet.absoluteFillObject,
          alignItems: "center",
        }}
      >
        <Animated.View
          style={[styles.slidingTab, global.mainBgColorSecond, { transform: [{ translateX }] }]}
        />
      </View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };
        const tabBarIcon = options.tabBarIcon;
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={index}
            style={{ flex: 1, alignItems: "center" }}
          >
            <TabIcon
              tabIcon={tabBarIcon}
              isFocused={isFocused}
              label={label}
              index={state.index}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TabIcon = ({ isFocused, tabIcon, label, index }) => {
  const [translateY] = useState(new Animated.Value(0));

  const translateIcon = (val) => {
    Animated.spring(translateY, {
      toValue: val,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isFocused) {
      translateIcon(-15);
    } else {
      translateIcon(0);
    }
  }, [index]);
  return (
    <>
      <Animated.View style={{ transform: [{ translateY }] }}>
        <Image
          style={{
            width: 33,
            height: 33,
            resizeMode: "contain",
          }}
          source={isFocused ? tabIcon.activeIcon : tabIcon.inActiveIcon}
        />
      </Animated.View>
      <Text
        style={{
          color: isFocused ? "#261F3C" : "#404040",
          fontSize: 12,
          fontFamily: "light",
          fontWeight: "thin",
          marginTop: 5
        }}
      >
        {label}
      </Text>
    </>
  );
};
const Tabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      initialRouteName={`Scan_Tab`}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={"Scan_Tab"}
        component={ScanNavigation}
        key={`Scan_Tab`}
        options={{
          tabBarIcon: {
            activeIcon: require("@/utils/images/scan_white.png"),
            inActiveIcon: require("@/utils/images/scan.png"),
          },
          headerShown: false,
          tabBarLabel: "Escanea",
        }}
      />
      <Tab.Screen
        name={"Settings_Tab"}
        key={`Settings_Tab`}
        component={SettingsNavigation}
        options={{
          tabBarIcon: {
            activeIcon: require("@/utils/images/edit_white.png"),
            inActiveIcon: require("@/utils/images/edit.png"),
          },
          headerShown: false,
          tabBarLabel: "Opciones",
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;