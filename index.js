/**
 * @format
 */

import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import App from './src/App';
import { name as appName } from './app.json';
import { theme } from './src/config/theme';
import configureStore from 'src/store/configureStore';
const { persistor, store } = configureStore();
import NavigationStack from 'src/App';
import { PersistGate } from 'redux-persist/es/integration/react';
import { YellowBox } from 'react-native';
import OfflineNotice from 'src/components/OfflineNotice'

YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader'
]);

export default function Main() {
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

AppRegistry.registerComponent(appName, () => Main);
