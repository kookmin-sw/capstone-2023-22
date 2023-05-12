import React, { useEffect, useState } from 'react';
import { useRootNavigation, useRootRoute } from '../navigations/RootStackNavigation';
import { Image, TouchableOpacity, View } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import googleLogin from "../../assets/google-login.png";
import { EXPO_CLIENT_ID, EXPO_IOS_ID } from '../secrets';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen:React.FC = () => {
    const rootNavigation = useRootNavigation<'Login'>();
    const route = useRootRoute();

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: EXPO_CLIENT_ID,
        iosClientId: EXPO_IOS_ID,
        responseType: "id_token"
    });

  useEffect(() => {
    if (response?.type === "success") {
      console.log(response);
      axios.get(`http://127.0.0.1:8080/oauth2/google?id_token=${response.params.id_token}`)
        .then(function (gotToken) {
          console.log("received token:", gotToken.data.data.accessToken);
          AsyncStorage.setItem('@token', gotToken.data.data.accessToken!);
        })
        .catch(function (error) {
          console.log("ERROR:", error);
        });
    }
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
