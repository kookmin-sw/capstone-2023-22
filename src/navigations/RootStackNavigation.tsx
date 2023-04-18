import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FeedInfo } from '../@types/FeedInfo';
import { PostDetailScreen } from '../screens/PostDetailScreen';
import { SettingScreen } from '../screens/SettingScreen';
import { BottomTabNavigation } from './BottomTabNavigation';


export type RootStackParamList = {
    BottomTab:undefined
    PostDetail:undefined
    Setting:undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();


export const RootStackNavigation:React.FC = ()=>{

    return (
        <Stack.Navigator>
            <Stack.Group screenOptions={{
                headerShown:false,
                presentation: 'containedModal',
            }}>
                <Stack.Screen name='BottomTab' component={BottomTabNavigation}></Stack.Screen>
            </Stack.Group>
            <Stack.Group screenOptions={{
                headerShown:false,
                presentation:'card',
                animation:'slide_from_right',
            }}>
                <Stack.Screen name='PostDetail' component={PostDetailScreen}></Stack.Screen>
                <Stack.Screen name='Setting' component={SettingScreen}></Stack.Screen>
            </Stack.Group>
        </Stack.Navigator>
    )
}

export const useRootNavigation = <RouteName extends keyof RootStackParamList>()=>{
    return useNavigation<NativeStackNavigationProp<RootStackParamList, RouteName>>();
}

export const useRootRoute = <RouteName extends keyof RootStackParamList>()=>{
    return useRoute<RouteProp<RootStackParamList, RouteName>>();
}