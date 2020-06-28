import React, { memo, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { emailValidator } from '../validations/utils';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { theme } from '../config/theme';
import Button from '../components/Button';
import auth from "@react-native-firebase/auth";
import AwesomeAlert from 'react-native-awesome-alerts';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const[showAlert,setAlert]=useState(false);
  const[message,setMessage]=useState('');
  const[title,setTitle]=useState('');

  showAlertf = (ttl,msg) => {
    setTitle(ttl);
    setMessage(msg);
    setAlert(true);
  };
 
  hideAlert = () => {
    setTitle('');
    setMessage('');
    setAlert(false);
  };

  const _onSendPressed = () => {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

   
    _doSendLink(email.value);
  };

  
  const _doSendLink = async (email) => {
    await auth().sendPasswordResetEmail(email)
    .then(()=>{
         this.showAlertf('Link Sent!','Please reset your password');
        
      })
    .catch((error)=> {
      if(error.code ==='auth/user-not-found'){
        this.showAlertf("No such a user","Register with us!");
         
       }
          
        console.log(error.code);
        console.log(error.message);
      });

  }

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('LoginScreen')} />

      <Logo />

      <Header>Restore Password</Header>

      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
       <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={title}
          message={message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="OK"
          confirmButtonColor="#ADD8E6"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />

      <Button mode="contained" onPress={_onSendPressed} style={styles.button}>
        Send Reset Instructions
      </Button>

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.label}>← Back to login</Text>
      </TouchableOpacity>
    </Background>
  );
};

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
});

export default memo(ForgotPasswordScreen);
