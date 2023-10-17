import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";

const CustomButton = ({ text, handlePress, textStyles, buttonStyles, icon = {}, disabled = false }) => {
  return (
    <TouchableOpacity style={buttonStyles} onPress={handlePress} disabled={disabled}>
      {text && <Text style={textStyles}>{text}</Text>}
      {icon.status ? '' : icon.image && <Image
        style={{
          width: 30,
          height: 30,
        }}
        source={icon.image}
      />}
    </TouchableOpacity>
  );
};

export default CustomButton;
