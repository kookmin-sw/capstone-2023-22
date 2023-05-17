import React, { useCallback } from 'react';
import { Pressable, useWindowDimensions, View } from 'react-native';
import { TypeBookmarkListDispatch, postBookmark } from '../actions/bookmark';
import { Button } from './Button';
import { Icon } from './Icons';
import { RemoteImage } from './RemoteImage';
import { Spacer } from './Spacer';
import { Typography } from './Typography';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';

// id:number, 
//     content:string, 
//     heartCount:number,
//     userName:string,
//     placeName:string,
//     updatedAt:string,
//     profileImage:string,
//     imageUrl:string
export const FeedListItem:React.FC<{feedId:number, content:string, heartCount:number, userName:string, placeId:number, placeName:string, updatedAt:string, profileImage:string, imageUrl:string, onPressFeed:()=>void}> = (props)=>{
    const {width} = useWindowDimensions();
    const dispatch = useDispatch<TypeBookmarkListDispatch>();

    const onPressBookmark = useCallback((placeId:number)=> {
        dispatch(postBookmark(placeId))
    }, []);
    return (
        <Button onPress={props.onPressFeed}>
            <View>
                <View style={{flexDirection:'row', alignItems:'center', paddingVertical:10, paddingHorizontal:7}}>
                    <RemoteImage url={props.profileImage} width={36} height={36} style={{borderRadius: 36/2}}/>
                    <Spacer space={5} horizontal/>
                    <View style={{justifyContent: 'flex-start'}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <Typography fontSize={11} color={'gray'}>{props.placeName}</Typography>
                            <Spacer space={10} horizontal />
                            {/* TODO: onPressBookmark에 placeId 추가 */}
                            <Pressable onPress={() => onPressBookmark(props.placeId)} style={{backgroundColor:'#764AF1', paddingHorizontal:6, paddingVertical:2, borderRadius:8, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <Icon name='star-outline' size={9} color='white'/>
                                <Spacer space={4} horizontal/>
                                <Typography fontSize={9} color={'white'}>{'장소추가'}</Typography>
                            </Pressable>
                        </View>
                        <Spacer space={3}/>
                        <Typography fontSize={12} bold>{props.userName}</Typography>
                    </View>
                </View>
                {/*<Spacer space={10}/>*/}
                <RemoteImage url={props.imageUrl} width={width} height={width}/>

                <View style={{paddingHorizontal:12, paddingVertical:12, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <Icon name='heart-outline' size={20} color='black'/>
                    <Typography fontSize={12} color='gray'>{dayjs(props.updatedAt).format("YYYY-MM-DD")}</Typography>
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