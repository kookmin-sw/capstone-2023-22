import React, { useCallback, useState } from 'react';
import { View, useWindowDimensions, Pressable, Keyboard, ScrollView } from 'react-native';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { useHomeNavigation, useHomeRoute } from '../navigations/HomeStackNavigation';
import { Typography } from '../components/Typography';
import { RemoteImage } from '../components/RemoteImage';
import { useMyInfo } from '../selectors/user';
import { MultiLineInput } from '../components/MultiLineInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const WritePostScreen:React.FC = ()=>{
    const {width} = useWindowDimensions();
    const {params} = useHomeRoute();
    const HomeNavigation = useHomeNavigation();
    const userInfo = useMyInfo();
    const [inputMessage, setInputMessage] = useState('');


    const onPressBack = useCallback(()=>{
        HomeNavigation.goBack();
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
                            <RemoteImage url={userInfo?.profileImage} width={30} height={30} style={{borderRadius: 30/2}}/>
                            <Spacer space={5} horizontal/>
                            <View style={{justifyContent: 'flex-start'}}>
                                <Typography fontSize={10} color={'gray'}>{`프리모바치오바치`}</Typography>
                                <Typography fontSize={12}>{userInfo?.name}</Typography>
                            </View>
                        </View>
                        <RemoteImage url={params?.uri} width={width} height={width}/>
                    </Pressable>

                    <View style={{paddingVertical:10, paddingHorizontal:10}}>
                        <MultiLineInput
                                value={inputMessage}
                                onChangeText={setInputMessage}
                                onSubmitEditing={()=>{}}
                                placeholder='영감이 떠오르는 한마디를 작성해주세요!...'
                                height={100}
                                fontSize={16}
                            />
                        <Spacer space={10} />
                        <Pressable style={{alignSelf:'flex-end', alignItems:'center', justifyContent:'center',paddingHorizontal:20,paddingVertical:10, width:72, height:37, borderRadius:5, backgroundColor:'#764AF1'}}>
                            <Typography fontSize={15} color='white'>게시</Typography>
                        </Pressable>
                    </View>
                </ScrollView>   
            </KeyboardAwareScrollView>
        </View>
        
    )
}
