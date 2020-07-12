/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import  React, {useState} from 'react';
import { AppRegistry,Animated } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { name as appName } from './app.json';
import { theme } from 'src/config/theme';
import configureStore from 'src/store/configureStore';
const { persistor, store } = configureStore();
import NavigationStack from 'src/navigation';
import { PersistGate } from 'redux-persist/es/integration/react';
import { YellowBox } from 'react-native';
import OfflineNotice from 'src/components/OfflineNotice'

YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader',
    'Warning: AsyncStorage '
]);
console.ignoreWarnings = [
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader',
    'AsyncStorage '
    ];
    console.disableYellowBox = true;

export default function Main() {
    const [animatePress, setAnimatePress] = useState(new Animated.Value(1))

    const animateIn = () => {
    Animated.timing(animatePress, {
        toValue: 0.5,
        duration: 500,
        useNativeDriver: true 
    }).start();
    }
  return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <PaperProvider theme={theme}>
                        <OfflineNotice />
                        <NavigationStack />
                    </PaperProvider>
                </PersistGate>
            </Provider>
  );
}

