import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../utils/http";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const AuthCtx = useContext(AuthContext);
  const [authentication, setAuthentication] = useState(false);

  async function createNewUser({ email, password }) {
    try {
      setAuthentication(true);
      const token = await createUser(email, password);
      AuthCtx.authenticate(token);
      setAuthentication(false);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user, please check your input and try again later."
      );
    }
  }

  if (authentication) {
    return <LoadingOverlay message={"Create your account"} />;
  }

  return <AuthContent onAuthenticate={createNewUser} />;
}

export default SignupScreen;
