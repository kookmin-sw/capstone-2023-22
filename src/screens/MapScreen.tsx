import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { FeedInfo } from '../@types/FeedInfo';
import { FeedListItem } from '../components/FeedListItem';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { useRootNavigation, useRootRoute } from '../navigations/RootStackNavigation';
import WebView from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';

export const MapScreen:React.FC = ()=>{
    const rootNavigation = useRootNavigation<'Map'>();
    const route = useRootRoute();

    return (
        <>
            <Header>
                <Header.Group>
                    <Header.Title title='50개 특구'></Header.Title>
                </Header.Group>
            </Header>
            <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion={{
            latitude: 37.541,
            longitude: 126.986,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
            }}>
            </MapView>
        </>
    )
}
