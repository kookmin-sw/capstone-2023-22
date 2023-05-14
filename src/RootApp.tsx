import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { getUserInfo, signIn, TypeUserDispatch } from './actions/user';
import { HomeStackNavigation } from './navigations/HomeStackNavigation';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SplashView } from './SplashView';
import { useDispatch } from 'react-redux';
import { LoginScreen } from './screens/LoginScreen';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';



export type RootStackParamList = {
  SplashView:undefined
  Login:undefined
  Home:undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();


export const RootApp:React.FC = ()=>{
    // const [initialize, setInitialize] = useState(false)
    // const dispatch = useDispatch<TypeUserDispatch>();
    
    // useEffect(() => {
    //     removeStorage('@token');
    //     getStorage('@token').then((token) => {
    //     if (token) {
    //         getUserInfo();
    //     } else {
    //         console.log("no token");
    //     }
    //     })
    //   }, []);
    
    // if (!initialize) {
    //     return <LoginScreen />
    // }

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
// // get
// export const getStorage = async (key:string) => {
//     const result = await AsyncStorage.getItem(key);
//     return result && JSON.parse(result);
//   };
  
//   // set
//   export const setStorage = async (key:string, value:any) => {
//     return await AsyncStorage.setItem(key, JSON.stringify(value));
//   };
  
//   // remove
//   export const removeStorage = async (key:string) => {
//     return await AsyncStorage.removeItem(key);
//   };

export const useRootNavigation = <RouteName extends keyof RootStackParamList>()=>{
  return useNavigation<NativeStackNavigationProp<RootStackParamList, RouteName>>();
}

export const useRootRoute = <RouteName extends keyof RootStackParamList>()=>{
  return useRoute<RouteProp<RootStackParamList, RouteName>>();
}