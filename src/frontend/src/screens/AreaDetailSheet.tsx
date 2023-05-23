import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Typography } from '../components/Typography';
import { Spacer } from '../components/Spacer';
import { Config } from '../config';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

export const AreaDetailSheet = (props: any): JSX.Element => {
    // hooks
    const sheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["11%", "50%", "75%"], []);

    const [modelImageError, setModelImageError] = useState(false);
    const [oldImageError, setOldImageError] = useState(false);
    const [sexImageError, setSexImageError] = useState(false);
    const [trendImageError, setTrendImageError] = useState(false);

    const [livePopulationLevel, setLivePopulationLevel] = useState<String>();
    const [livePopulationMessage, setLivePopulationMessage] = useState<String>();

    const checkColor = (item: string): string => {
        if (item === "여유")
            return "green";
        if (item === "보통")
            return "yellow";
        if (item === "약간 붐빔")
            return "orange";
        if (item === "붐빔")
            return "red";
        return "black";
    }

    // callbacks
    const handleSheetChange = useCallback((index: number) => {
    console.log("handleSheetChange", index);
    }, []);

    useEffect(() => {
        axios.get(`http://openapi.seoul.go.kr:8088/${Config.seoul_token}/xml/citydata/1/10/${props.name}`, {
            responseType: "text"
        })
        .then(res => {
            const xmlData = res.data;
            const jsonParser = new XMLParser;
            const jsonData = jsonParser.parse(xmlData);
            setLivePopulationLevel(jsonData["SeoulRtd.citydata"]["CITYDATA"]["LIVE_PPLTN_STTS"]["LIVE_PPLTN_STTS"]["AREA_CONGEST_LVL"]);
            setLivePopulationMessage(jsonData["SeoulRtd.citydata"]["CITYDATA"]["LIVE_PPLTN_STTS"]["LIVE_PPLTN_STTS"]["AREA_CONGEST_MSG"]);
        }).catch(err => {console.log(err.response)});
    }, []);

    return (
        <BottomSheet
            ref={sheetRef}
            index={0}
            backgroundStyle={styles.contentContainer}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
        >
            <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                <View style={{flex: 1, alignItems: "center"}}>
                    <Spacer space={16} />
                    <Typography fontSize={24} bold={true}>{props.name}</Typography>
                    <Spacer space={28} />
                    <View style={styles.contentBox}>
                        <View style={{alignSelf: "flex-start"}}><Typography fontSize={20} bold={true}>인구정보</Typography></View>
                        <Spacer space={12} />
                        <Typography fontSize={20} color={checkColor(livePopulationLevel)} bold>현재 인구혼잡도는 {livePopulationLevel}입니다.</Typography>
                        <Spacer space={8} />
                        <Typography fontSize={14}>{livePopulationMessage}</Typography>
                        {
                            !modelImageError ?
                            <Image
                                onError={() => setModelImageError(true)}
                                style={{width: "100%", height: 300}}
                                resizeMode="contain"
                                source={{ uri: `${Config.s3_server}/prophet/${props.name}/${props.name}_model.png` }}
                            /> :
                            <View style={{paddingBottom: 20, paddingTop: 20}}>
                                <Typography fontSize={15} color="gray">{props.name} 의 인구혼잡도 정보는 현재 제공 준비중입니다.</Typography>
                            </View>
                        }
                    </View>
                    <View style={styles.contentBox}>
                        <View style={{alignSelf: "flex-start"}}><Typography fontSize={20} bold={true}>주간 트렌드</Typography></View>
                        {
                            !trendImageError ?
                            <Image
                                onError={() => setTrendImageError(true)}
                                style={{width: "100%", height: 300}}
                                resizeMode="contain"
                                source={{ uri: `${Config.s3_server}/week_trend/${props.name}/${props.name}_week.png` }}
                            /> :
                            <View style={{paddingBottom: 20, paddingTop: 20}}>
                                <Typography fontSize={15} color="gray">{props.name} 의 주간 트렌드 정보는 현재 제공 준비중입니다.</Typography>
                            </View>
                        }
                    </View>
                    <View style={styles.contentBox}>
                        <View style={{alignSelf: "flex-start"}}><Typography fontSize={20} bold={true}>연령 비율 정보</Typography></View>
                        {
                            !oldImageError ?
                            <Image
                                onError={() => setOldImageError(true)}
                                style={{width: "100%", height: 300}}
                                resizeMode="contain"
                                source={{ uri: `${Config.s3_server}/sex,old-rate/${props.name}/${props.name}_rate_old.png` }}
                            /> :
                            <View style={{paddingBottom: 20, paddingTop: 20}}>
                                <Typography fontSize={15} color="gray">{props.name} 의 연령 비율 정보는 현재 제공 준비중입니다.</Typography>
                            </View>
                        }
                    </View>
                    <View style={styles.contentBox}>
                    <View style={{alignSelf: "flex-start"}}><Typography fontSize={20} bold={true}>성별 비율 정보</Typography></View>
                        {
                            !sexImageError ?
                            <Image
                            onError={() => setSexImageError(true)}
                            style={{width: "100%", height: 300}}
                            resizeMode="contain"
                            source={{ uri: `${Config.s3_server}/sex,old-rate/${props.name}/${props.name}_rate_sex.png` }}
                            /> :
                            <View style={{paddingBottom: 20, paddingTop: 20}}>
                                <Typography fontSize={15} color="gray">{props.name} 의 성별 비율 정보는 현재 제공 준비중입니다.</Typography>
                            </View>
                        }
                    </View>
                </View>
            </BottomSheetScrollView>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
    backgroundColor: "rgb(241, 241, 241)",
    },
    itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
    },
    contentBox: {
        backgroundColor: "white",
        borderRadius: 10,
        width: "95%",
        paddingTop: 20,
        paddingRight: 10,
        paddingLeft: 10,
        marginBottom: 10,
    }
});
