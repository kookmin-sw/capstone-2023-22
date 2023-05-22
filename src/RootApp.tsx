import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { HomeStackNavigation } from './navigations/HomeStackNavigation';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SplashView } from './SplashView';
import { LoginScreen } from './screens/LoginScreen';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';



export type RootStackParamList = {
  SplashView:undefined
  Login:undefined
  Home:undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();


export const RootApp:React.FC = ()=>{
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