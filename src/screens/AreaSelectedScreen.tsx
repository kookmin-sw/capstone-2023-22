import React, { useCallback, useEffect } from 'react';
import { Header } from '../components/Header/Header';
import { useHomeNavigation, useHomeRoute } from '../navigations/HomeStackNavigation';

import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';

import { useDispatch } from 'react-redux';
import { useTotalAreaCultureList } from '../selectors/areaCulture';
import { useTotalAreaCafeList } from '../selectors/areaCafe';
import { TypeAreaCultureListDispatch, getAreaCultureList } from '../actions/areaCulture';
import { TypeAreaCafeListDispatch, getAreaCafeList } from '../actions/areaCafe';

import CultureLandmarkImage from '../../assets/culture-landmark.png';
import CafeLandmarkImage from '../../assets/cafe-landmark.png';
import { AreaCultureInfo } from '../@types/AreaCultureInfo';
import { AreaCafeInfo } from '../@types/AreaCafeInfo';
import { AreaDetailSheet } from './AreaDetailSheet';
import { Spacer } from '../components/Spacer';


export const AreaSelectedScreen:React.FC = ()=>{
    const homeNavigation = useHomeNavigation();
    const {params} = useHomeRoute<'AreaSelected'>();

    const onPressBack = useCallback(()=>{
        homeNavigation.goBack();
    }, [])

    const onPressPlace = useCallback((item: AreaCafeInfo | AreaCultureInfo)=>{
        homeNavigation.navigate('PlaceDetail', item);
    }, [])

    const dispatchCulture = useDispatch<TypeAreaCultureListDispatch>();
    const dispatchCafe = useDispatch<TypeAreaCafeListDispatch>();
    const areaCultureList = useTotalAreaCultureList();
    const areaCafeList = useTotalAreaCafeList();

    useEffect(()=>{
      dispatchCulture(getAreaCultureList(params.areaId));
      dispatchCafe(getAreaCafeList(params.areaId));
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
                    <Spacer horizontal space={28}/>
                </Header.Group>
            </Header>
            <MapView
                provider={ PROVIDER_GOOGLE }
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: params.latitude,
                    longitude: params.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}>
                {
                    areaCultureList.map((e): any => {
                        return (
                            <Marker
                                key={e.cultureName}
                                image={CultureLandmarkImage}
                                onPress={(pressedE) => {
                                    onPressPlace(e)
                                }}
                                coordinate={{
                                    latitude: e.latitude,
                                    longitude: e.longitude
                                }}
                            />
                        );
                    })
                }
                {
                    areaCafeList.map((e): any => {
                        return (
                            <Marker
                                key={e.id}
                                image={CafeLandmarkImage}
                                onPress={(pressedE) => {
                                    onPressPlace(e)
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
            <AreaDetailSheet name={params.areaName} />
        </>
    )
}
