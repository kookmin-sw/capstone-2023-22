import React, {useEffect} from 'react';
import {FlatList, Pressable, View} from 'react-native';
import { useDispatch } from 'react-redux';
import { Platform } from 'react-native';

import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { TabIcon } from '../components/TabIcon';
import { Typography } from '../components/Typography';
import { BookmarkInfo } from '../@types/BookmarkInfo';
import { getBookmarkList, TypeBookmarkListDispatch } from '../actions/bookmark';
import { useTotalBookmarkList } from '../selectors/bookmark';
import { useHomeNavigation } from '../navigations/HomeStackNavigation';

export const MyListScreen:React.FC = () => {
    const dispatch = useDispatch<TypeBookmarkListDispatch>();
    const bookmarkList = useTotalBookmarkList();
    const homeNavigation = useHomeNavigation();
    useEffect(()=>{
        dispatch(getBookmarkList());
    }, [])

    
    const renderItem = (item:BookmarkInfo) => {
        return (
            <View style={{paddingHorizontal:7}}>
                <Pressable onPress={() => {homeNavigation.navigate('PlaceDetail', {placeId:item.placeId})}} 
                style={{backgroundColor:'white', paddingHorizontal:10, paddingVertical:10, borderRadius:30,marginBottom:10, ...Platform.select({
                ios: {
                shadowColor: 'black',shadowOffset: {
                    width: 1,
                    height: 1,
                },
                shadowOpacity: 0.25,
                shadowRadius: 2,
                },
                android: {
                    elevation: 1,
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
    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Header>
                <Header.Group>
                    <Header.Title title='저장된 장소'/>
                </Header.Group>
            </Header>
            <View style={{flex:1}}>
                <FlatList<BookmarkInfo>
                    data={bookmarkList}
                    keyExtractor={(item:BookmarkInfo) => `${item.placeId}`}
                    renderItem={({item}) => renderItem(item)}
                    ListHeaderComponent={
                        <View style={{alignItems:"flex-end", paddingHorizontal:10, paddingVertical:20}}>
                            <Typography fontSize={11} >총 {bookmarkList.length}개</Typography>
                        </View>
                    }
                />
            </View>
        </View>

    )

}