import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";
import styles from "@/utils/styles/Profiles.module.css";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EnterCode from "@/components/EnterCode";
import CustomButton from "@/components/CustomButton";

// recoil
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAuthenticated, tokenProfileGlobal } from "@/atoms/Modals";
// amplify
import { API } from "aws-amplify";
import * as queries from "@/graphql/customQueries";
import * as mutations from "@/graphql/customMutations";

const Profiles = ({ navigation }) => {
  const global = require("@/utils/styles/global.js");
  const userAuth = useRecoilValue(userAuthenticated);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [tokenProfile, setTokenProfile] = useState(null);
  const setTokenProfileGlobal = useSetRecoilState(tokenProfileGlobal);
  const [firsTime, setFirsTime] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [errorModal, setErrorModal] = useState("");
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      // email: email,
      code: ["", "", "", ""],
    },
  });

  const pinModal = watch("code");

  useEffect(() => {
    const stringPin = pinModal.join("");
    if (stringPin.length === 4) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [pinModal]);

  useEffect(() => {
    if (userAuth) fetchEmployeesProfile();
  }, [userAuth]);

  const fetchEmployeesProfile = async () => {
    try {
      const agencyID = userAuth?.attributes["custom:agencyID"];
      const result = await API.graphql({
        query: queries.getAgencyEmployees,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          id: agencyID,
        },
      });
      const profilesQRSCAN = result.data.getAgency.employees.items.filter(
        (r) => {
          return r?.type === "COLLECTOR";
        }
      );

      setProfiles(profilesQRSCAN);
    } catch (error) {}
  };

  const onHandlerProfileSelect = (data) => {
    setModalVisible(!modalVisible);
    setTokenProfile(data);
    if (data?.pin) {
      setFirsTime(false);
    } else {
      setFirsTime(true);
    }
  };
  onHandleProfileLogin = async (data) => {
    const stringPin = data.code.join("");
    console.log(stringPin);
    try {
      if (firsTime) {
        await API.graphql({
          query: mutations.updateEmployeePin,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: {
            input: {
              id: tokenProfile.id,
              pin: stringPin,
            },
          },
        });
        setTokenProfileGlobal(tokenProfile);
        await navigation.replace("Tabs");
      } else {
        if (tokenProfile.pin === stringPin) {
          setTokenProfileGlobal(tokenProfile);
          await navigation.replace("Tabs");
        }
      }
    } catch (error) {
      console.log("error en login de profile: ", error.message);
    }
  };
  return (
    <View style={[{ flex: 1, paddingTop: 50 }, global.bgWhite]}>
      <Text style={{ fontFamily: "light", fontSize: 18, paddingLeft: 20 }}>
        Perfiles disponibles "{profiles.length}"
      </Text>

      <View style={[styles.container, global.bgWhite]}>
        {profiles.map((profile) => (
          <TouchableOpacity
            key={profile.id}
            style={styles.column}
            onPress={() => {
              onHandlerProfileSelect(profile);
            }}
          >
            <Image
              style={{
                width: 60,
                height: 60,
                resizeMode: "cover",
                borderRadius: 2,
              }}
              source={require("@/utils/images/email.png")}
            />
            <Text
              style={{
                fontFamily: "light",
                fontSize: 14,
                textAlign: "center",
                marginTop: 5,
              }}
            >
              {profile.name}
            </Text>
          </TouchableOpacity>
        ))}
        <Modal animationType="none" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalTop}>
                <Pressable
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Image
                    style={{
                      width: 35,
                      height: 35,
                      resizeMode: "contain",
                    }}
                    source={require("@/utils/images/arrow_back.png")}
                  />
                </Pressable>
                <Text style={{ fontFamily: "thin", fontSize: 14 }}>
                  Coloca tu PIN para iniciar sesion
                </Text>
              </View>
              <View style={{ justifyContent: "center", alignItem: "center" }}>
                <Text>
                  {firsTime ? "Primera Vez" : "Ingresar pin"}{" "}
                  {tokenProfile?.name}-{tokenProfile?.type}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <EnterCode control={control} />
                <CustomButton
                  text={`Iniciar sesion`}
                  disabled={buttonDisabled ? true : false}
                  handlePress={handleSubmit(onHandleProfileLogin)}
                  textStyles={[styles.textLogin, global.white]}
                  buttonStyles={[styles.login, global.mainBgColorSecond]}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Profiles;
