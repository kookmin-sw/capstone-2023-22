import React, { useEffect } from 'react';
import { Header } from '../components/Header/Header';
import { useRootNavigation, useRootRoute } from '../navigations/RootStackNavigation';

import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';
import { useTotalAreaMarkerList } from '../selectors/areamarker';
import { useDispatch } from 'react-redux';
import { TypeAreaMarkerListDispatch, getAreaMarkerList } from '../actions/areaMarker';

export const MapScreen:React.FC = ()=>{
    const rootNavigation = useRootNavigation<'Map'>();
    const route = useRootRoute();

    const dispatch = useDispatch<TypeAreaMarkerListDispatch>();
    const areaMarkerList = useTotalAreaMarkerList();

    useEffect(()=>{
      dispatch(getAreaMarkerList());
    }, [])

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
                {
                    areaMarkerList.map((e): any => {
                        console.log("좌표정보:", e.latitude, e.longitude);
                        return (
                        <Marker key={e.areaName} coordinate={{
                            latitude: e.latitude,
                            longitude: e.longitude
                        }}></Marker>
                        );
                    })
                }

            </MapView>
        </>
    )
}
