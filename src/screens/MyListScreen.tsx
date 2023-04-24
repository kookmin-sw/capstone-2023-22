import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import { useDispatch } from 'react-redux';

import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { TabIcon } from '../components/TabIcon';
import { Typography } from '../components/Typography';
import { BookmarkInfo } from '../@types/BookmarkInfo';
import { getBookmarkList, TypeBookmarkListDispatch } from '../actions/bookmark';
import { useTotalBookmarkList } from '../selectors/bookmark';

export const MyListScreen:React.FC = () => {
    const dispatch = useDispatch<TypeBookmarkListDispatch>();
    const bookmarkList = useTotalBookmarkList();

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
                    <View style={{backgroundColor:'#EDCAE9', width: 60, height:60, alignItems: 'center', justifyContent:'center', borderRadius:60/2}}>
                        <TabIcon iconName='restaurant' iconColor='black'></TabIcon>
                    </View>
                    <Spacer space={15} horizontal/>
                    <View style={{justifyContent:'center'}}>
                        <Typography fontSize={20} bold>{item.name}</Typography>
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
                    <Header.Title title='저장된 장소'/>
                </Header.Group>
            </Header>
            <View style={{alignItems:"flex-end", paddingHorizontal:10, paddingVertical:20}}>
                <Typography fontSize={12} bold>총 {bookmarkList.length}개</Typography>
            </View>
            <View style={{flex:1}}>
                <FlatList<BookmarkInfo>
                    data={bookmarkList}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => renderItem(item)}
                />
            </View>
        </View>

    )

}