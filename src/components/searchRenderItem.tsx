import { Platform, Pressable, View } from "react-native"
import { BookmarkInfo } from "../@types/BookmarkInfo"
import { PlaceInfo } from "../@types/PlaceInfo"
import { Spacer } from "./Spacer"
import { TabIcon } from "./TabIcon"
import { Typography } from "./Typography"

export const renderItem:React.FC<{item:PlaceInfo|BookmarkInfo, onPress:(item:PlaceInfo|BookmarkInfo)=>void}> = (props) => 
    (
        <View style={{paddingHorizontal:7}}>
            <Pressable onPress={() => {props.onPress(props.item)}} 
            style={{backgroundColor:'white', paddingHorizontal:10, paddingVertical:10, borderRadius:30,marginBottom:10, ...Platform.select({
            ios: {
            shadowColor: 'black',shadowOffset: {
                width: 1,
                height: 1,
            },
            shadowOpacity: 0.25,
            shadowRadius: 1,
            },
            android: {
                elevation: 2,
            },
            })}}>
            <View style={{flexDirection:'row'}}>
                <View style={{
                     backgroundColor:'#EDCAE9', width: 50, height:50, alignItems: 'center', justifyContent:'center', borderRadius:50/2}}>
                    <TabIcon iconName='restaurant' iconColor='black'></TabIcon>
                    {/* <Image source={require('../../assets/kitchen-pack.png')} style={{width:30, height:30}}/> */}
                </View>
                <Spacer space={15} horizontal/>
                <View style={{justifyContent:'center'}}>
                    <Typography fontSize={16}>{item.placeName}</Typography>
                </View>
            </View>
            </Pressable>
        </View>
    )
}