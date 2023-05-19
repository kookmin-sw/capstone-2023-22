import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { HomeStackNavigation } from './navigations/HomeStackNavigation';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SplashView } from './SplashView';
import { LoginScreen } from './screens/LoginScreen';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import * as Font from "expo-font";



export type RootStackParamList = {
  SplashView:undefined
  Login:undefined
  Home:undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();


export const RootApp:React.FC = ()=>{
    const [isFont, setIsFont] = useState(false);

    // 폰트 적용
    useEffect(() => {
      const loadFont =  async function fetchFont() { 
        await Font.loadAsync({
          "notosans-black": require('../assets/NotoSansKR-Black.otf'),
          "notosans-bold": require('../assets/NotoSansKR-Bold.otf'),
          "notosans-medium": require('../assets/NotoSansKR-Medium.otf'),
          "notosans-light": require('../assets/NotoSansKR-Light.otf'),
        }); 
        setIsFont(true);
      }
      loadFont();
    },[]);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashView'>
              <Stack.Screen name="SplashView" component={SplashView} options={{headerShown: false}} />
              <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
              <Stack.Screen name="Home" component={HomeStackNavigation} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export const useRootNavigation = <RouteName extends keyof RootStackParamList>()=>{
  return useNavigation<NativeStackNavigationProp<RootStackParamList, RouteName>>();
}

export const useRootRoute = <RouteName extends keyof RootStackParamList>()=>{
  return useRoute<RouteProp<RootStackParamList, RouteName>>();
}