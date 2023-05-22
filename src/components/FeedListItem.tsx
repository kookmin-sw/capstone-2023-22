import React, { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, useWindowDimensions, View } from 'react-native';
import { Platform } from 'react-native';
import { TypeBookmarkListDispatch, postBookmark } from '../actions/bookmark';
import { Button } from './Button';
import { Icon } from './Icons';
import { RemoteImage } from './RemoteImage';
import { Spacer } from './Spacer';
import { Typography } from './Typography';
import { useDispatch } from 'react-redux';
import { deleteFavoriteFeed, favoriteFeed, TypeFeedListDispatch } from '../actions/feed';

// id:number, 
//     content:string, 
//     heartCount:number,
//     userName:string,
//     placeName:string,
//     updatedAt:string,
//     profileImage:string,
//     imageUrl:string
export const FeedListItem:React.FC<{feedId:number, content:string, heartCount:number, userName:string, placeId:number, placeName:string, updatedAt:string, profileImage:string, imageUrl:string, isHeart:boolean, onPressFeed:()=>void, type:string}> = (props)=>{
    const {width} = useWindowDimensions();
    const dispatch = useDispatch<TypeBookmarkListDispatch>();
    const dispatchFeed = useDispatch<TypeFeedListDispatch>();
    const [isLiked, setIsLiked] = useState(false);

    const onPressBookmark = useCallback((placeId:number)=> {
        dispatch(postBookmark(placeId))
    }, []);
    
    const onPressLike = useCallback(()=> {
        setIsLiked(true);
        dispatchFeed(favoriteFeed(props.feedId, props.type));
    }, []);

    const onPressUnLike = useCallback(()=> {
        setIsLiked(false);
        dispatchFeed(deleteFavoriteFeed(props.feedId, props.type));
    }, []);

    useEffect(()=>{
        if (props.isHeart === true) setIsLiked(true);
        else setIsLiked(false);
    },[])
    return (
        <Button onPress={props.onPressFeed}>
            <View>
                <View style={{flexDirection:'row', alignItems:'center', paddingVertical:10, paddingHorizontal:7}}>
                    <View style={{...Platform.select({
                        ios: {
                        shadowColor: 'black',shadowOffset: {
                            width: 1,
                            height: 1,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3,
                        },
                        android: {
                            elevation: 1,
                        },
                        })}}>
                        <RemoteImage url={props.profileImage} width={40} height={40} style={{borderRadius: 40/2}}/>
                    </View>
                    <Spacer space={8} horizontal/>
                    <View style={{justifyContent: 'flex-start'}}>
                        <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
                            <View style={{alignItems:'center', justifyContent:'center'}}>
                                <Typography fontSize={13} color={'gray'}>{props.placeName}</Typography>
                            </View>
                            <Spacer space={10} horizontal />
                            <View style={{...Platform.select({
                                    ios: {
                                    shadowColor: 'black',shadowOffset: {
                                    width: 1,
                                    height: 1,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3,
                                    },
                                    android: {
                                    elevation: 1,
                                    },
                                    })}}>
                                <Pressable hitSlop={{left:5, right:5, top:5}} onPress={() => onPressBookmark(props.placeId)} style={{backgroundColor:'#764AF1', paddingHorizontal:6, paddingVertical:1.8, borderRadius:8, flexDirection:'row', justifyContent:'center'}}>
                                    <View style={{justifyContent:'center'}}>
                                        <Icon name='star-outline' size={8} color='white'/>
                                    </View>
                                <Spacer space={4} horizontal/>
                                <View>
                                    <Typography fontSize={10} color={'white'}>{'장소추가'}</Typography>
                                </View>
                                </Pressable>
                            </View>
                        </View>
                        <Spacer space={3}/>
                        <Typography fontSize={13} bold>{props.userName}</Typography>
                    </View>
                </View>
                <View style={{...Platform.select({
                        ios: {
                        shadowColor: 'black',shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3,
                        },
                        android: {
                            elevation: 2,
                        },
                        })}}>
                    <RemoteImage url={props.imageUrl} width={width} height={width}/>
                </View>
                {/*<Spacer space={10}/>*/}

                <View style={{paddingHorizontal:12, paddingVertical:12, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <Pressable hitSlop={{left:5, right:5, top:5, bottom:5}} style={{...Platform.select({
                        ios: {
                        shadowColor: 'black',shadowOffset: {
                            width: 1,
                            height: 1,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3,
                        },
                        android: {
                            elevation: 1,
                        },
                        })}} onPress={() => { props.isHeart ? onPressUnLike(): onPressLike()}}>
                        <Icon name={props.isHeart ? 'heart' : 'heart-outline'} size={20} color={props.isHeart ? 'red' : 'black'}/>
                    </Pressable>
                    <Typography fontSize={12} color='gray'>{props.updatedAt}</Typography>
                </View>
                <View style={{paddingHorizontal:12 }}>
                    <Typography fontSize={12} color='black'>좋아요 {props.heartCount}개</Typography>
                    <Spacer space={10}/>
                    <View style={{flexDirection:'row', alignItems:'center',}}>
                        {/*<Typography fontSize={12}>{props.writer}</Typography>*/}
                        {/*<Spacer space={8} horizontal/>*/}
                        <Typography fontSize={16}>{props.content}</Typography>
                    </View>
                </View>
            </View>
        </Button>
    )
}