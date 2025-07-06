import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'



const CustomSocialButton = (props) => {
    return (
        <TouchableOpacity style={[styles.mainContainer, props.socialButtonContainerStyle]}
            onPress={props.onSocialPress}
        >
            <Image
                style={props.logoStyle}
                source={props.iconSource}
            />
        </TouchableOpacity>
    )
}

export default CustomSocialButton;

const styles = StyleSheet.create({
    mainContainer:{
        width:60,
        height:60,
        borderRadius:30,
        backgroundColor:'blue',
        alignItems:'center',
        alignSelf:'center'
    },
    logoStyle:{
        width:'100%',
        height:'100%',
        alignSelf:'center'
    }
})
