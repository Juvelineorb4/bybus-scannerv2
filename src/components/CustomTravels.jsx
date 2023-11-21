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
import styles from "@/utils/styles/Activity.module.css";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import Travel from "./Travel";
import { travelSelect } from "../atoms/Modals";

const CustomTravels = ({ data, error }) => {
  const global = require("@/utils/styles/global.js");
  const [modalVisible, setModalVisible] = useState(false);
  const { control } = useForm();
  const travel = useRecoilValue(travelSelect);
  useEffect(() => {}, []);

  return (
    <ScrollView
    // style={[global.bgWhite]}
    // showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        style={[styles.inputContainerTag]}
        onPress={() => {
          error()
          setModalVisible(!modalVisible)
        }}
      >
        <View>
          {travel.name ? (
            <View style={styles.containerTag}>
              <Text style={styles.textTag}>{travel.name}</Text>
            </View>
          ) : (
            <Text style={styles.textInputTag}>Selecciona tu viaje</Text>
          )}
        </View>

        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
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
                      width: 25,
                      height: 25,
                      resizeMode: "contain",
                    }}
                    source={require("@/utils/images/arrow_back.png")}
                  />
                </Pressable>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.titleTag}>
                  Lista de viajes disponibles este dia:{" "}
                  {new Date().toISOString().slice(0, 10)}. Selecciona uno.
                </Text>

                <View style={[{ flex: 1 }]}>
                  <FlatList
                    data={data}
                    renderItem={({ item }) => <Travel item={item} />}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CustomTravels;
