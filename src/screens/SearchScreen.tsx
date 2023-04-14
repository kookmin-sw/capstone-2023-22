import React, { useCallback, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { FeedInfo } from '../@types/FeedInfo';
import { getFeedList, TypeFeedListDispatch } from '../actions/feed';
import { FeedListItem } from '../components/FeedListItem';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { useRootNavigation } from '../navigations/RootStackNavigation';
import { useTotalFeedList } from '../selectors/feed';
import { SingleLineInput } from '../components/SingleLineInput';
import { Typography } from '../components/Typography';
import { Icon } from '../components/Icons';

export const SearchScreen:React.FC = ()=>{
    const rootNavigation = useRootNavigation<'BottomTab'>();

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Header>
                <Header.Group>
                    <Header.Title title='검색'></Header.Title>
                </Header.Group>
            </Header>
            <View style={{paddingHorizontal:10, backgroundColor:'white'}}>
                <View style={{paddingVertical:20}}>
                    <SingleLineInput placeholder='지금 궁금한 장소는?' fontSize={15}/>
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
        </View>
    )
}