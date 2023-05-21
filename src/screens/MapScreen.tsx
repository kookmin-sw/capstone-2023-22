import React, { useCallback, useEffect, useState } from 'react';
import { Header } from '../components/Header/Header';
import { useHomeNavigation, useHomeRoute } from '../navigations/HomeStackNavigation';

import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';

import { useDispatch } from 'react-redux';
import { TypeAreaMarkerListDispatch, getAreaMarkerList } from '../actions/areaMarker';
import { useTotalAreaMarkerList } from '../selectors/areamarker';
import { AreaMarkerInfo } from '../@types/AreaMarkerInfo';

import AreaMarkerImage from '../../assets/area-landmark.png';
import { Pressable } from 'react-native';


export const MapScreen:React.FC = ()=>{
    const [isRegionChanged, setIsRegionChanged] = useState<Boolean>(false);
    const homeNavigation = useHomeNavigation<'Map'>();
    const stackNavigation = useHomeNavigation();
    const route = useHomeRoute();

    const dispatch = useDispatch<TypeAreaMarkerListDispatch>();
    const areaMarkerList = useTotalAreaMarkerList();

    const onPressLandmark = useCallback((item: AreaMarkerInfo)=>{
        stackNavigation.navigate('AreaSelected', item);
    }, [])

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
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2,
                }}
                onRegionChange={() => {
                    setIsRegionChanged(true);
                }}
                >
                {
                    areaMarkerList.map((e): any => {
                        return (
                            <Marker
                                key={e.areaId}
                                image={AreaMarkerImage}
                                onPress={(pressedE) => {
                                    console.log(pressedE.nativeEvent, "clicked");
                                    onPressLandmark(e)
                                }}
                                coordinate={{
                                    latitude: e.latitude,
                                    longitude: e.longitude
                                }}
                            />
                        );
                    })
                }
            </MapView>
        </>
    )
}
