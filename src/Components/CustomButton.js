import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../Utils/Colors'

const CustomButton = (props) => {
    return (
        <TouchableOpacity style={[styles.mainContainer, props.mainButtonStyle]}
            onPress={props.onPress}
            disabled={props.disabled}
        >
            <Text style={[styles.buttonTextStyle, props.btnTextStyle]}>
                {props.label}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton;

const styles = StyleSheet.create({
    mainContainer:{
        width:'80%',
        height:50,
        backgroundColor:Colors.blue,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        borderRadius:25
    },
    buttonTextStyle:{
        color:Colors.white,
        textAlign:'center',
        alignSelf:'center',
        justifyContent:'center',
        fontFamily:'JosefinSans-Bold'
    }
})
