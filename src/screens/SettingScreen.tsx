import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { FlatList, useWindowDimensions, View, Text, TouchableOpacity, Modal, TextInput, Pressable, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { getMyFeedList, TypeUserDispatch, updateUserNickname } from '../actions/user';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import { ModifyModal } from '../components/ModifyModal';
import { RemoteImage } from '../components/RemoteImage';
import { Spacer } from '../components/Spacer';
import { Typography } from '../components/Typography';
import {  useRootNavigation } from '../navigations/RootStackNavigation';
import { useMyFeedList } from '../selectors/user';

export const SettingScreen:React.FC = ()=>{
    const [modifyNicknameModalVisible, setModifyNicknameModalVisible] = useState(false);
    const [modifyBirthModalVisible, setModifyBirthModalVisible] = useState(false);
    const [nickname, setNickname] = useState("");
    const [birth, setBirth] = useState("");
    const rootNavigation = useRootNavigation();
    const dispatch = useDispatch<TypeUserDispatch>();
    const onPressBack = useCallback(()=>{
        rootNavigation.goBack();
    }, [])

    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Header>
                <Header.Group>
                    <Header.Icon iconName='chevron-back' onPress={onPressBack}/>
                </Header.Group>
                <Header.Group>
                    <Header.Title title='설정'></Header.Title>
                </Header.Group>
                <Header.Group>
                    <Spacer horizontal space={28}/>
                </Header.Group>
            </Header>
            <View style={{paddingHorizontal:10}}>
                <View style={{marginTop:20}}>
                    <View style={{position:'absolute', backgroundColor:'white', paddingHorizontal:70, zIndex:1, alignSelf:'center'}}>
                        <Text style={{fontSize:22, color:'black', fontWeight:'bold'}}>개인정보설정</Text>
                    </View>
                    <View style={{paddingVertical:50, paddingHorizontal:20, borderRadius:10, borderColor:'#CACACA', borderWidth:0.5, marginTop:10, position:'relative'}}>
                        <View style={{}}>
                            <TouchableOpacity onPress={() => {setModifyNicknameModalVisible(true)}}>
                                <Typography fontSize={18} color='black'>닉네임 수정</Typography>
                            </TouchableOpacity>
                            <Spacer space={20}/>
                            <TouchableOpacity onPress={() => {setModifyBirthModalVisible(true)}}>
                                <Typography fontSize={18} color='black'>생년월일 수정</Typography>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{marginTop:20}}>
                    <View style={{position:'absolute', backgroundColor:'white', paddingHorizontal:70, zIndex:1, alignSelf:'center'}}>
                        <Text style={{fontSize:22, color:'black', fontWeight:'bold'}}>안내</Text>
                    </View>
                    <View style={{paddingVertical:50, paddingHorizontal:20, borderRadius:10, borderColor:'#CACACA', borderWidth:0.5, marginTop:10, position:'relative'}}>
                        <View style={{}}>
                            <Typography fontSize={18} color='black'>공지사항</Typography>
                            <Spacer space={20}/>
                            <Typography fontSize={18} color='black'>FAQ</Typography>
                            <Spacer space={20}/>
                            <Typography fontSize={18} color='black'>문의</Typography>
                        </View>
                    </View>
                    <View>
                        <View style={{paddingVertical:80, alignItems:'center', justifyContent:'center'}}>
                            <Typography fontSize={17} color='#9A9A9A'>앱 버전 1.0.0</Typography>
                        </View>
                        <View style={{alignItems:'flex-end'}}>
                            <Text style={{fontSize:17, color:'#9A9A9A', textDecorationLine:'underline'}}>회원탈퇴</Text>
                        </View>
                    </View>
                </View>
                <ModifyModal value={nickname} modalVisible={modifyNicknameModalVisible} onPressAction={() => {setModifyNicknameModalVisible(false)}} onPressClose={()=>{setModifyNicknameModalVisible(false)}} setModalVisible={()=>setModifyNicknameModalVisible(!modifyNicknameModalVisible)} onChangeValue={setNickname}>
                    <Text style={{fontSize:17, paddingVertical: 5, marginTop:18}}>닉네임 수정</Text>
                    <Text style={{fontSize:13}}>수정할 닉네임을 입력하세요.</Text>
                    <Text style={{fontSize:13}}>닉네임은 2글자 이상이어야 합니다.</Text>
                </ModifyModal>
                <ModifyModal value={birth} modalVisible={modifyBirthModalVisible} onPressAction={() => {setModifyBirthModalVisible(false)}} onPressClose={()=>{setModifyBirthModalVisible(false)}} setModalVisible={()=>setModifyBirthModalVisible(!modifyBirthModalVisible)} onChangeValue={setBirth}>
                    <Text style={{fontSize:17, paddingVertical: 5, marginTop:18}}>생년월일 수정</Text>
                    <Text style={{fontSize:13}}>생년월일을 수정합니다.</Text>
                </ModifyModal>
            </View>
        </View>
    )
}