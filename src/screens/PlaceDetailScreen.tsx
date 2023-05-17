import React, { useCallback, useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { useHomeNavigation, useHomeRoute } from '../navigations/HomeStackNavigation';
import { Typography } from '../components/Typography';
import axios from 'axios';
import { Config } from '../config';
import { AreaCafeInfo } from '../@types/AreaCafeInfo';
import { AreaCultureInfo } from '../@types/AreaCultureInfo';

import * as WebBrowser from 'expo-web-browser';

export const PlaceDetailScreen:React.FC = ()=>{
    const homeNavigation = useHomeNavigation();
    const {params} = useHomeRoute<'PlaceDetail'>();
    const onPressBack = useCallback(()=>{
        homeNavigation.goBack();
    }, [])

    const GetPlace: React.FC = () => {
        const [placeInfo, setPlaceInfo] = useState<AreaCafeInfo | AreaCultureInfo | undefined>();
        const [placeType, setPlaceType] = useState<string>("");

        useEffect(() => {
            axios.get(`${Config.server}/place/${params.placeId}`, {})
            .then(response => {
                if (response.data.data.cafeResponseDto === null) {
                    setPlaceType("culture");
                    setPlaceInfo(response.data.data.cultureResponseDtos[0]);
                    console.log("setPlaceInfo", response.data.data.cultureResponseDtos[0]);
                } else {
                    setPlaceType("cafe");
                    setPlaceInfo(response.data.data.cafeResponseDto);
                    console.log("setPlaceInfo", response.data.data.cafeResponseDto);
                }
            })
            .catch(error => {
                console.log(error);
            });
        }, [])
        return (
            <View>
                {
                    placeInfo && placeType === "cafe" && (
                        <View>
                            <Typography fontSize={24} bold={true}>{placeInfo.cafe_name}</Typography>
                            <Spacer space={20} />
                            <Typography fontSize={20} bold={true}>장소 정보</Typography>
                            <Spacer space={8} />
                            <Typography fontSize={14}>주소 | {placeInfo.address}</Typography>
                        </View>
                    )
                }
                {
                    placeInfo && placeType === "culture" && (
                        <View>
                            <Typography fontSize={24} bold={true}>{placeInfo.cultureName}</Typography>
                            <Spacer space={20} />
                            <Typography fontSize={20} bold={true}>장소 정보</Typography>
                            <Spacer space={8} />
                            <Typography fontSize={14}>분류 | {placeInfo.classification}</Typography>
                            <Spacer space={4} />
                            <Typography fontSize={14}>관리구 | {placeInfo.borough}</Typography>
                            <Spacer space={4} />
                            <Typography fontSize={14}>대상 이용자 | {placeInfo.targetUser}</Typography>
                            <Spacer space={4} />
                            <TouchableOpacity onPress={() => {
                                WebBrowser.openBrowserAsync(`${placeInfo.culture_url}`);
                            }
                            }><Typography fontSize={14} color="blue">홈페이지 링크</Typography>
                            </TouchableOpacity>
                            <Spacer space={4} />
                        </View>
                    )
                }
            </View>
        );
    }

    // export type AreaCafeInfo = {
    //     id: number,
    //     placeId: number,
    //     cafe_name: string,
    //     latitude: number,
    //     longitude: number,
    //     address: string
    // }

    // export type AreaCultureInfo = {
    //     placeId: number,
    //     latitude: number,
    //     longitude: number,
    //     classification: string,
    //     borough: string,
    //     cultureName: string,
    //     cultureDateTime: string,
    //     targetUser: string,
    //     fee: string,
    //     cast: string | null,
    //     culture_url: string
    // }

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Header>
                <Header.Group>
                    <Header.Icon iconName='chevron-back' onPress={onPressBack}/>
                </Header.Group>
                <Header.Group>
                    <Header.Title title="장소 세부정보"></Header.Title>
                </Header.Group>
                <Header.Group>
                    <Spacer horizontal space={28}/>
                </Header.Group>
            </Header>
            <View style={{paddingHorizontal:10, backgroundColor:'white'}}>
                <View style={{paddingVertical:20, flexDirection:'row'}}>
                    <GetPlace />
                </View>
            </View>
        </View>
    )

}
