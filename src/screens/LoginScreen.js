import React, { memo, useState,dispatch } from 'react';
import {connect} from 'react-redux';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../config/theme';
import { emailValidator, passwordValidator } from '../validations/utils';
import auth from "@react-native-firebase/auth";
import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILED} from '../actions/actionTypes';
import { loginSuccess,loginFailed ,requestLogin} from '../actions/loginActions';
// import AwesomeAlert from 'react-native-awesome-alerts';
import { ConfirmDialog,ProgressDialog } from 'react-native-simple-dialogs';

const LoginScreen = ({ navigation ,dispatch,isLoading,message,title,isLoggedIn}) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const[showAlert,setAlert]=useState(false);

  showAlertf = () => {
   setAlert(true);
  };
 
  hideAlert = () => {
    setAlert(false);
  };


  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    dispatch(requestLogin());
    showAlertf();
    _handleLogin(email.value, password.value);
  };

 const _handleLogin = async (email, password) => {
     auth().signInWithEmailAndPassword(email, password)
     .then(()=>{
        if(auth().currentUser.emailVerified){
        dispatch(loginSuccess());
        hideAlert();
           navigation.navigate('MainScreen');
       }else{
          showAlertf();
        dispatch(loginFailed("Verify Email","Please verify your email before signin"))
       }
      })
      .catch((error)=> {

      if(error.code ==='auth/wrong-password'){
        
        showAlertf();
        dispatch(loginFailed("Try Again !","Wrong Username/password"))
       
      }
      
      if(error.code ==='auth/user-not-found'){
        
        this.showAlertf();
        dispatch(loginFailed("No such a user","Register with us!"));
       
      }
          
        console.log(error.code);
        console.log(error.message);
      });

  }
  const alert = () => {    
    if (isLoading)
      return (
      
            <ProgressDialog
          visible={showAlert}
          title=""
          message="Please, wait..."
      />

      )
      else
        return(
      
      <ConfirmDialog
          title={title}
          message={message}
          visible={showAlert}
          onTouchOutside={() => setAlert(false)}
          positiveButton={{
              title: "OK",
              onPress: () =>{ setAlert(false);
              navigation.navigate('LoginScreen')
              }
          }}
          
      />
        )
  
  
  }


  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Logo />

      <Header>Welcome back.</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      {alert()}

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});


function mapStateToProps(state) {
  return {
    isLoading:state.loginReducer.isLoading,
    isLoggedIn:state.loginReducer.isLoggedIn,
    message:state.loginReducer.message,
    title:state.loginReducer.title
  }
  
}

export default connect(mapStateToProps,null)(LoginScreen)
