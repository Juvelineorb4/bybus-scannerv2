import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import styles from "@/utils/styles/Login.module.css";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import CustomText from "@/components/CustomText";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

// recoil
import { useRecoilState } from "recoil";
import { errorMessageLogin } from "@/atoms/Modals";

const EMAIL_REGEX = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
const Login = ({ navigation, route }) => {
  const global = require("@/utils/styles/global.js");
  const [error, setError] = useRecoilState(errorMessageLogin);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm();

  const onHandleLogin = async (data) => {
    setError("");
    setLoading(true);
    try {
      setError("");
      const result = await Auth.signIn(data.email, data.password);
    } catch (error) {
      console.log("ERROR LOGIN: ", error.message);
      switch (error.message) {
        case "Incorrect username or password.":
          setError("Email o Contraseña Incorrecto");
          break;
        case "User does not exist.":
          setError("Email no existe en nuestro registros de empresas");
          break;
        default:
          break;
      }
    }
    setLoading(false);
  };

  return (
    <View style={[styles.container, global.bgWhite]}>
      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          horizontal={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>
            <View styles={styles.textContent}>
              <Image
                style={{
                  width: 200,
                  height: 40,
                  resizeMode: "cover",
                  alignSelf: "center",
                  marginVertical: 15,
                }}
                source={require("@/utils/images/icon.png")}
              />
              <CustomText
                styled={{
                  title: [styles.title, global.black],
                  subtitle: [styles.subtitle, global.topGray],
                }}
                title="Hola, de nuevo"
                subtitle="Escanea tus tickets"
              />
            </View>
            <View style={{ marginBottom: 5 }}>
              {error && <Text style={{ color: "red" }}>{error}</Text>}
            </View>
            <View style={styles.signin}>
              <CustomInput
                control={control}
                name={`email`}
                placeholder={"ejemplo@email.com"}
                styled={{
                  text: styles.textInput,
                  label: [styles.labelInput, global.topGray],
                  error: styles.errorInput,
                  input: [styles.inputContainer, global.bgWhiteSoft],
                }}
                text={`Correo`}
                icon={require("@/utils/images/email.png")}
                rules={{
                  required: "Requerido",
                  pattern: { value: EMAIL_REGEX, message: "Invalido" },
                }}
              />
              <CustomInput
                control={control}
                name={`password`}
                placeholder={"**********"}
                styled={{
                  text: styles.textInputP,
                  label: [styles.labelInputP, global.topGray],
                  error: styles.errorInputP,
                  input: [styles.inputContainerP, global.bgWhiteSoft],
                }}
                text={`Contrasena`}
                icon={require("@/utils/images/password.png")}
                security={true}
                rules={{
                  required: "Requerido",
                  minLength: {
                    value: 8,
                    message: "Min 8",
                  },
                }}
              />
            </View>
          </View>
          <View style={styles.buttons}>
            <CustomButton
              text={loading ? <ActivityIndicator /> : `Iniciar sesion`}
              disabled={loading}
              handlePress={handleSubmit(onHandleLogin)}
              textStyles={[styles.textLogin, global.white]}
              buttonStyles={[styles.login, global.bgBlack]}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Login;
