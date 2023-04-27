import React, { useCallback } from 'react';
import { View } from 'react-native';
import { FeedListItem } from '../components/FeedListItem';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { useRootNavigation } from '../navigations/RootStackNavigation';

export const PostDetailScreen:React.FC = ()=>{
    const rootNavigation = useRootNavigation();

    const onPressBack = useCallback(()=>{
        rootNavigation.goBack();
    }, [])
    const item = {
        id:'ID_01',
        content:'CONTENT_01',
        writer:'WRITER_01',
        writerImg:'https://docs.expo.dev/static/images/tutorial/background-image.png',
        likeCount:10,
        imageUrl:'https://docs.expo.dev/static/images/tutorial/background-image.png',
    }
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
                image={item.imageUrl}
                comment={item.content}
                likeCount={item.likeCount}
                writer={item.writer}
                writerImg={item.writerImg}
                onPressFeed={()=>{
                    console.log('onPressFeed')
                }}
            />
        </View>
    )
}