import React, { useEffect, useMemo, useCallback } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { FeedInfo } from '../@types/FeedInfo';
import { getMyFeedList, TypeUserDispatch } from '../actions/user';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import { RemoteImage } from '../components/RemoteImage';
import { Typography } from '../components/Typography';
import {  useHomeNavigation } from '../navigations/HomeStackNavigation';
import { useMyFeedList, useMyInfo } from '../selectors/user';
import { Spacer } from '../components/Spacer';
import { Icon } from '../components/Icons';

export const MyPageScreen:React.FC = ()=>{
    const {width} = useWindowDimensions();
    const homeNavigation = useHomeNavigation();


    const dispatch = useDispatch<TypeUserDispatch>();
    const data = useMyFeedList();
    const userInfo = useMyInfo();
    const photoSize = useMemo(()=> width/3, [width]);

    const onPressSetting = useCallback(()=>{
        homeNavigation.navigate('Setting');
    }, [])

    useEffect(()=>{
        dispatch(getMyFeedList());
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
                    <RemoteImage url={userInfo?.profileImage} width={70} height={70} style={{borderRadius: 70/2} }/>
                    <View style={{justifyContent:'center', marginLeft: 15}}>
                        <Typography color='black' bold fontSize={20}>{userInfo?.name}</Typography>
                        <Spacer space={3}/>
                        <Typography color='#9A9A9A' fontSize={15}>구글 계정 로그인 회원</Typography>
                    </View>     
                </View>
                <View style={{flexDirection:'row', paddingVertical:8, borderBottomWidth:0.5, borderBottomColor:'#AFAFAF'}}>
                    <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                        <Icon name='albums-outline' size={20} color='black'/>
                    </View>
                    <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                        <Icon name='heart-outline' size={20} color='black'/>
                    </View>
                </View>
                <FlatList<FeedInfo>
                    data={data}
                    numColumns={3}
                    renderItem={({item})=>{
                        return (
                            <Button onPress={()=>{}}>
                                <RemoteImage url={item.imageUrl} width={photoSize} height={photoSize} />
                            </Button>
                        )
                    }}
                />
            </View>
            
        </View>
    )
}