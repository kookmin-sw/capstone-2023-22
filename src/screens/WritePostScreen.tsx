import React, { useCallback, useState } from 'react';
import { View, useWindowDimensions, Pressable, Keyboard, ScrollView, Platform } from 'react-native';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { useHomeNavigation, useHomeRoute } from '../navigations/HomeStackNavigation';
import { Typography } from '../components/Typography';
import { RemoteImage } from '../components/RemoteImage';
import { useMyInfo } from '../selectors/user';
import { MultiLineInput } from '../components/MultiLineInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux';
import { createFeed, TypeFeedListDispatch } from '../actions/feed';

export const WritePostScreen:React.FC = ()=>{
    const {width} = useWindowDimensions();
    const {params} = useHomeRoute<'WritePost'>();
    const HomeNavigation = useHomeNavigation<'WritePost'>();
    const userInfo = useMyInfo();
    const [inputMessage, setInputMessage] = useState('');
    const dispatch = useDispatch<TypeFeedListDispatch>();



    const onPressBack = useCallback(()=>{
        HomeNavigation.goBack();
    }, [])

    const onPressPost = useCallback((input:string) =>{
        dispatch(createFeed({content:input, placeName:params.placeName, imageUrl:params.image}));
        HomeNavigation.popToTop('Space');
        
    }, [])
    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Header>
                <Header.Group>
                    <Header.Icon iconName='chevron-back' onPress={onPressBack}/>
                </Header.Group>
                <Header.Group>
                    <Header.Title title='작성'></Header.Title>
                </Header.Group>
                <Header.Group>
                    <Spacer horizontal space={28}/>
                </Header.Group>
            </Header>
            <KeyboardAwareScrollView>
                <ScrollView>
                    <Pressable style={{backgroundColor:'white'}} onPress={Keyboard.dismiss}>
                        <View style={{flexDirection:'row', alignItems:'center', paddingVertical:10, paddingHorizontal:7}}>
                            <View style={{...Platform.select({
                        ios: {
                        shadowColor: 'black',shadowOffset: {
                            width: 3,
                            height: 3,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3,
                        },
                        android: {
                            elevation: 10,
                        }
                        })}}>
                                <RemoteImage url={userInfo?.profileImage} width={30} height={30} style={{borderRadius: 30/2}}/>
                            </View>
                            <Spacer space={5} horizontal/>
                            <View style={{justifyContent: 'flex-start'}}>
                                <Typography fontSize={10} color={'gray'}>{params.placeName}</Typography>
                                <Typography fontSize={12}>{userInfo?.name}</Typography>
                            </View>
                        </View>
                        <View style={{...Platform.select({
                        ios: {
                        shadowColor: 'black',shadowOffset: {
                            width: 3,
                            height: 3,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3,
                        },
                        android: {
                            elevation: 10,
                        }
                        })}}>
                            <RemoteImage url={params.image} width={width} height={width}/>
                        </View>
                    </Pressable>

                    <View style={{paddingVertical:10, paddingHorizontal:10}}>
                        <View style={{...Platform.select({
                        ios: {
                        shadowColor: 'black',shadowOffset: {
                            width: 3,
                            height: 3,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3,
                        },
                        android: {
                            elevation: 10,
                        }
                        })}}>

                            <MultiLineInput
                                value={inputMessage}
                                onChangeText={setInputMessage}
                                onSubmitEditing={() => onPressPost(inputMessage)}
                                placeholder='영감이 떠오르는 한마디를 작성해주세요!...'
                                height={100}
                                fontSize={16}
                                
                            />
                        </View>
                        <Spacer space={10} />
                        <Pressable onPress={() => onPressPost(inputMessage)} style={{alignSelf:'flex-end', alignItems:'center', justifyContent:'center',paddingHorizontal:20,paddingVertical:10, width:72, height:37, borderRadius:5, backgroundColor:'#764AF1',...Platform.select({
                        ios: {
                        shadowColor: 'black',shadowOffset: {
                            width: 3,
                            height: 3,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3,
                        },
                        android: {
                            elevation: 10,
                        }
                        }) }}>
                            <Typography fontSize={15} color='white'>게시</Typography>
                        </Pressable>
                    </View>
                </ScrollView>   
            </KeyboardAwareScrollView>
        </View>
        
    )
}
