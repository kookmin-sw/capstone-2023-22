import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View, Platform, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { FeedInfo } from '../@types/FeedInfo';
import { getFeedList, TypeFeedListDispatch } from '../actions/feed';
import { Button } from '../components/Button';
import { FeedListItem } from '../components/FeedListItem';
import { Header } from '../components/Header/Header';
import { Icon } from '../components/Icons';
import { Spacer } from '../components/Spacer';
import { useHomeNavigation } from '../navigations/HomeStackNavigation';
import { useFeedCount, useHasNext, useTotalFeedList } from '../selectors/feed';


export const TotalFeedListScreen:React.FC = ()=>{
    const safeAreaInset = useSafeAreaInsets();
    const stackNavigation = useHomeNavigation();
    const dispatch = useDispatch<TypeFeedListDispatch>();
    const feedList = useTotalFeedList();
    const hasNext = useHasNext();
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        if(!refreshing) {
            setRefreshing(true);
            dispatch(getFeedList(true));
            setRefreshing(false);
        }
    }

    const onEndReached = () => {
        if (!loading) {
            if (feedList.length >= 5 && hasNext){
                setLoading(true);
                dispatch(getFeedList());
                setLoading(false);
            }
        }
    }
    useEffect(()=>{
        dispatch(getFeedList());
    },[]);

    const onPressFeed = useCallback((item:FeedInfo)=>{
        stackNavigation.navigate('PostDetail', {item: item, type:'feed'});
    }, [])

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
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
                            feedId={item.id}
                            content={item.content}
                            heartCount={item.heartCount}
                            userName={item.userName}
                            placeId={item.placeId}
                            placeName={item.placeName}
                            updatedAt={item.updatedAt}
                            profileImage={item.profileImage}
                            imageUrl={item.imageUrl}
                            isHeart={item.isHeart}
                            type='feed'
                            onPressFeed={() => onPressFeed(item)}
                        />
                    )
                }}
                ItemSeparatorComponent={()=>(
                    <Spacer space={24}/>
                )}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.6}
                ListFooterComponent={loading && <ActivityIndicator />}
                onRefresh={onRefresh}
                refreshing={refreshing}
            />
            <View style={{position:'absolute', right:24, bottom:10 + safeAreaInset.bottom, ...Platform.select({
                        ios: {
                        shadowColor: 'black',shadowOffset: {
                            width: 5,
                            height: 10,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3,
                        },
                        android: {
                            elevation: 10,
                        },
                        })}}>
                <Button onPress={()=>{console.log("Button clicked"); stackNavigation.navigate('PlaceSearch');}}>
                    <View style={{width:78, height:78, borderRadius:78/2, alignItems:'center', justifyContent:'center', backgroundColor:"#764AF1"}}>
                        <Icon name='albums-outline' color='white' size={30}/>
                    </View>
                </Button>
            </View>
        </View>
    )
}
