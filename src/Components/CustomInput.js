import React from 'react'
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native'

import Colors from '../Utils/Colors'

const CustomInput = (props) => {
    return (
        <View
            style={[styles.mainContainer, props.mainContainer]}
        >
            {props.leftIcon && <TouchableOpacity
                style={[styles.imageContainer, props.leftIconStyle]}
                onPress={props.onLeftIconPress}

            >
                <Image
                    style={styles.passwordIcon}
                    source={props.leftIcon}
                />
            </TouchableOpacity>}
            <TextInput
                placeholderTextColor={Colors.LightGray}
                style={[styles.inputContainer, props.inputMainStyle]}
                value={props.value}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                secureTextEntry={props.secureTextEntry}
                maxLength={props.maxLength}
                editable={props.editable}
                multiline={props.multiline}
                keyboardType={props.keyboardType}
                defaultValue={props.defaultValue}
                autoCapitalize='none'
            />
            {props.source && <TouchableOpacity style={styles.imageContainer}
                onPress={props.onPress}
                disabled={props.disableLeftIcon}
            >
                <Image
                    resizeMode='contain'
                    style={[styles.passwordIcon, props.arrowIcon]}
                    source={props.source}
                />
            </TouchableOpacity>}
        </View>
    )
}

export default CustomInput;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height:50,
        flexDirection: 'row',
        backgroundColor: Colors.inputColor,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Colors.LightGray,
        marginTop: 20
    },
    inputContainer: {
        // width: '70%',
        flex: 1,
        // height: 0,
        flexWrap:'wrap',
        // backgroundColor: 'red',
        paddingLeft: 20,
        borderRadius: 25,
        // marginTop: 20,
        fontFamily: 'Roboto-Regular',
        color: Colors.textColor,
    },
    imageContainer: {
        width: '20%',
        height: 50,
        // marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'green',
        marginLeft: 'auto',
        borderRadius: 25
    },
    passwordIcon: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        tintColor: Colors.LightGray
    }
})
