
import React, { useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteFeed, TypeFeedListDispatch } from '../actions/feed';
import { FeedListItem } from '../components/FeedListItem';
import { Header } from '../components/Header/Header';
import { Icon } from '../components/Icons';
import { ModifyModal } from '../components/ModifyModal';
import { Spacer } from '../components/Spacer';
import { useHomeNavigation, useHomeRoute } from '../navigations/HomeStackNavigation';
import { useSelectedFeed, useSelectedMyFavoriteList, useSelectedMyFeedList, useSelectedPlaceFeed } from '../selectors/feed';

export const PostDetailScreen:React.FC = () => {
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const homeNavigation = useHomeNavigation();
    const dispatch = useDispatch<TypeFeedListDispatch>();
    const {params} = useHomeRoute<'PostDetail'>();
    const onPressBack = useCallback(()=>{
        homeNavigation.goBack();

    }, [])
    const selectFeed = useCallback((feedtype:string) => {
        if (feedtype === 'feed'){
            return useSelectedFeed(params.item.id);
        }
        if (feedtype === 'mylist'){
            return useSelectedMyFeedList(params.item.id);
        }
        if (feedtype === 'myfavorite'){
            return useSelectedMyFavoriteList(params.item.id);
        }
        if (feedtype === 'placeDetail'){
            return useSelectedPlaceFeed(params.item.id);
        }
    },[])
    const feed = selectFeed(params.type);
    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Header>
                <Header.Group>
                    <Header.Icon iconName='chevron-back' onPress={onPressBack}/>
                </Header.Group>
                <Header.Group>
                    <Header.Title title='게시물 보기'></Header.Title>

                </Header.Group>
                <Header.Group>
                    { params.type === 'mylist' ?
                    <View>
                        <Spacer horizontal space={21}/>
                        <Pressable onPress={() => setDeleteModalVisible(true)}>
                            <Icon name='trash-outline' size={20} color='white'/>
                        </Pressable>
                    </View>
                         : 
                        <Spacer horizontal space={29}/>
                    }
                </Header.Group>
            </Header>

            <FeedListItem
                feedId={feed.id ?? params.item.id}
                content={feed.content ?? params.item.content}
                heartCount={feed.heartCount ?? params.item.heartCount}
                userName={feed.userName ?? params.item.userName}
                placeName={feed.placeName ?? params.item.placeName}
                updatedAt={feed.updatedAt ?? params.item.updatedAt}
                profileImage={feed.profileImage ?? params.item.profileImage}
                imageUrl={feed.imageUrl ?? params.item.imageUrl}
                isHeart={feed.isHeart ?? params.item.isHeart}
                placeId={feed.placeId ?? params.item.placeId}
                onPressFeed={()=>{
                    console.log('onPressFeed')
                }}
                type={params.type}
            />

            <ModifyModal
                modalVisible={deleteModalVisible}
                setModalVisible={()=>setDeleteModalVisible(!deleteModalVisible)} 
                onPressAction={() => {
                    dispatch(deleteFeed(feed?.id));
                    setDeleteModalVisible(false);
                    homeNavigation.goBack();
                }} 
                onPressClose={()=>{
                    setDeleteModalVisible(false);
                }}>
                    <View style={{alignItems:'center'}}>
                        <Text style={{fontSize:17, paddingVertical: 5, marginTop:18}}>피드를 삭제하시겠습니까?</Text>
                    </View>
                </ModifyModal>
        </View>
    )
}