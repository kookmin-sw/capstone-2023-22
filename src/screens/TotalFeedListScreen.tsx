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

export const TotalFeedListScreen:React.FC = ()=>{
    const rootNavigation = useRootNavigation<'BottomTab'>();
    const dispatch = useDispatch<TypeFeedListDispatch>();
    const feedList = useTotalFeedList();

    useEffect(()=>{
        dispatch(getFeedList());
    }, [])

    const onPressFeed = useCallback(()=>{
        rootNavigation.navigate('PostDetail');
    }, [])

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Group>
                    <Header.Title title='새소행 공간'></Header.Title>
                </Header.Group>
            </Header>
            <FlatList<FeedInfo>
                data={feedList}
                renderItem={({item})=>{
                    return (
                        <FeedListItem
                            image={item.imageUrl}
                            comment={item.content}
                            likeCount={item.likeCount}
                            writer={item.writer}
                            writerImg={item.writerImg}
                            onPressFeed={onPressFeed}
                        />
                    )
                }}
                ItemSeparatorComponent={()=>(
                    <Spacer space={24}/>
                )}
            />
        </View>
    )
}