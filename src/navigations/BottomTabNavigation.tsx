import {BottomTabNavigationProp, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import { TotalFeedListScreen } from '../screens/TotalFeedListScreen';
import { MyPageScreen } from '../screens/MyPageScreen';
import { TabIcon } from '../components/TabIcon';
import { TypeIconName } from '../components/Icons';
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import { MyListScreen } from '../screens/MyListScreen';
import { SearchScreen } from '../screens/SearchScreen';

export type BottomTabParamList = {
    TotalFeedList:undefined,
    MyPage:undefined,
    MyList:undefined,
    Search:undefined
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigation = ()=>{

    return (
        <BottomTab.Navigator screenOptions={({route})=>{
            const getIconName = ():TypeIconName=>{
                if(route.name === 'MyPage'){
                    return 'person'
                }
                if(route.name === 'MyList'){
                    return 'star'
                }
                if(route.name === 'Search'){
                    return 'search'
                }
                return 'home'
            }

            const routeIconName = getIconName();

            return {
                headerShown:false,
                tabBarStyle:{
                    backgroundColor: '#F5F5F5'
                },
                tabBarIcon:({color})=>{
                    return (
                        <TabIcon iconName={routeIconName} iconColor={color}/>
                    )
                }
            }
        }}>
            <BottomTab.Screen name='TotalFeedList' component={TotalFeedListScreen}></BottomTab.Screen>
            <BottomTab.Screen name='MyList' component={MyListScreen}></BottomTab.Screen>
            <BottomTab.Screen name='Search' component={SearchScreen}></BottomTab.Screen>
            <BottomTab.Screen name='MyPage' component={MyPageScreen}></BottomTab.Screen>
        </BottomTab.Navigator>
    )
}


export const userBottomTabNavigation = <RouteName extends keyof BottomTabParamList>()=>{
    return useNavigation<BottomTabNavigationProp<BottomTabParamList, RouteName>>();
}

export const useBottomTabRoute = <RouteName extends keyof BottomTabParamList>()=>{
    return useRoute<RouteProp<BottomTabParamList, RouteName>>();
}
