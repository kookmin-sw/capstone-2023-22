import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FeedListItem } from './src/components/FeedListItem';
import { RootApp } from './src/RootApp';
import {Provider} from 'react-redux';
import { store } from './src/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <Provider store={store}>
            <RootApp/>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
