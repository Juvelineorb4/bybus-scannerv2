import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import styles from "@/utils/styles/Unprofile.module.css";
import CustomSelect from "@/components/CustomSelect";
import { Auth } from "aws-amplify";
import { useRecoilState } from "recoil";
import { tokenProfileGlobal, travelSelect } from "@/atoms/Modals";
const Settings = () => {
  const global = require("@/utils/styles/global.js");
  const [tokenProfile, setTokenProfile] = useRecoilState(tokenProfileGlobal);
  const [selectTravel, setSelectTravel] = useRecoilState(travelSelect);
  const onHandlerLogout = async () => {
    await Auth.signOut();
  };

  const onHandlerChangeProfile = () => {
    setTokenProfile(null);
    setSelectTravel({});
  };

  return (
    <View style={[global.bgWhite, { flex: 1 }]}>
      <View>
        <Text style={[styles.titleSettings, global.black, { marginTop: 20 }]}>
          {`Perfil`}
        </Text>
        <View style={[styles.line, global.bgWhiteSmoke]} />
        <TouchableOpacity activeOpacity={1} onPress={onHandlerChangeProfile}>
          <CustomSelect
            title={`Cambiar de perfil`}
            subtitle={`Cierra sesion de tu perfil e inicia con otro`}
            styled={{
              text: {
                container: styles.textContainerSelect,
                title: [styles.textTitleSelect, global.black],
                subtitle: [styles.textSubtitleSelect, global.topGray],
              },
              container: styles.containerSelect,
              iconLeft: [styles.iconLeft, global.mainBgColor],
              iconRight: styles.iconRight,
            }}
            icon={{
              left: require("@/utils/images/profile_white.png"),
              right: require("@/utils/images/arrow_right.png"),
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={onHandlerLogout}>
          <CustomSelect
            title={`Cerrar sesion`}
            subtitle={`Cierra sesion de tu cuenta en general`}
            styled={{
              text: {
                container: styles.textContainerSelect,
                title: [styles.textTitleSelect, global.black],
                subtitle: [styles.textSubtitleSelect, global.topGray],
              },
              container: styles.containerSelect,
              iconLeft: [styles.iconLeft, global.mainBgColor],
              iconRight: styles.iconRight,
            }}
            icon={{
              left: require("@/utils/images/exit.png"),
              right: require("@/utils/images/arrow_right.png"),
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
