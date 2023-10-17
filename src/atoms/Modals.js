import { atom } from "recoil";

/* User */
export const userAuthenticated = atom({
  key: "user",
  default: null,
});

export const travelSelect = atom({
  key: "travelSelectValue",
  default: {},
});

export const errorMessageLogin = atom({
  key: "errorMessageLoginValue",
  default: "",
});
export const tokenProfileGlobal = atom({
  key: "tokenProfileGlobalValue",
  default: null,
});
