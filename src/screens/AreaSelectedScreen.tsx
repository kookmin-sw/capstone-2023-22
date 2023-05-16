import React, { useCallback, useEffect } from 'react';
import { Header } from '../components/Header/Header';
import { useHomeNavigation, useHomeRoute } from '../navigations/HomeStackNavigation';

import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';
import { useTotalAreaCultureList } from '../selectors/areaCulture';
import { useDispatch } from 'react-redux';
import { TypeAreaCultureListDispatch, getAreaCultureList } from '../actions/areaCulture';

import PlaceMarkerImage from '../../assets/place-landmark.png';
import AreaMarkerImage from '../../assets/area-landmark.png';


export const AreaSelectedScreen:React.FC = ()=>{
    const homeNavigation = useHomeNavigation();
    const {params} = useHomeRoute<'AreaSelected'>();

    const onPressBack = useCallback(()=>{
        homeNavigation.goBack();
    }, [])

    const dispatch = useDispatch<TypeAreaCultureListDispatch>();
    const areaCultureList = useTotalAreaCultureList();

    useEffect(()=>{
      dispatch(getAreaCultureList(params.areaId));
    }, [])

    return (
        <>
            <Header>
                <Header.Group>
                    <Header.Icon iconName='chevron-back' onPress={onPressBack}/>
                </Header.Group>
                <Header.Group>
                    <Header.Title title={params.areaName}></Header.Title>
                </Header.Group>
                <Header.Group>
                </Header.Group>
                <Header.Group>
                </Header.Group>
            </Header>
            <MapView
                provider={ PROVIDER_GOOGLE }
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: params.latitude,
                    longitude: params.longitude,
                    latitudeDelta: 0.024,
                    longitudeDelta: 0.024,
                }}>
                {
                    areaCultureList.map((e): any => {
                        return (
                            <Marker
                                image={AreaMarkerImage}
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
