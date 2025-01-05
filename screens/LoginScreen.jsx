import { useContext, useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../utils/http';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {

    const AuthCtx = useContext(AuthContext);
    const [authentication, setAuthentication] = useState(false);

    async function loginUser({ email, password }) {
      try {
        setAuthentication(true);
        const token = await login(email, password);
        AuthCtx.authenticate(token)
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
  

  return <AuthContent isLogin onAuthenticate={loginUser} />;
}

export default LoginScreen;