import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, Pressable, View, Platform, Text } from 'react-native';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { SingleLineInput } from '../components/SingleLineInput';
import { Typography } from '../components/Typography';
import { Icon } from '../components/Icons';
import { getAreaRanking, getSearch, getSearchSuccess, getWordcloudSuccess, TypeSearchDispatch } from '../actions/search';
import { useDispatch } from 'react-redux';
import { useAreaRanking, useSearchResult, useWordCloudUri } from '../selectors/search';
import { PlaceInfo } from '../@types/PlaceInfo';
import { Button } from '../components/Button';
import { TabIcon } from '../components/TabIcon';
import { RemoteImage } from '../components/RemoteImage';
import { useHomeNavigation } from '../navigations/HomeStackNavigation';
import ModalSelector from 'react-native-modal-selector';
import { TextInput, FlatList } from 'react-native-gesture-handler';
import { AreaInfo } from '../@types/AreaInfo';
import { useTotalAreaMarkerList } from '../selectors/areamarker';
import { TypeAreaMarkerListDispatch, getAreaMarkerList } from '../actions/areaMarker';
import { AreaMarkerInfo } from '../@types/AreaMarkerInfo';

export const SearchScreen:React.FC = ()=>{
    const [keyword, setKeyword] = useState('');
    const [isWordcloudSelected, setIsWordcloudSelected] = useState(false);
    const dispatch = useDispatch<TypeSearchDispatch>();
    const dispatchArea = useDispatch<TypeAreaMarkerListDispatch>();
    const searchResults = useSearchResult();
    const homeNavigation = useHomeNavigation();
    const wordCloudUri = useWordCloudUri();
    const popularArea = useAreaRanking();
    const areaMarkerList = useTotalAreaMarkerList();
    const [selectedArea, setSelectedArea] = useState('');

    const onPressEnter = useCallback((query:string) => {
        if (query !== "") {
            dispatch(getSearch(query));
        }
        dispatch(getSearchSuccess([]));
    }, [])

    const onPressButton = useCallback((query:string) => {
        dispatch(getSearchSuccess([]));
        setKeyword('');
        // homeNavigation.navigate();

    }, []);

    const checkLatLng = (area: AreaInfo): AreaMarkerInfo => {
        return areaMarkerList[area.areaId - 1];
    }

    // useMemo(() => {return use(); return searchKeyword},[keyword]);
    useEffect(() =>{
        dispatch(getSearchSuccess([]));
        dispatch(getAreaRanking());
        dispatchArea(getAreaMarkerList());
    },[]);

    const data = [
        { key: 1, section: true, label: '특구'},
        { key: 2, label: '홍대 관광특구' },
        { key: 3, label: '강남역' },
        { key: 4, label: '인사동·익선동',},
        { key: 5, label: '여의도' },
        { key: 6, label: '성수카페거리'}
    ];

    const renderItem = (item:PlaceInfo) => {
        return (
            <View style={{paddingHorizontal:7}}>
                <Pressable onPress={() => {homeNavigation.navigate('PlaceDetail', {placeId:item.placeId})}}
                style={{backgroundColor:'white', paddingHorizontal:10, paddingVertical:10, borderRadius:22,marginBottom:10, ...Platform.select({
                ios: {
                shadowColor: 'black',shadowOffset: {
                    width: 1,
                    height: 1,
                },
                shadowOpacity: 0.25,
                shadowRadius: 1,
                },
                android: {
                    elevation: 2,
                },
                })}}>
                <View style={{flexDirection:'row'}}>
                    <View style={{
                         backgroundColor:'#EDCAE9', width: 50, height:50, alignItems: 'center', justifyContent:'center', borderRadius:50/2}}>
                        <TabIcon iconName='restaurant' iconColor='black'></TabIcon>
                        {/* <Image source={require('../../assets/kitchen-pack.png')} style={{width:30, height:30}}/> */}
                    </View>
                    <Spacer space={15} horizontal/>
                    <View style={{justifyContent:'center'}}>
                        <Typography fontSize={16} font='notosans-medium'>{item.placeName}</Typography>
                    </View>
                </View>
                </Pressable>
            </View>
        )
    }
    const renderRankingItem = ({item, index}:{item:AreaInfo, index:number}) => {
        return (
            <View>
                {
                    checkLatLng(item) && (
                        <Pressable
                style={{justifyContent:'center',width:353,paddingBottom:10}}
                onPress={(e) => {
                    console.log("onPress:", item);
                    homeNavigation.navigate('AreaSelected', checkLatLng(item));
                }}>
                <View style={{flexDirection:'row', alignItems:'center', paddingHorizontal:'10%',borderRadius:11, backgroundColor:'white', height:50, ...Platform.select({
                ios: {
                shadowColor: 'black',shadowOffset: {
                    width: 2,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3,
                },
                android: {
                    elevation: 2,
                },
                })}}>
                    <Text style={{fontSize:16, fontWeight:'bold', width:'15%'}}>{index+1}</Text>
                    <Text style={{color:'#764AF1', fontSize:16, fontWeight:'bold'}}>{item.areaName}</Text>
                </View>
            </Pressable>
                    )
                }
            </View>


        )
    }

    return (
        <Pressable onPress={Keyboard.dismiss} style={{ flex:1, backgroundColor:'white'}}>
            <Header>
                <Header.Group>
                    <Header.Title title='검색'></Header.Title>
                </Header.Group>
            </Header>
            <View style={{paddingHorizontal:10, backgroundColor:'white'}}>
                <View style={{paddingVertical:20}}>
                    <SingleLineInput value={keyword} onChangeText={setKeyword} onSubmitEditing={()=>{onPressEnter(keyword); console.log(useSearchResult)}} placeholder='지금 궁금한 장소는?' fontSize={15}/>
                </View>
                {(searchResults.length > 0 || keyword !== '') ?
                <View style={{height:'82.5%'}}>
                    <View>
                        <FlatList<PlaceInfo>
                        data={searchResults}
                        keyExtractor={(item:PlaceInfo) => `${item.placeId}`}
                        renderItem={({item}) => renderItem(item)}
                        ListHeaderComponent={
                            <View style={{alignItems:"flex-end", paddingHorizontal:10, paddingBottom:10}}>
                                <Typography fontSize={11}>총 {searchResults.length}개</Typography>
                            </View>
                        }
                        />
                    </View>
                </View> :
                <View>
                    <View style={{paddingVertical:20}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <View style={{flex:1}}>
                            <Typography color='black' bold fontSize={18} >실시간 트렌드</Typography>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{backgroundColor:'#D9D9D9', padding:5, borderRadius:2}}>
                                <Pressable onPress={() =>
                                    {
                                        dispatch(getAreaRanking());
                                        setIsWordcloudSelected(false);
                                    }}>
                                    <Icon name='list' size={20} color={isWordcloudSelected ? 'gray' : 'black'}/>
                                </Pressable>
                            </View>
                            <Spacer space={3} horizontal/>
                            <View style={{backgroundColor:'#D9D9D9', padding:5, borderRadius:2}}>
                                <Pressable onPress={() => setIsWordcloudSelected(true)}>
                                    <Icon name='cloud' size={20} color={isWordcloudSelected ? 'black' : 'gray'}/>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    { isWordcloudSelected ?
                    <View style={{marginTop:30}}>
                        <View style={{...Platform.select({
                        ios: {
                        shadowColor: 'black',shadowOffset: {
                            width: 2,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3,
                        },
                        android: {
                            elevation: 10,
                        }
                        })}}>
                        <ModalSelector
                            data={data}
                            initValue="트렌드가 궁금한 지역을 선택해보세요!"
                            accessible={true}
                            cancelButtonAccessibilityLabel={'Cancel Button'}
                            onChange={(option)=>{ dispatch(getWordcloudSuccess(option.label)); setSelectedArea(option.label);}}>
                            <TextInput
                                style={{padding:10, height:30, backgroundColor:'#764AF1', borderRadius:6, width:'80%', color:'white', alignSelf:'center', textAlign:'center'}}
                                editable={false}
                                placeholderTextColor='white'
                                placeholder="트렌드가 궁금한 지역을 선택해보세요!"
                                value={selectedArea} />

                        </ModalSelector>
                        </View>
                        {
                         wordCloudUri && <View style={{alignItems:'center', marginTop:40}}>
                         <RemoteImage url={wordCloudUri}
                                 width={400} height={230}/>
                        </View>
                        }

                    </View>
                     :
                        <View>
                            <FlatList<AreaInfo>
                            data={popularArea}
                            renderItem={renderRankingItem}
                            style={{width:'100%', marginTop:'7%', alignSelf:'center',height:'82%'}}
                            contentContainerStyle={{alignItems:'center'}}
                            showsVerticalScrollIndicator={true}

                            />
                        </View>
                    }
                    </View>
                </View>
                }
            </View>
        </Pressable>
    )
}
