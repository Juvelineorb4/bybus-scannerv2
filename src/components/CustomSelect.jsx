import { Image, View } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { Ionicons } from '@expo/vector-icons';

const CustomSelect = ({
  title,
  subtitle,
  styled = {},
  icon = { left: {}, right: {} },
}) => {
  return (
    <View style={styled.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styled.iconLeft}>
          {icon.left && (
            icon.left.type === 'ios' && (
              <Ionicons name={icon.left.name} size={icon.left.size} color={icon.left.color} />
            )
          )}
        </View>
        <CustomText title={title} subtitle={subtitle} styled={styled.text} />
      </View>

      {icon.right && (
        <View style={styled.iconRight}>
          <Image
            style={{
              width: 40,
              height: 45,
              resizeMode: "contain",
              alignSelf: "center",
            }}
            source={icon.right}
          />
        </View>
      )}
    </View>
  );
};

export default CustomSelect;