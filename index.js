if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import Router from './src/Router';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import Loading from './src/components/Loading';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
const App = () => (
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => App);
