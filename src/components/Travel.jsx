import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { travelSelect } from "@/atoms/Modals";
const Travel = ({ item }) => {
  const global = require("@/utils/styles/global.js");
  const [active, setActive] = useState(false);
  const [selectTravel, setSelectTravel] = useRecoilState(travelSelect);
  const onHandleCheckActive = () => {
    if (selectTravel.id === item.id) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  useEffect(() => {
    onHandleCheckActive();
  }, [selectTravel]);

  return (
    <TouchableOpacity
      style={[
        {
          height: 50,
          width: 125,
          borderWidth: 0.5,
          borderColor: "#444",
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          marginBottom: 10,
        },
        active && global.mainBgColorSecond,
      ]}
      onPress={() => {
        if (active === false) {
          setSelectTravel(item);
          setActive(true);
        }
      }}
    >
      <Text
        style={[
          { fontFamily: active ? "light" : "thin", fontSize: 12 },
          active ? global.white : global.black,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default Travel;
