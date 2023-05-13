import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Keyboard, Pressable, View } from 'react-native';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { SingleLineInput } from '../components/SingleLineInput';
import { Typography } from '../components/Typography';
import { Icon } from '../components/Icons';
import { changeSearchKeyword, getSearch, getSearchSuccess, TypeSearchDispatch } from '../actions/search';
import { useDispatch } from 'react-redux';
import { useSearchKeyword, useSearchResult } from '../selectors/search';

export const SearchScreen:React.FC = ()=>{
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch<TypeSearchDispatch>();
    // let searchResults = useSearchResult();

    // const onPressEnter = useCallback((query:string) => {
    //     dispatch(getSearch(query));
    //     searchResults = useSearchResult();
    // }, [searchResults])

    // useMemo(() => {return use(); return searchKeyword},[keyword]); 
    useEffect(() =>{dispatch(getSearchSuccess([]))},[]);
    return (
        <Pressable onPress={Keyboard.dismiss} style={{flex:1, backgroundColor:'white'}}>
            <Header>
                <Header.Group>
                    <Header.Title title='검색'></Header.Title>
                </Header.Group>
            </Header>
            <View style={{paddingHorizontal:10, backgroundColor:'white'}}>
                <View style={{paddingVertical:20}}>
                    <SingleLineInput value={keyword} onChangeText={setKeyword} onSubmitEditing={()=>{onPressEnter(keyword); console.log(useSearchResult)}} placeholder='지금 궁금한 장소는?' fontSize={15}/>
                </View>
                <View style={{paddingVertical:20}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <View style={{flex:1}}>
                            <Typography color='black' fontSize={18} bold>실시간 트렌드</Typography>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{backgroundColor:'#D9D9D9', padding:5, borderRadius:2}}>
                                <Icon name='list' size={20} color='black'/>
                            </View>
                            <Spacer space={3} horizontal/>
                            <View style={{backgroundColor:'#D9D9D9', padding:5, borderRadius:2}}>
                                <Icon name='cloud' size={20} color='black'/>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}
