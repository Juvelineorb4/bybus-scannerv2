import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { getOrderDetail } from "@/graphql/customQueries";
import { API } from "aws-amplify";
const ScanTicketList = ({ status = false, cancel = false, ticket }) => {
  console.log(ticket.orderDetailID);
  const [statusOrder, setStatusOrder] = useState("");
  useEffect(() => {
    if (ticket?.orderDetailID) {
      API.graphql({
        query: getOrderDetail,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: { id: ticket?.orderDetailID },
      }).then((r) => setStatusOrder(r.data.getOrderDetail.status));
    }
  }, [ticket.orderDetailID]);

  if (statusOrder)
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
          {statusOrder === "PENDIENTE"
            ? "PENDIENTE"
            : ticket?.status?.toUpperCase() === "PAID"
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
