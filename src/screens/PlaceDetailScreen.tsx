import React, { useCallback, useEffect, useState } from 'react';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { useHomeNavigation, useHomeRoute } from '../navigations/HomeStackNavigation';
import { Typography } from '../components/Typography';
import axios from 'axios';
import { Config } from '../config';
import { AreaCafeInfo } from '../@types/AreaCafeInfo';
import { AreaCultureInfo } from '../@types/AreaCultureInfo';
import { Icon } from '../components/Icons';

import * as WebBrowser from 'expo-web-browser';
import { AreaDetailSheet } from './AreaDetailSheet';

type propsType = {
    iconName: string,
    content: string,
    iconColor?: string,
    fontColor?: string
}

const PlaceDetailInfo: React.FC<propsType> = (props: propsType) => {
    return (
        <View>
            <View style={styles.placeInfo}>
                <View style={{marginRight: 12}}>
                    <Icon name={props.iconName} size={18} color={props.iconColor!} />
                </View>
                <View style={{width: "90%"}}>
                    <Typography fontSize={14} color={props.fontColor}>{props.content}</Typography>
                </View>
            </View>
            <Spacer space={8} />
        </View>

    );
}

export const PlaceDetailScreen:React.FC = ()=>{
    const homeNavigation = useHomeNavigation();
    const {params} = useHomeRoute<'PlaceDetail'>();
    const onPressBack = useCallback(()=>{
        homeNavigation.goBack();
    }, [])

    const [placeInfo, setPlaceInfo] = useState<AreaCafeInfo | AreaCultureInfo | undefined>();
    const [placeType, setPlaceType] = useState<string>("");
    const [posts, setPosts] = useState([]);

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

    useEffect(() => {
        axios.get(`${Config.server}/posts/1`, {})
        .then(response => {
            console.log("THIS:", response.data.data);
            setPosts(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [])

    const GetPlace: React.FC = () => {
        return (
            <View style={{flex: 1, marginLeft: 10}}>
                {
                    placeInfo && placeType === "cafe" && (
                        <View style={styles.placeContainer}>
                            <Typography fontSize={24} bold={true}>{placeInfo.cafe_name}</Typography>
                            <Spacer space={20} />
                            <Typography fontSize={20} bold={true}>장소 정보</Typography>
                            <Spacer space={8} />
                            <PlaceDetailInfo iconName="ios-home" iconColor="gray" content={placeInfo.address}/>
                            <Spacer space={20} />
                            <Typography fontSize={20} bold={true}>세소행 공간</Typography>
                            {/* todo: 커뮤니티 사진 넣기 */}
                        </View>
                    )
                }
                {
                    placeInfo && placeType === "culture" && (
                        <View>
                            <Typography fontSize={24} bold={true}>{placeInfo.cultureName}</Typography>
                            <Spacer space={24} />
                            <Typography fontSize={20} bold={true}>장소 정보</Typography>
                            <Spacer space={12} />
                            <PlaceDetailInfo iconName="calendar" iconColor="gray" content={placeInfo.cultureDatetime}/>
                            <PlaceDetailInfo iconName="bookmark" iconColor="gray" content={placeInfo.classification}/>
                            <PlaceDetailInfo iconName="map" iconColor="gray" content={placeInfo.borough}/>
                            <PlaceDetailInfo iconName="calculator" iconColor="gray" content={placeInfo.fee}/>
                            <PlaceDetailInfo iconName="person-circle" iconColor="gray" content={placeInfo.targetUser}/>
                            <TouchableOpacity onPress={() => { WebBrowser.openBrowserAsync(`${placeInfo.culture_url}`); }}>
                                <PlaceDetailInfo iconName="earth" iconColor="blue" content="홈페이지" fontColor="blue"/>
                            </TouchableOpacity>
                            <Spacer space={20} />
                            <Typography fontSize={20} bold={true}>세소행 공간</Typography>
                            {/* todo: 커뮤니티 사진 넣기 */}
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
            {
                placeInfo && <AreaDetailSheet name={placeInfo.areaName} />
            }
        </View>
    )
}


const styles = StyleSheet.create({
    placeContainer: {
        width: "100%",
    },
    placeInfo: {
        flexDirection: "row",
    }
});

