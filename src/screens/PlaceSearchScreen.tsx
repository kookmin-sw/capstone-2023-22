import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, TextInput, TouchableOpacity, View, Platform } from 'react-native';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { useHomeNavigation } from '../navigations/HomeStackNavigation';
import { Typography } from '../components/Typography';
import { useDispatch } from 'react-redux';
import { getSearch, getSearchSuccess, TypeSearchDispatch } from '../actions/search';
import { useSearchResult } from '../selectors/search';
import { PlaceInfo } from '../@types/PlaceInfo';
import { Button } from '../components/Button';
import { TabIcon } from '../components/TabIcon';


export const PlaceSearchScreen:React.FC = ()=>{
    const [keyword, setKeyword] = useState('');
    const homeNavigation = useHomeNavigation();
    const dispatch = useDispatch<TypeSearchDispatch>();
    const searchResults = useSearchResult();

    const onPressBack = useCallback(()=>{
        dispatch(getSearchSuccess([]));
        setKeyword('');
        homeNavigation.goBack();
    }, [])

    const onPressEnter = useCallback((query:string) => {
        dispatch(getSearch(query));
    }, [])

    const onPressButton = useCallback((item:PlaceInfo) => {
        homeNavigation.navigate('ImageSelect', item);
    }, [])

    // useMemo(() => {return use(); return searchKeyword},[keyword]); 
    useEffect(() =>{dispatch(getSearchSuccess([]))},[]);

    const renderItem = (item:PlaceInfo) => {
        return (
            <View style={{paddingHorizontal:10, paddingVertical:10}}>
                <Button onPress={() => {onPressButton(item)}}>
                <View style={{flexDirection:'row'}}>
                    <View style={{backgroundColor:'#EDCAE9', width: 60, height:60, alignItems: 'center', justifyContent:'center', borderRadius:60/2, ...Platform.select({
                        ios: {
                        shadowColor: 'black',shadowOffset: {
                            width: 3,
                            height: 3,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3,
                        },
                        android: {
                            elevation: 10,
                        }
                        })}}>
                        <TabIcon iconName='restaurant' iconColor='black'></TabIcon>
                    </View>
                    <Spacer space={15} horizontal/>
                    <View style={{justifyContent:'center'}}>
                        <Typography fontSize={20} bold>{item.placeName}</Typography>
                    </View>
                </View>
                </Button>
            </View>
        )
    }

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Header>
                <Header.Group>
                    <Header.Icon iconName='chevron-back' onPress={onPressBack}/>
                </Header.Group>
                <Header.Group>
                    <Header.Title title='장소 직접 찾기'></Header.Title>
                </Header.Group>
                <Header.Group>
                    <Spacer horizontal space={28}/>
                </Header.Group>
            </Header>
            <View style={{paddingHorizontal:10, backgroundColor:'white'}}>
                <View style={{paddingVertical:20, flexDirection:'row'}}>
                    <View style={{flex:1, alignSelf:'stretch', justifyContent:'center', backgroundColor:'#E4E4E4', borderRadius:4, padding:12, ...Platform.select({
                        ios: {
                        shadowColor: 'black',shadowOffset: {
                            width: 3,
                            height: 3,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3,
                        },
                        android: {
                            elevation: 10,
                        }
                        })}}>
                        <TextInput value={keyword} autoCorrect={false} onChangeText={setKeyword} autoCapitalize={'none'} onSubmitEditing={() => onPressEnter(keyword)} style={{fontSize:15}} placeholder='검색할 장소를 입력하세요'></TextInput>
                    </View>
                    <Spacer space={10} horizontal/>
                    <TouchableOpacity onPress={() => onPressEnter(keyword)}>
                        <View style={{justifyContent:'center', backgroundColor:'#764AF1', paddingHorizontal:20, paddingVertical:10, borderRadius:5, width:67, height:52, ...Platform.select({
                        ios: {
                        shadowColor: 'black',shadowOffset: {
                            width: 3,
                            height: 3,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3,
                        },
                        android: {
                            elevation: 10,
                        }
                        })}}>
                            <Typography color='white' fontSize={15}>검색</Typography>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    {searchResults.length > 0 ?
                    <View>
                        <View style={{alignItems:"flex-end", paddingHorizontal:10, paddingBottom:10}}>
                            <Typography fontSize={12} bold>총 {searchResults.length}개</Typography>
                        </View> 
                        <View>
                            <FlatList<PlaceInfo>
                            data={searchResults}
                            keyExtractor={(item:PlaceInfo) => `${item.placeId}`}
                            renderItem={({item}) => renderItem(item)}
                            />
                        </View>
                    </View> : 
                    <View style={{alignItems:"flex-end", paddingHorizontal:10, paddingBottom:10}}>
                        <Typography fontSize={12} bold>총 {searchResults.length}개</Typography>
                    </View> 
                    }
                </View>
                
            </View>
            
        </View>
    )
}
