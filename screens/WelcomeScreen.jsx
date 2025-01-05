import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";
import axios from "axios";

function WelcomeScreen() {
  const AuthCtx = useContext(AuthContext);
  const token = AuthCtx.token;
  const [authenticatedMessage, setAuthenticatedMessage] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://rn-auth-bdad6-default-rtdb.firebaseio.com/message.json?auth=" +
          token
      )
      .then((response) => {
        setAuthenticatedMessage(response.data)
      });
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{authenticatedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
