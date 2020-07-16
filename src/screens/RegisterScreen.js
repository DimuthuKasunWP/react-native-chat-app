import React, { memo, useState } from 'react';
import { Alert,View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../config/theme';
import { firebaseDB } from "src/firebase";
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../validations/utils';
import auth from "@react-native-firebase/auth";
import AwesomeAlert from 'react-native-awesome-alerts';
import { ProgressDialog,ConfirmDialog } from 'react-native-simple-dialogs';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const[showAlert,setAlert]=useState(false);
  const[message,setMessage]=useState('');
  const[title,setTitle]=useState('');
  const[isLoading,setLoading]=useState(false);
  showAlertf = (ttl,msg) => {
    setTitle(ttl);
   setMessage(msg);
   setAlert(true);
   console.log("this is show Alert value"+showAlert);
  };
 
  hideAlert = () => {
    setTitle('');
    setMessage('');
    setAlert(false);
  };


  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
   

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    
    __doCreateUser(email.value, password.value,name.value);
    
    
  };

  const __doCreateUser = async (email, password,name) => {
     setLoading(true);
    await auth().createUserWithEmailAndPassword(email, password)
    .then(()=>{
         auth().currentUser.sendEmailVerification().then(()=>{
           
        
        this.showAlertf('Success','Please Verify Your Email!');
         navigation.navigate('LoginScreen');
        const userName = email.toString().substring(0,email.indexOf('@'));
         firebaseDB.ref('/users/'+userName).set({
            "email":email,
            "password":password,
            "name":name,
            "image":"https://firebasestorage.googleapis.com/v0/b/chat-app-71bd1.appspot.com/o/images%2Fnotfound.jpg?alt=media&token=29f52e9f-d896-400d-827d-4cee6acd4b3e"
            }).then(function(res){
                setLoading(false);

            })

        })
      }).catch((error)=> {
      if(error.code ==='auth/email-already-in-use'){
        this.showAlertf('Email Exists','Proceed to login');
        setLoading(false);
      }
          
        console.log(error.code);
        console.log(error.message);
      });
}

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('LoginScreen')} />

      <Logo />

      <Header>Create Account</Header>

      <TextInput
        label="FirstName SecondName"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
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
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
       <ProgressDialog
          visible={isLoading}
          title=""
          message="Please, wait..."
      />
      
             <ConfirmDialog
          title={title}
          message={message}
          visible={showAlert}
          onTouchOutside={() => setAlert(false)}
          positiveButton={{
              title: "OK",
              onPress: () => setAlert(false)
          }}
          
      />

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
