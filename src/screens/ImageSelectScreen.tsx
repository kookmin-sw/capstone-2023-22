import React, { useCallback, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Pressable, View } from 'react-native';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { useHomeNavigation } from '../navigations/HomeStackNavigation';
import { Typography } from '../components/Typography';

export const ImageSelectScreen:React.FC = ()=>{
    const homeNavigation = useHomeNavigation();
    const onPressBack = useCallback(()=>{
        homeNavigation.goBack();
    }, [])

    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [imageUrl, setImageUrl] = useState("");
    const uploadImage = async () => {
        if (!status?.granted) {
            const permission = await requestPermission();
            if (!permission.granted) {
                return null;
            }
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing:false,
            quality:1,
            aspect:[1,1]
        });
        if (result.canceled) {
            return null;
        }

        console.log(result);
        setImageUrl(result.assets[0].uri);
        rootNavigation.navigate('WritePost', {uri:imageUrl})
    };
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
            <View style={{paddingHorizontal:10, backgroundColor:'white'}}>
                <Pressable onPress={uploadImage}>
                    <Typography fontSize={15}>
                        이미지업로드하기
                    </Typography>
                </Pressable>
            </View>
        </View>
    )
}
