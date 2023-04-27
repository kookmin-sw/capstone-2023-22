import React, { useCallback } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { useRootNavigation } from '../navigations/RootStackNavigation';
import { Typography } from '../components/Typography';

export const PlaceSearchScreen:React.FC = ()=>{
    const rootNavigation = useRootNavigation();
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
                    <Header.Title title='장소 직접 찾기'></Header.Title>
                </Header.Group>
                <Header.Group>
                    <Spacer horizontal space={28}/>
                </Header.Group>
            </Header>
            <View style={{paddingHorizontal:10, backgroundColor:'white'}}>
                <View style={{paddingVertical:20, flexDirection:'row'}}>
                    <View style={{flex:1, alignSelf:'stretch', justifyContent:'center', backgroundColor:'#E4E4E4', borderRadius:4, padding:12}}>
                        <TextInput autoCorrect={false} autoCapitalize={'none'} onSubmitEditing={()=> {}} style={{fontSize:15}} placeholder='검색할 장소를 입력하세요'></TextInput>
                    </View>
                    <Spacer space={10} horizontal/>
                    <TouchableOpacity>
                        <View style={{justifyContent:'center', backgroundColor:'#764AF1', paddingHorizontal:20, paddingVertical:10, borderRadius:5, width:67, height:52}}>
                            <Typography color='white' fontSize={15}>검색</Typography>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{paddingVertical:20}}>
                    
                </View>
            </View>
            
        </View>
    )
}
