import React, { useCallback, useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { useHomeNavigation, useHomeRoute } from '../navigations/HomeStackNavigation';
import { Typography } from '../components/Typography';
import axios from 'axios';
import { Config } from '../config';

export const PlaceDetailScreen:React.FC = ()=>{
    const homeNavigation = useHomeNavigation();
    const {params} = useHomeRoute<'PlaceDetail'>();
    const onPressBack = useCallback(()=>{
        homeNavigation.goBack();
    }, [])
    const [placeInfo, setPlaceInfo] = useState({});
    const [placeType, setPlaceType] = useState("");

    async () => await axios.get(`${Config.server}/place/${params.placeId}`, {})
        .then(response => {
            if (response.data.data.cafeResponseDto === null) {
                setPlaceInfo(response.data.data.cultureResponseDtos[0]);
                console.log("setPlaceInfo", response.data.data.cultureResponseDtos[0]);
                setPlaceType("culture");
            } else {
                setPlaceInfo(response.data.data.cafeResponseDto[0]);
                console.log("setPlaceInfo", response.data.data.cafeResponseDto[0]);
                setPlaceType("cafe");
            }
        })
        .catch(error => {
            console.log(error);
    });

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Header>
                <Header.Group>
                    <Header.Icon iconName='chevron-back' onPress={onPressBack}/>
                </Header.Group>
                <Header.Group>
                    <Header.Title title={`${params.cafe_name ?? params.cultureName} 정보`}></Header.Title>
                </Header.Group>
                <Header.Group>
                    <Spacer horizontal space={28}/>
                </Header.Group>
            </Header>
            <View style={{paddingHorizontal:10, backgroundColor:'white'}}>
                <View style={{paddingVertical:20, flexDirection:'row'}}>
                    <Typography color="black" fontSize={25}></Typography>
                </View>
                <Typography fontSize="24" bold="900">{placeInfo.cafe_name ?? placeInfo.cultureName}</Typography>
                <Spacer space={3} horizontal/>
                <Typography fontSize="16">문화생활 분류 | {placeInfo.classification}</Typography>
                <View style={{paddingVertical:20}}>
                </View>
            </View>

        </View>
    )

}
