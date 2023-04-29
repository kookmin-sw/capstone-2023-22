import React, { useCallback, useEffect } from 'react';
import { View, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { signIn, TypeUserDispatch } from './actions/user';
import { Typography } from './components/Typography';
import Splash from '../assets/splash.png';

export const SplashView:React.FC<{onFinishLoad:()=>void}> = (props)=>{
    const dispatch = useDispatch<TypeUserDispatch>();
    const appInit = useCallback(async()=>{
        await dispatch(signIn());
        props.onFinishLoad();

    }, [])
    useEffect(()=>{
        appInit();

    }, [])
    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Image source={Splash} style={{width: 100 }} />
        </View>
    )
}
