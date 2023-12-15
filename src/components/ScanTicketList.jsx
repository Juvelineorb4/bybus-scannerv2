import { View, Text } from "react-native";
import React from "react";

const ScanTicketList = ({ status = false, cancel = false, ticket }) => {
  console.log(ticket.customer);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
      }}
    >
      <Text
        style={{
          fontFamily: "regular",
          textAlign: "center",
          fontSize: 12,
          width: 80,
        }}
      >
        {ticket?.customer === null ? "--------" : ticket?.customer?.fullName}
      </Text>
      <Text
        style={{
          fontFamily: "regular",
          textAlign: "center",
          fontSize: 12,
          width: 160,
        }}
      >
        {ticket?.code}
      </Text>
      <Text
        style={{
          fontFamily: "bold",
          textAlign: "center",
          fontSize: 12,
          color: cancel ? "red" : status ? "green" : "grey",
          width: 90,
        }}
      >
        {ticket?.status?.toUpperCase() === "PAID"
          ? "PAGADO"
          : ticket?.status?.toUpperCase() === "BOARDED"
          ? "ABORDADO"
          : ticket?.status?.toUpperCase() === "CANCELLED"
          ? "CANCELADO"
          : ticket?.status?.toUpperCase() === "RETURNED"
          ? "RETORNADO"
          : ticket?.status?.toUpperCase()}
      </Text>
    </View>
  );
};

export default ScanTicketList;
