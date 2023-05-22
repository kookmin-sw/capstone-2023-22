import React, { useCallback, useEffect } from 'react';
import { Header } from '../components/Header/Header';
import { useHomeNavigation, useHomeRoute } from '../navigations/HomeStackNavigation';

import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';

import { useDispatch } from 'react-redux';
import { TypeAreaMarkerListDispatch, getAreaMarkerList } from '../actions/areaMarker';
import { useTotalAreaMarkerList } from '../selectors/areamarker';
import { AreaMarkerInfo } from '../@types/AreaMarkerInfo';

import AreaMarkerImage from '../../assets/area-landmark.png';
import { Spacer } from '../components/Spacer';
import ModalSelector from 'react-native-modal-selector';

export const MapScreen:React.FC = ()=>{
    const homeNavigation = useHomeNavigation<'Map'>();
    const stackNavigation = useHomeNavigation();
    const route = useHomeRoute();

    const dispatch = useDispatch<TypeAreaMarkerListDispatch>();
    const areaMarkerList = useTotalAreaMarkerList();

    let data: any = [{"key": 0, "section": true, "label": "특구를 선택하세요"}, {"key": 1, "label": "홍대 관광특구"}, {"key": 2, "label": "창덕궁·종묘"}, {"key": 3, "label": "서울역"}, {"key": 4, "label": "가산디지털단지역"}, {"key": 5, "label": "건대입구역"}, {"key": 6, "label": "신촌·이대역"}, {"key": 7, "label": "남산공원"}, {"key": 8, "label": "북서울꿈의숲"}, {"key": 9, "label": "창동 신경제 중심지"}, {"key": 10, "label": "압구정로데오거리"}, {"key": 11, "label": "가로수길"}, {"key": 12, "label": "수유리 먹자골목"}, {"key": 13, "label": "잠실 관광특구"}, {"key": 14, "label": "명동 관광특구"}, {"key": 15, "label": "동대문 관광특구"}, {"key": 16, "label": "종로·청계 관광특구"}, {"key": 17, "label": "강남 MICE 관광특구"}, {"key": 18, "label": "이태원 관광특구"}, {"key": 19, "label": "광화문·덕수궁"}, {"key": 20, "label": "경복궁·서촌마을"}, {"key": 21, "label": "신도림역"}, {"key": 22, "label": "고속터미널역"}, {"key": 23, "label": "구로디지털단지역"}, {"key": 24, "label": "강남역"}, {"key": 25, "label": "역삼역"}, {"key": 26, "label": "교대역"}, {"key": 27, "label": "신림역"}, {"key": 28, "label": "선릉역"}, {"key": 29, "label": "연신내역"}, {"key": 30, "label": "용산역"}, {"key": 31, "label": "왕십리역"}, {"key": 32, "label": "서울숲공원"}, {"key": 33, "label": "망원한강공원"}, {"key": 34, "label": "이촌한강공원"}, {"key": 35, "label": "반포한강공원"}, {"key": 36, "label": "뚝섬한강공원"}, {"key": 37, "label": "잠실한강공원"}, {"key": 38, "label": "월드컵공원"}, {"key": 39, "label": "서울대공원"}, {"key": 40, "label": "국립중앙박물관·용산가족공원"}, {"key": 41, "label": "잠실종합운동장"}, {"key": 42, "label": "영등포 타임스퀘어"}, {"key": 43, "label": "여의도"}, {"key": 44, "label": "DMC(디지털미디어시티)"}, {"key": 45, "label": "북촌한옥마을"}, {"key": 46, "label": "낙산공원·이화마을"}, {"key": 47, "label": "노량진"}, {"key": 48, "label": "쌍문동 맛집거리"}, {"key": 49, "label": "인사동·익선동"}, {"key": 50, "label": "성수카페거리"}];

    const onPressLandmark = useCallback((item: AreaMarkerInfo)=>{
        stackNavigation.navigate('AreaSelected', item);
    }, [])

    useEffect(()=>{
      dispatch(getAreaMarkerList());
    //   areaMarkerList.map((elmt, idx) => {
    //     data.push({key: elmt.areaId, label: elmt.areaName})
    //   })
    //   console.log("data here", data);
    }, [])

    return (
        <>
            <Header>
                <Header.Group>
                    <Spacer horizontal space={28}/>
                </Header.Group>
                <Header.Group>
                    <Header.Title title="주요 특구를 선택해주세요"></Header.Title>
                </Header.Group>
                <Header.Group>
                    <ModalSelector
                        data={data}
                        optionStyle={{flex: 1, height: "50%"}}
                        accessible={true}
                        cancelButtonAccessibilityLabel={'취소'}
                        onChange={(option)=> { onPressLandmark(areaMarkerList[option.key - 1])} }>
                            <Header.Icon iconName='list' onPress={() => {console.log("clicked")}}/>
                    </ModalSelector>
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
                }}>
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
