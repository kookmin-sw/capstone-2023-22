import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { FeedInfo } from '../@types/FeedInfo';
import { FeedListItem } from '../components/FeedListItem';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { useRootNavigation, useRootRoute } from '../navigations/RootStackNavigation';

export const MapScreen:React.FC = ()=>{
    const rootNavigation = useRootNavigation<'Map'>();
    const route = useRootRoute();

    // const onPressBack = useCallback(()=>{
    //     rootNavigation.goBack();
    // }, [])
    return (
        <View style={{flex:1}}>
        </View>
    )
}
