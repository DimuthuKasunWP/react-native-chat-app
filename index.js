/**
 * @format
 */

import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import App from './src/App';
import { name as appName } from './app.json';
import store from './store';
import { theme } from './src/core/theme';
import configureStore from 'src/store/configureStore';
const { persistor, store } = configureStore();
import NavigationStack from 'src/App';

export default function Main() {
  return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <PaperProvider theme={theme}>
                        <NavigationStack />
                    </PaperProvider>
                </PersistGate>
            </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
