import React, { useCallback, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { FeedInfo } from '../@types/FeedInfo';
import { getFeedList, TypeFeedListDispatch } from '../actions/feed';
import { Button } from '../components/Button';
import { FeedListItem } from '../components/FeedListItem';
import { Header } from '../components/Header/Header';
import { Icon } from '../components/Icons';
import { Spacer } from '../components/Spacer';
import { useRootNavigation } from '../navigations/RootStackNavigation';
import { useTotalFeedList } from '../selectors/feed';

export const TotalFeedListScreen:React.FC = ()=>{
    const safeAreaInset = useSafeAreaInsets();
    const stackNavigation = useRootNavigation();
    const dispatch = useDispatch<TypeFeedListDispatch>();
    const feedList = useTotalFeedList();

    useEffect(()=>{
        dispatch(getFeedList());
    }, [])

    const onPressFeed = useCallback(()=>{
        stackNavigation.navigate('PostDetail');
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
            <View style={{position:'absolute', right:24, bottom:10 + safeAreaInset.bottom}}>
                <Button onPress={()=>{console.log("Button clicked"); stackNavigation.navigate('PlaceSearch');}}>
                    <View style={{width:78, height:78, borderRadius:78/2, alignItems:'center', justifyContent:'center', backgroundColor:"#764AF1"}}>
                        <Icon name='albums-outline' color='white' size={30}/>
                    </View>
                </Button>
            </View>
        </View>
    )
}