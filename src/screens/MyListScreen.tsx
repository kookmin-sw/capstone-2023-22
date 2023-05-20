import React, {useEffect} from 'react';
import {FlatList, Pressable, View} from 'react-native';
import { useDispatch } from 'react-redux';
import { Platform } from 'react-native';

import { Button } from '../components/Button';
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

    const onPress = () => {
        console.log('clicked');
    }
    useEffect(()=>{
        dispatch(getBookmarkList());
    }, [])

    
    const renderItem = (item:BookmarkInfo) => {
        return (
            <View style={{paddingHorizontal:10, paddingVertical:10}}>
                <Button onPress={onPress}>
                <View style={{flexDirection:'row'}}>
                    <View style={{ ...Platform.select({
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
                        },
                        }), backgroundColor:'#EDCAE9', width: 60, height:60, alignItems: 'center', justifyContent:'center', borderRadius:60/2}}>
                        <TabIcon iconName='restaurant' iconColor='black'></TabIcon>
                        {/* <Image source={require('../../assets/kitchen-pack.png')} style={{width:30, height:30}}/> */}
                    </View>
                    <Spacer space={15} horizontal/>
                    <Pressable onPress={() => {
                        homeNavigation.navigate('PlaceDetail', {placeId:item.placeId})
                        }} style={{justifyContent:'center'}}>
                        <Typography fontSize={20} bold font='notosans-medium'>{item.placeName}</Typography>
                    </Pressable>
                </View>
                </Button>
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
                            <Typography fontSize={12} bold>총 {bookmarkList.length}개</Typography>
                        </View>
                    }
                />
            </View>
        </View>

    )

}