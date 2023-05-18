import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Typography } from '../components/Typography';
import { Spacer } from '../components/Spacer';
import { Config } from '../config';

export const AreaDetailSheet = (props: any): JSX.Element => {
    // hooks
    const sheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ["13%", "50%", "75%"], []);

    // callbacks
    const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
    }, []);

    return (
        <BottomSheet
            ref={sheetRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
        >
            <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                <View style={{flex: 1, alignItems: "center"}}>
                    <Spacer space={24} />
                    <Typography fontSize={24} bold={true}>{props.name}</Typography>
                    <Spacer space={24} />
                    <Image
                        style={{width: "100%", height: 300}}
                        resizeMode="contain"
                        source={{ uri: `${Config.s3_server}/sex,old-rate/${props.name}/${props.name}_rate_old.png` }}
                    />
                    <Image
                        style={{width: "100%", height: 300}}
                        resizeMode="contain"
                        source={{ uri: `${Config.s3_server}/sex,old-rate/${props.name}/${props.name}_rate_sex.png` }}
                    />
                </View>
            </BottomSheetScrollView>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
    backgroundColor: "white",
    },
    itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
    },
});
