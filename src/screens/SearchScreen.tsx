import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Keyboard, Pressable, ScrollView, View } from 'react-native';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { SingleLineInput } from '../components/SingleLineInput';
import { Typography } from '../components/Typography';
import { Icon } from '../components/Icons';
import { changeSearchKeyword, getSearch, getSearchSuccess, TypeSearchDispatch } from '../actions/search';
import { useDispatch } from 'react-redux';
import { useSearchKeyword, useSearchResult } from '../selectors/search';
import { PlaceInfo } from '../@types/PlaceInfo';
import { Button } from '../components/Button';
import { TabIcon } from '../components/TabIcon';
import { useHomeNavigation } from '../navigations/HomeStackNavigation';

export const SearchScreen:React.FC = ()=>{
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch<TypeSearchDispatch>();
    const searchResults = useSearchResult();
    const homeNavigation = useHomeNavigation();

    const onPressEnter = useCallback((query:string) => {
        dispatch(getSearch(query));
    }, [])

    const onPressButton = useCallback((query:string) => {
        dispatch(getSearchSuccess([]));
        setKeyword('');
        // homeNavigation.navigate();
        
    }, [])

    // useMemo(() => {return use(); return searchKeyword},[keyword]); 
    useEffect(() =>{dispatch(getSearchSuccess([]))},[]);

    const renderItem = (item:PlaceInfo) => {
        return (
            <View style={{paddingHorizontal:10, paddingVertical:10}}>
                <Button onPress={onPressButton}>
                <View style={{flexDirection:'row'}}>
                    <View style={{backgroundColor:'#EDCAE9', width: 60, height:60, alignItems: 'center', justifyContent:'center', borderRadius:60/2}}>
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
        <Pressable onPress={Keyboard.dismiss} style={{flex:1, backgroundColor:'white'}}>
            <Header>
                <Header.Group>
                    <Header.Title title='검색'></Header.Title>
                </Header.Group>
            </Header>
            <View style={{paddingHorizontal:10, backgroundColor:'white'}}>
                <View style={{paddingVertical:20}}>
                    <SingleLineInput value={keyword} onChangeText={setKeyword} onSubmitEditing={()=>{onPressEnter(keyword); console.log(useSearchResult)}} placeholder='지금 궁금한 장소는?' fontSize={15}/>
                </View>
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
                <View>
                    <View style={{alignItems:"flex-end", paddingHorizontal:10, paddingBottom:10}}>
                        <Typography fontSize={12} bold>총 {searchResults.length}개</Typography>
                    </View>
                    <View style={{paddingVertical:20}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <View style={{flex:1}}>
                            <Typography color='black' fontSize={18} bold>실시간 트렌드</Typography>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{backgroundColor:'#D9D9D9', padding:5, borderRadius:2}}>
                                <Icon name='list' size={20} color='black'/>
                            </View>
                            <Spacer space={3} horizontal/>
                            <View style={{backgroundColor:'#D9D9D9', padding:5, borderRadius:2}}>
                                <Icon name='cloud' size={20} color='black'/>
                            </View>
                        </View>
                    </View>
                    </View>
                </View>
                }
            </View>
        </Pressable>
    )
}
