import React from 'react';
import { Text as RNText } from 'react-native';

// export class Typography extends React.Component{
//     render(){
//         return (
//             <RNText
//                 style={{
//                     color:this.props.color,
//                     fontSize:this.props.fontSize
//                 }}>
//                 {this.props.children}
//             </RNText>
//         )
//     }
// }

export const Typography:React.FC<{
    color?:string,
    fontSize?:number,
    font?:string,
    bold?:boolean,
    numberOfLines?:number,
    children:React.ReactNode | string
}> = (props) => (
  <RNText
    style={{
      color: props.color ?? 'black',
      fontWeight: props.bold ? 'bold': 'normal',
      fontSize: props.fontSize ?? 10,
      fontFamily:props.font ?? "Arial"
    }}
    numberOfLines={props.numberOfLines}
  >
    {props.children}
  </RNText>
);
