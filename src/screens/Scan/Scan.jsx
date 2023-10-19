import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import BottomSheetModal from "@/components/BottomSheetModal";
import styles from "@/utils/styles/Scan.module.css";
import CustomButton from "@/components/CustomButton";
import ScanTicketList from "@/components/ScanTicketList";
import CustomTravels from "@/components/CustomTravels";
import UnSelectedView from "@/components/UnSelectedBooking";
import { AntDesign } from "@expo/vector-icons";
// amplify
import { API } from "aws-amplify";
import * as queries from "@/graphql/customQueries";
// recoil
import { useRecoilValue, useRecoilState } from "recoil";
import { tokenProfileGlobal, travelSelect } from "@/atoms/Modals";
const Scan = ({ navigation }) => {
  const global = require("@/utils/styles/global.js");
  const tokenProfile = useRecoilValue(tokenProfileGlobal);
  const [travels, setTravels] = useState([]);
  const [travel, setTravel] = useState(null);
  const [selectTravel, setSelectTravel] = useRecoilState(travelSelect);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchBookingsAvailable = async () => {
    try {
      const result = await API.graphql({
        query: queries.listBookingsAvailable,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          filter: {
            and: [
              { agencyID: { eq: tokenProfile?.agencyID } },
              { status: { eq: "AVAILABLE" } },
            ],
          },
        },
      });
      const newTraverls = result.data.listBookings.items
        .filter((item, index) => {
          let today = new Date().toISOString().slice(0, 10);
          return today === item?.departure?.date;
        })
        .map((item, index) => {
          return {
            id: item.id,
            name: `${item?.departureCity}-${item?.arrivalCity}`,
            date: item?.departure?.date,
            time: item?.departure?.time,
          };
        });
      setTravels(newTraverls);
    } catch (error) {
      console.log(error);
      console.log("error buscando viajes ", error.message);
    }
  };

  const fetchBooking = async () => {
    try {
      console.log(selectTravel?.id);
      const result = await API.graphql({
        query: queries.getBooking,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          id: selectTravel?.id,
        },
      });

      setTravel(result.data.getBooking);
      // console.log(result.data.getBooking.tickets.items[0]);
    } catch (error) {
      console.log(error);
      console.log("Error buscando viaje: ", error.message);
    }
  };

  useEffect(() => {
    if (tokenProfile) fetchBookingsAvailable();
  }, []);

  useEffect(() => {
    if (selectTravel?.id) fetchBooking();
  }, [selectTravel]);

  const horaFormatoNormal = (date, time) => {
    // console.log(date, time);
    const horaMilitar = new Date(`${date}T${time}`);
    let minutosNew = "";
    // // Obtener las horas y minutos
    const horas = horaMilitar.getHours();
    const minutos = horaMilitar.getMinutes();

    // // Determinar si es AM o PM
    const periodo = horas >= 12 ? "PM" : "AM";

    // // Convertir a formato de hora normal (12 horas)
    let horaNormal = horas % 12;
    if (horaNormal === 0) {
      horaNormal = 12; // Si es 0, cambiar a 12 para las 12:xx PM.
    }

    const horaFormateada = horaNormal.toString().padStart(2, "0");
    const minutosFormateados = minutos.toString().padStart(2, "0");

    // // Crear una cadena en formato de hora normal
    const horaEnFormatoNormal = `${horaFormateada}:${minutosFormateados} ${periodo}`;
    return horaEnFormatoNormal;
  };

  const onHandlerScanner = () => {
    setError("");
    if (travel) return navigation.navigate("Scanner");
    setError("*Seleciona un Viaje*");
  };

  const clean = () => {
    setSelectTravel({});
    setTravel(null);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (tokenProfile) {
      setTravels({});
      fetchBookingsAvailable();
    }
    if (selectTravel?.id) {
      setTravel(null);
      fetchBooking();
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={[
          global.mainBgColorSecond,
          { flex: 1, padding: 20, flexDirection: "column" },
        ]}
      >
        <View style={{ paddingTop: 80, paddingBottom: 10 }}>
          <CustomTravels data={travels} />
        </View>
        <View>
          <CustomButton
            text={`Escanea un ticket`}
            handlePress={onHandlerScanner}
            textStyles={[styles.textScan, global.white]}
            buttonStyles={[styles.scan, global.bgBlack]}
          />
          {error && (
            <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
          )}
        </View>
        <BottomSheetModal bottomSheetStyle={{ flex: 1 }}>
          {travel ? (
            <>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <View style={{ marginHorizontal: 10, alignItems: "center" }}>
                  <Text
                    style={{
                      fontFamily: "regular",
                      fontSize: 16,
                      marginBottom: 5,
                    }}
                  >
                    Destino: {travel?.arrivalCity?.toUpperCase()}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "regular",
                      fontSize: 16,
                    }}
                  >
                    Hora de salida:{" "}
                    {horaFormatoNormal(
                      travel?.departure.date,
                      travel?.departure.time
                    )}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={clean}
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <AntDesign name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  marginTop: 20,
                  flexDirection: "row",
                  borderColor: "#1f1f1f",
                  borderWidth: 0.4,
                  marginHorizontal: 10,
                  borderRadius: 2,
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "light",
                    textAlign: "center",
                    width: 50,
                  }}
                >
                  Nombre
                </Text>
                <Text
                  style={{
                    fontFamily: "light",
                    textAlign: "center",
                    width: 150,
                  }}
                >
                  N de ticket
                </Text>
                <Text
                  style={{
                    fontFamily: "light",
                    textAlign: "center",
                    width: 80,
                  }}
                >
                  Estado
                </Text>
              </View>
              {travel?.tickets?.items.map((item, index) => (
                <ScanTicketList key={index} status={true} ticket={item} />
              ))}
            </>
          ) : (
            <UnSelectedView />
          )}
        </BottomSheetModal>
      </View>
    </ScrollView>
  );
};

export default Scan;
