import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { FlatList, Pressable, useWindowDimensions, View } from 'react-native';
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { FeedInfo } from '../@types/FeedInfo';
import { getUserInfo, TypeUserDispatch } from '../actions/user';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import { RemoteImage } from '../components/RemoteImage';
import { Typography } from '../components/Typography';
import {  useHomeNavigation } from '../navigations/HomeStackNavigation';
import { useMyInfo } from '../selectors/user';
import { Spacer } from '../components/Spacer';
import { Icon } from '../components/Icons';
import { useMyFavoriteList, useMyFeedList } from '../selectors/feed';
import { getMyFavoriteList, getMyFeedList } from '../actions/feed';

export const MyPageScreen:React.FC = ()=>{
    const [isFocusedOnMyFeedList, setIsFocusedOnMyFeedList] = useState(true);
    const {width} = useWindowDimensions();
    const homeNavigation = useHomeNavigation();

    const dispatch = useDispatch<TypeUserDispatch>();
    const myFeeds = useMyFeedList();
    const myFavorites = useMyFavoriteList();
    const userInfo = useMyInfo();
    const photoSize = useMemo(()=> width/3, [width]);

    const onPressSetting = useCallback(()=>{
        homeNavigation.navigate('Setting');
    }, [])
    const onPressMyListOne = useCallback((item:FeedInfo)=>{
        homeNavigation.navigate('PostDetail', {item:item, type:'mylist'});
    }, [])

    const onPressMyFavoriteListOne = useCallback((item:FeedInfo)=>{
        homeNavigation.navigate('PostDetail', {item:item, type:'myfavorite'});
    }, [])


    useEffect(()=>{
        dispatch(getUserInfo())
        dispatch(getMyFeedList());
        dispatch(getMyFavoriteList());
    }, [])

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Header>
                <Header.Group>
                    <Header.Title title='마이페이지'></Header.Title>
                </Header.Group>
                <Header.Icon iconName='settings' onPress={onPressSetting}/>
            </Header>
            <View>
                <View style={{flexDirection:'row', paddingHorizontal:10, paddingVertical:25, borderBottomWidth:0.5, borderBottomColor:'#AFAFAF' }}>
                    {/* <View style={{width:70, height:70, borderRadius:70/2, backgroundColor:'black'}}/> */}
                    <View style={{...Platform.select({
                        ios: {
                        shadowColor: 'black',shadowOffset: {
                            width: 3,
                            height: 7,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3,
                        },
                        android: {
                            elevation: 10,
                        },
                        })}}>
                        <RemoteImage url={userInfo?.profileImage} width={70} height={70} style={{borderRadius: 70/2} }/>
                    </View>
                    <View style={{justifyContent:'center', marginLeft: 15}}>
                        <Typography color='black' bold fontSize={20}>{userInfo?.name}</Typography>
                        <Spacer space={3}/>
                        <Typography color='#9A9A9A' fontSize={15}>구글 계정 로그인 회원</Typography>
                    </View>     
                </View>
                <View style={{flexDirection:'row', paddingVertical:8, borderBottomWidth:0.5, borderBottomColor:'#AFAFAF'}}>
                    <Pressable onPress={() => {
                        setIsFocusedOnMyFeedList(true);
                        dispatch(getMyFeedList());
                    }} style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                        <Icon name='albums-outline' size={20} color='black'/>
                    </Pressable>
                    <Pressable onPress={() => 
                    {
                        setIsFocusedOnMyFeedList(false);         
                        dispatch(getMyFavoriteList());
                    }} style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                        <Icon name='heart-outline' size={20} color='black'/>
                    </Pressable>
                </View>
                {
                    isFocusedOnMyFeedList ? 
                    <FlatList<FeedInfo>
                    data={myFeeds}
                    numColumns={3}
                    renderItem={({item})=>{
                        return (
                            <Button onPress={()=>{onPressMyListOne(item)}}>
                                <RemoteImage url={item.imageUrl} width={photoSize} height={photoSize} />
                            </Button>
                        )
                    }}
                    /> :
                    <FlatList<FeedInfo>
                    data={myFavorites}
                    numColumns={3}
                    renderItem={({item})=>{
                        return (
                            <Button onPress={()=>{onPressMyFavoriteListOne(item)}}>
                                <RemoteImage url={item.imageUrl} width={photoSize} height={photoSize} />
                            </Button>
                        )
                    }}
                    />
                }
            </View>
        </View>
    )
}