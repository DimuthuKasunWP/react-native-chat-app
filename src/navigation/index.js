import React from 'react';
import { createStackNavigator,createAppContainer } from 'react-navigation';
import SplashScreen from 'src/screens/SplashScreen';
import ChatScreen from 'src/screens/ChatScreen';
import CameraScreen from 'src/screens/CameraScreen';
import SearchScreen from 'src/screens/SearchScreen';
import { BottomTabNavigation } from './BottomTabNavigation';
import SearchHeader from 'src/components/SearchHeader';
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  Camera,
  ShowImage
} from 'src/screens';

const SearchStack = createStackNavigator(
    {
        BottomTabNavigation: {
            screen: BottomTabNavigation,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        SearchScreen: {
            screen: SearchScreen,
            navigationOptions: { gesturesEnabled: false }
        }
    },
    {
       
        mode: 'modal',
        headerMode: 'none'
    }
);

const ModalStack = createStackNavigator(
    {
        SearchStack: {
            screen: SearchStack,
            navigationOptions: ({ navigation }) => ({
                gesturesEnabled: false,
                header: <SearchHeader navigation={navigation} />
            })
        },
        CameraScreen: {
            screen: CameraScreen,
            navigationOptions: { gesturesEnabled: false, header: null }
        }
    },
    {
        mode: 'modal'
    }
);

const MessengerApp = createStackNavigator({
    SplashScreen: {
        screen: SplashScreen,
        navigationOptions: { gesturesEnabled: false, header: null }
    },
    MainScreen: {
        screen: ModalStack,
        navigationOptions: {
            gesturesEnabled: false,
            header: null
        }
    },
    ChatScreen: {
        screen: ChatScreen,
        navigationOptions: { gesturesEnabled: false, header: null }
    },
     HomeScreen:{
        screen: HomeScreen,
        navigationOptions: { gesturesEnabled: false, header: null }
    },
    LoginScreen:{
        screen: LoginScreen,
        navigationOptions: { gesturesEnabled: false, header: null }
    },
    RegisterScreen:{
        screen: RegisterScreen,
        navigationOptions: { gesturesEnabled: false, header: null }
    },
    ForgotPasswordScreen:{
        screen: ForgotPasswordScreen,
        navigationOptions: { gesturesEnabled: false, header: null }
    },
    Camera:{
        screen: Camera,
        navigationOptions: { gesturesEnabled: false, header: null }
    }


}


);

export default createAppContainer(MessengerApp);
