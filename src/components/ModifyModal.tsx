import React, { ReactElement } from 'react';
import { Pressable, TextInput, View, Modal, TouchableOpacity, Text, Keyboard } from 'react-native';


export const ModifyModal:React.FC<{
    onChangeValue:(value:string)=>void;
    setModalVisible:()=>void;
    onPressAction:()=>void;
    onPressClose:()=>void;
    modalVisible:boolean;
    value:string;
    children:ReactElement | ReactElement[];
}> = (props) => (
    <Modal animationType='none' transparent={true} visible={props.modalVisible}>
        <Pressable onPress={props.setModalVisible} style={{flex:1, backgroundColor:'rgba(0,0,0,0.7)', justifyContent:'center'}}>
            <Pressable onPress={Keyboard.dismiss} style={{alignItems:'center', backgroundColor:'#f2f2f2', justifyContent:'center', width:'76%', height:'25%', alignSelf:'center', borderRadius:10}}>
                <View style={{alignItems:'center', height:'70%', justifyContent:'center'}}>
                                {props.children}
                    <TextInput value={props.value} onChangeText={props.onChangeValue} placeholder='Nickname' style={{backgroundColor:'white', paddingVertical:4, width:236, borderRadius:5, borderWidth:0.2, borderColor:'#3c3c43', paddingLeft:5, marginVertical: 20}}></TextInput>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%', borderColor:'#3c3c43', borderTopWidth:0.2, flex:1}}>
                    <View style={{width:'50%', alignItems:'center', borderColor:'#3c3c43', borderRightWidth:0.2, justifyContent:'center'}}>
                        <TouchableOpacity onPress={props.onPressClose} hitSlop={{top:5, bottom:5,right:5, left:5}}>
                            <Text style={{color:'#007AFF'}}>Close</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:'50%', alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity onPress={props.onPressAction} hitSlop={{top:5, bottom:5,right:5, left:5}}>
                            <Text style={{color:'#007AFF'}}>Action</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Pressable>
        </Pressable>
    </Modal>
);
