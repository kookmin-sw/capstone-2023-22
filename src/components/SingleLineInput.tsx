import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

export const SingleLineInput:React.FC<{
    value:string,
    onChangeText:(text:string)=>void
    placeholder:string
    onSubmitEditing:()=>void,
    fontSize?:number
}> = (props) => {
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={{
        alignSelf: 'stretch',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 4,
        // borderWidth: focused ? 1 : 0,
        borderColor: 'black',
        backgroundColor: '#E4E4E4'
      }}
    >
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        onSubmitEditing={props.onSubmitEditing}
        style={{ fontSize: props.fontSize ?? 20 }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};
