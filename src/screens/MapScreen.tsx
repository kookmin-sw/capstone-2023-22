import React from 'react';
import { Header } from '../components/Header/Header';
import { useHomeNavigation, useHomeRoute } from '../navigations/HomeStackNavigation';

import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';

export const MapScreen:React.FC = ()=>{
    const homeNavigation = useHomeNavigation<'Map'>();
    const route = useHomeRoute();

    return (
        <>
            <Header>
                <Header.Group>
                    <Header.Title title='주요 특구를 선택해주세요.'></Header.Title>
                </Header.Group>
            </Header>
            <MapView
            provider={ PROVIDER_GOOGLE }
            style={{ flex: 1 }}
            initialRegion={{
            latitude: 37.541,
            longitude: 126.986,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
            }}>
                <Marker coordinate={{
                    latitude: 37.541,
                    longitude: 126.986
                }}></Marker>
            </MapView>
        </>
    )
}
