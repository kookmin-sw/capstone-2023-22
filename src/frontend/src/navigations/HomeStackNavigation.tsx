import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FeedInfo } from '../@types/FeedInfo';
import { PlaceInfo } from '../@types/PlaceInfo';
import { RequestPostCreate } from '../@types/RequestPostCreate';
import { ImageSelectScreen } from '../screens/ImageSelectScreen';
import { PlaceSearchScreen } from '../screens/PlaceSearchScreen';
import { PostDetailScreen } from '../screens/PostDetailScreen';
import { SettingScreen } from '../screens/SettingScreen';
import { WritePostScreen } from '../screens/WritePostScreen';
import { BottomTabNavigation } from './BottomTabNavigation';
import { AreaMarkerInfo } from '../@types/AreaMarkerInfo';
import { AreaSelectedScreen } from '../screens/AreaSelectedScreen';
import { PlaceDetailScreen } from '../screens/PlaceDetailScreen';
import { AreaCafeInfo } from '../@types/AreaCafeInfo';
import { AreaCultureInfo } from '../@types/AreaCultureInfo';
import { BookmarkInfo } from '../@types/BookmarkInfo';


export type HomeStackParamList = {
    BottomTab: undefined
    PostDetail: {item:FeedInfo, type:string} 
    Setting:undefined
    PlaceSearch:undefined
    ImageSelect:PlaceInfo
    Map:undefined
    WritePost: Omit<RequestPostCreate,'content'>
    AreaSelected: AreaMarkerInfo
    PlaceDetail: AreaCafeInfo | AreaCultureInfo | BookmarkInfo
}

const Stack = createNativeStackNavigator<HomeStackParamList>();


export const HomeStackNavigation:React.FC = ()=>{

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
                <Stack.Screen name='PlaceSearch' component={PlaceSearchScreen}></Stack.Screen>
                <Stack.Screen name='ImageSelect' component={ImageSelectScreen}></Stack.Screen>
                <Stack.Screen name='WritePost' component={WritePostScreen}></Stack.Screen>
                <Stack.Screen name='AreaSelected' component={AreaSelectedScreen}></Stack.Screen>
                <Stack.Screen name='PlaceDetail' component={PlaceDetailScreen}></Stack.Screen>
            </Stack.Group>
        </Stack.Navigator>
    )
}

export const useHomeNavigation = <RouteName extends keyof HomeStackParamList>()=>{
    return useNavigation<NativeStackNavigationProp<HomeStackParamList, RouteName>>();
}

export const useHomeRoute = <RouteName extends keyof HomeStackParamList>()=>{
    return useRoute<RouteProp<HomeStackParamList, RouteName>>();
}
