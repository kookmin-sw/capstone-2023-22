import {BottomTabNavigationProp, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import { TotalFeedListScreen } from '../screens/TotalFeedListScreen';
import { MyPageScreen } from '../screens/MyPageScreen';
import { MapScreen } from '../screens/MapScreen';
import { TabIcon } from '../components/TabIcon';
import { TypeIconName } from '../components/Icons';
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import { MyListScreen } from '../screens/MyListScreen';
import { SearchScreen } from '../screens/SearchScreen';

export type BottomTabParamList = {
    Space:undefined,
    MyPage:undefined,
    MyList:undefined,
    Search:undefined,
    Map:undefined,
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigation = ()=>{

    return (
        <BottomTab.Navigator initialRouteName='Map' screenOptions={({route})=>{
            const getIconName = ():TypeIconName=>{
                if (route.name === 'MyPage'){
                    return 'person';
                }
                if (route.name === 'MyList'){
                    return 'star';
                }
                if (route.name === 'Search'){
                    return 'search';
                }
                if (route.name === 'Map'){
                    return 'map';
                }
                return 'globe';
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
            <BottomTab.Screen name='Space' component={TotalFeedListScreen} />
            <BottomTab.Screen name='MyList' component={MyListScreen} />
            <BottomTab.Screen name='Map' component={MapScreen} />
            <BottomTab.Screen name='Search' component={SearchScreen} />
            <BottomTab.Screen name='MyPage' component={MyPageScreen} />
        </BottomTab.Navigator>
    )
}


export const userBottomTabNavigation = <RouteName extends keyof BottomTabParamList>()=>{
    return useNavigation<BottomTabNavigationProp<BottomTabParamList, RouteName>>();
}

export const useBottomTabRoute = <RouteName extends keyof BottomTabParamList>()=>{
    return useRoute<RouteProp<BottomTabParamList, RouteName>>();
}
