import React, { useEffect, useState } from 'react';
import { useRootNavigation, useRootRoute } from '../RootApp';
import { Image, TouchableOpacity, View } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {setUserInfo, TypeUserDispatch } from '../actions/user';
import googleLogin from "../../assets/google-login.png";
import { EXPO_CLIENT_ID, EXPO_IOS_ID } from '../secrets';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Config } from '../config';
import { useDispatch } from 'react-redux';

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen:React.FC = () => {
    const rootNavigation = useRootNavigation();
    const route = useRootRoute();
    const dispatch = useDispatch<TypeUserDispatch>();

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: EXPO_CLIENT_ID,
        iosClientId: EXPO_IOS_ID,
        responseType: "id_token"
    });

  useEffect(() => {
    if (response?.type === "success") {
      console.log(response);
      axios.get(`${Config.server}/oauth2/google?id_token=${response.params.id_token}`)
      .then(async function (gotToken) {
          console.log("received token:", gotToken.data.data.accessToken);
          await AsyncStorage.setItem('@token', gotToken.data.data.accessToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${gotToken.data.data.accessToken}`;
          // get user info from server.
          // TODO: err handling.
          axios.get(`${Config.server}/user`).then(async user => {
            await AsyncStorage.setItem('user', JSON.stringify(user.data.data));
            dispatch(setUserInfo({
              "id": user.data.data.userId,
              "name": user.data.data.userName,
              "profileImage":user.data.profileImage,
              "birth":"23-05-01"}));
          });
        rootNavigation.replace("Home");
      }).catch(function (error) {
        console.log("ERROR:", error);
      });
    } 
    //Todo err handling
  }, [response]);

    return (
    <View>
        <TouchableOpacity
            style={{alignItems: "center", justifyContent: "flex-end", marginTop: 500}}
            onPress={() => {promptAsync();}}>
            <Image style={{resizeMode: "contain", width: "80%"}} source={googleLogin} />
        </TouchableOpacity>
    </View>
    );
}
