
import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { FeedListItem } from '../components/FeedListItem';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { useHomeNavigation, useHomeRoute } from '../navigations/HomeStackNavigation';
import { useSelectedFeed, useSelectedMyFavoriteList, useSelectedMyFeedList } from '../selectors/feed';

export const PostDetailScreen:React.FC = () => {
    const homeNavigation = useHomeNavigation();
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
    },[])
    const feed = selectFeed(params.type);
    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Group>
                    <Header.Icon iconName='chevron-back' onPress={onPressBack}/>
                </Header.Group>
                <Header.Group>
                    <Header.Title title='게시물 보기'></Header.Title>

                </Header.Group>
                <Header.Group>
                    <Spacer horizontal space={28}/>
                </Header.Group>
            </Header>

            <FeedListItem
                feedId={feed.id}
                content={feed.content}
                heartCount={feed.heartCount}
                userName={feed.userName}
                placeName={feed.placeName}
                updatedAt={feed.updatedAt}
                profileImage={feed.profileImage}
                imageUrl={feed.imageUrl}
                isHeart={feed.isHeart}
                placeId={feed.placeId}
                onPressFeed={()=>{
                    console.log('onPressFeed')
                }}
                type={params.type}
            />
        </View>
    )
}