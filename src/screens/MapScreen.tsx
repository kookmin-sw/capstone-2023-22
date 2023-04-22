import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { FeedInfo } from '../@types/FeedInfo';
import { FeedListItem } from '../components/FeedListItem';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { useRootNavigation, useRootRoute } from '../navigations/RootStackNavigation';
import WebView from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';

export const MapScreen:React.FC = ()=>{
    const rootNavigation = useRootNavigation<'Map'>();
    const route = useRootRoute();

    return (
        <SafeAreaView>
            <MapView></MapView>
        </SafeAreaView>
    )
}
