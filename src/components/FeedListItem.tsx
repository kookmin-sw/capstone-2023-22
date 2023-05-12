import React, { useCallback } from 'react';
import { Pressable, useWindowDimensions, View } from 'react-native';
import { TypeBookmarkListDispatch, postBookmark } from '../actions/bookmark';
import { Button } from './Button';
import { Icon } from './Icons';
import { RemoteImage } from './RemoteImage';
import { Spacer } from './Spacer';
import { Typography } from './Typography';
import { useDispatch } from 'react-redux';

// id:number, 
//     content:string, 
//     userName:string,
//     placeName:string,
//     createdAt:string, 
//     imageUrl:string

export const FeedListItem:React.FC<{imageUrl:string, feedId:number, placeName:string ,writer:string, writerImg:string, content:string, onPressFeed:()=>void}> = (props)=>{
    const {width} = useWindowDimensions();
    const dispatch = useDispatch<TypeBookmarkListDispatch>();

    const onPressBookmark = useCallback(()=> {
        dispatch(postBookmark(325016))
    }, []);
    return (
        <Button onPress={props.onPressFeed}>
            <View>
                <View style={{flexDirection:'row', alignItems:'center', paddingVertical:10, paddingHorizontal:7}}>
                    <RemoteImage url={props.writerImg} width={30} height={30} style={{borderRadius: 30/2}}/>
                    <Spacer space={5} horizontal/>
                    <View style={{justifyContent: 'flex-start'}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Typography fontSize={10} color={'gray'}>{props.placeName}</Typography>
                            <Spacer space={10} horizontal />
                            <Pressable onPress={() => onPressBookmark()} style={{backgroundColor:'#764AF1', paddingHorizontal:8, paddingVertical:3, borderRadius:8, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <Icon name='star-outline' size={10} color='white'/>
                                <Spacer space={4} horizontal/>
                                <Typography fontSize={10} color={'white'}>{'장소추가'}</Typography>
                            </Pressable>
                        </View>
                        <Typography fontSize={12}>{props.writer}</Typography>
                    </View>
                </View>
                {/*<Spacer space={10}/>*/}
                <RemoteImage url={props.imageUrl} width={width} height={width}/>

                <View style={{paddingHorizontal:12,paddingVertical:12,}}>
                    <View style={{flexDirection:'row', alignItems:'center',}}>
                        <Icon name='heart-outline' size={20} color='black'/>
                        <Spacer space={4} horizontal/>
                    </View>
                </View>
                <View style={{paddingHorizontal:12 }}>
                    {/*<Typography fontSize={16} color='black'>좋아요 {props.likeCount}개</Typography>*/}
                    {/*<Spacer space={4}/>*/}
                    <View style={{flexDirection:'row', alignItems:'center',}}>
                        {/*<Typography fontSize={12}>{props.writer}</Typography>*/}
                        {/*<Spacer space={8} horizontal/>*/}
                        <Typography fontSize={16}>{}</Typography>
                    </View>
                </View>
            </View>
        </Button>
    )
}