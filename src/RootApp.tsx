import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { getUserInfo, signIn, TypeUserDispatch } from './actions/user';
import { RootStackNavigation } from './navigations/RootStackNavigation';
import { SplashView } from './SplashView';
import { useDispatch } from 'react-redux';
import { LoginScreen } from './screens/LoginScreen';


export const RootApp:React.FC = ()=>{
    const [initialize, setInitialize] = useState(false)
    const dispatch = useDispatch<TypeUserDispatch>();
    
    useEffect(() => {
        removeStorage('@token');
        getStorage('@token').then((token) => {
        if (token) {
            getUserInfo();
        } else {
            console.log("no token");
        }
        })
      }, []);
    
    if (!initialize) {
        return <LoginScreen />
    }

    return (
        <NavigationContainer>
            <RootStackNavigation/>
        </NavigationContainer>
    )
};
// get
export const getStorage = async (key:string) => {
    const result = await AsyncStorage.getItem(key);
    return result && JSON.parse(result);
  };
  
  // set
  export const setStorage = async (key:string, value:any) => {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
  };
  
  // remove
  export const removeStorage = async (key:string) => {
    return await AsyncStorage.removeItem(key);
  };