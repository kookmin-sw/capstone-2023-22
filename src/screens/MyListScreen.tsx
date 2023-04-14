import React from 'react';
import {FlatList, View} from 'react-native';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { TabIcon } from '../components/TabIcon';
import { Typography } from '../components/Typography';
import { useRootNavigation } from '../navigations/RootStackNavigation';
import { PlaceInfo } from '../@types/PlaceInfo';
export const MyListScreen:React.FC = () => {
    const rootNavigation = useRootNavigation();
    const onPress = () => {
        console.log('clicked');};
    const renderItem = ({item}:any) => {
        return (
            <View style={{paddingHorizontal:10, paddingVertical:10}}>
                <Button onPress={onPress}>
                <View style={{flexDirection:'row'}}>
                    <View style={{backgroundColor:'#EDCAE9', width: 60, height:60, alignItems: 'center', justifyContent:'center', borderRadius:60/2}}>
                        <TabIcon iconName='restaurant' iconColor='black'></TabIcon>
                    </View>
                    <Spacer space={15} horizontal/>
                    <View style={{justifyContent:'center'}}>
                        <Typography fontSize={20} bold>{item.name}</Typography>
                        <Spacer space={6}/>
                        <Typography fontSize={13} >{item.address}</Typography>
                    </View>
                </View>
                </Button>
            </View>
            
        )
    }
    const data = [
        {
            id:'ID_01',
            type:'restaurants',
            name:'용용선생',
            address:'서울특별시 강남구'
        },
        {
            id:'ID_02',
            type:'restaurants',
            name:'용용선생',
            address:'서울특별시 강남구'
        },
        {
            id:'ID_03',
            type:'restaurants',
            name:'용용선생',
            address:'서울특별시 강남구'
        },
        {
            id:'ID_04',
            type:'restaurants',
            name:'용용선생',
            address:'서울특별시 강남구'
        }
    ]
    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Header>
                <Header.Group>
                    <Header.Title title='저장된 장소'/>
                </Header.Group>
            </Header>
            <View style={{alignItems:"flex-end", paddingHorizontal:10, paddingVertical:20}}>
                <Typography fontSize={12} bold>총 4개</Typography>
            </View>
            <View style={{flex:1}}>
                <FlatList<PlaceInfo>
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            </View>
        </View>

    )

}