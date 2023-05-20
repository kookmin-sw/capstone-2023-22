
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { FeedListItem } from '../components/FeedListItem';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { useHomeNavigation, useHomeRoute } from '../navigations/HomeStackNavigation';

export const PostDetailScreen:React.FC = () => {
    const homeNavigation = useHomeNavigation();
    const {params} = useHomeRoute<'PostDetail'>();
    const onPressBack = useCallback(()=>{
        homeNavigation.goBack();
    }, [])
    
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
                feedId={params.item.id}
                content={params.item.content}
                heartCount={params.item.heartCount}
                userName={params.item.userName}
                placeName={params.item.placeName}
                updatedAt={params.item.updatedAt}
                profileImage={params.item.profileImage}
                imageUrl={params.item.imageUrl}
                isHeart={params.item.isHeart}
                placeId={params.item.placeId}
                onPressFeed={()=>{
                    console.log('onPressFeed')
                }}
                type={params.type}
            />
        </View>
    )
}