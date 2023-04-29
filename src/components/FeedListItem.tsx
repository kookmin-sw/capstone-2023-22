import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Button } from './Button';
import { Icon } from './Icons';
import { RemoteImage } from './RemoteImage';
import { Spacer } from './Spacer';
import { Typography } from './Typography';

export const FeedListItem:React.FC<{image:string, likeCount:number, writer:string, writerImg:string, comment:string, onPressFeed:()=>void}> = (props)=>{
    const {width} = useWindowDimensions();

    return (
        <Button onPress={props.onPressFeed}>
            <View>
                <View style={{flexDirection:'row', alignItems:'center', paddingVertical:10, paddingHorizontal:7}}>
                    <RemoteImage url={props.writerImg} width={30} height={30} style={{borderRadius: 30/2}}/>
                    <Spacer space={5} horizontal/>
                    <View style={{justifyContent: 'flex-start'}}>
                        <Typography fontSize={10} color={'gray'}>{`프리모바치오바치`}</Typography>
                        <Typography fontSize={12}>{props.writer}</Typography>
                    </View>
                </View>
                {/*<Spacer space={10}/>*/}
                <RemoteImage url={props.image} width={width} height={width}/>

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
                        <Typography fontSize={16}>{props.comment}</Typography>
                    </View>
                </View>
            </View>
        </Button>
    )
}