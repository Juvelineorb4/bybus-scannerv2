export const listBookingsID = /* GraphQL */ `
  query ListBookings(
    $filter: ModelBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        code
        agencyID
        officeID
        transport
      }
      nextToken
    }
  }
`;

export const getAgencyEmployees = /* GraphQL */ `
  query GetAgency($id: ID!) {
    getAgency(id: $id) {
      id
      name
      rif
      employees {
        items {
          id
          name
          email
          phone
          pin
          type
          agencyID
          officeID
          lastConnection
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const listBookingsAvailable = /* GraphQL */ `
  query ListBookings(
    $filter: ModelBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        status
        code
        agencyID
        officeID
        customers {
          nextToken
          __typename
        }
        tickets {
          nextToken
          __typename
        }
        stops {
          nextToken
          __typename
        }
        departureCity
        arrivalCity
        departure {
          time
          date
          city
          state
          address
          __typename
        }
        arrival {
          time
          date
          city
          state
          address
          __typename
        }
        stock
        price
        createdBy
        driver
        transport
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const getBooking = /* GraphQL */ `
  query GetBooking($id: ID!) {
    getBooking(id: $id) {
      id
      status
      code
      agencyID
      officeID
      customers {
        items {
          id
          fullName
          ci
          email
          bookingID
          ticketID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      tickets {
        items {
          id
          code
          bookingID
          orderDetailID
          stop
          customerID
          customer {
            id
            fullName
          }
          seating
          status
          description
          url
          createdAt
          updatedAt
          stopBookingTicketsId
          __typename
        }
        nextToken
        __typename
      }
      stops {
        items {
          id
          bookingID
          price
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      departureCity
      arrivalCity
      departure {
        time
        date
        city
        state
        address
        __typename
      }
      arrival {
        time
        date
        city
        state
        address
        __typename
      }
      stock
      price
      createdBy
      driver
      transport
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const getOrderDetail = /* GraphQL */ `
  query GetOrderDetail($id: ID!) {
    getOrderDetail(id: $id) {
      id
      status
    }
  }
`;
