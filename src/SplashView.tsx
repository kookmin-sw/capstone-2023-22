import React, { useCallback, useEffect } from 'react';
import { View, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { getUserInfo, TypeUserDispatch } from './actions/user';
import Splash from '../assets/splash.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRootNavigation } from './RootApp';
import axios from 'axios';

export const SplashView:React.FC = ()=>{
    const dispatch = useDispatch<TypeUserDispatch>();
    const rootNavigation = useRootNavigation();
    const appInit = useCallback(async (token:string)=>{
        console.log("Token Exist!");
        dispatch(getUserInfo());
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        rootNavigation.replace('Home');
    }, [])
    useEffect(()=>{
        setTimeout(() => {
            AsyncStorage.getItem('@token').then((value) =>
            {value === null ? rootNavigation.replace('Login') : appInit(value)});
        },3000);
    }, [])
    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Image source={Splash} style={{width: '100%', height: '100%'}} />
        </View>
    )
}
