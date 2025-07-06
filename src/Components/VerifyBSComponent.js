import React from 'react'
import { Image, StyleSheet, Text, TextInput, View } from 'react-native'

import Colors from '../Utils/Colors'
import Images from '../Assets/Images'

import CustomButton from './CustomButton'

const VerifyBSComponent = (props) => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.mainHeading}>{"Verify Phone\n Number"}</Text>
            <Text style={styles.description}>{"We have sent you an SMS with a code\n to number (+44) 1234567"}</Text>
            <View></View>
            <View style={styles.inputContainer}>
                <View style={styles.codeContainer}>
                    <View style={styles.countryIconContainer}>
                        <Image
                            style={styles.countryIconStyle}
                            source={Images.countryIcon}
                        />
                    </View>
                    <Text style={styles.countryCodeText}>{"+44"}</Text>
                </View>
                <TextInput
                    style={styles.codeInputContainer}
                    placeholderTextColor={Colors.LightGray}
                    placeholder={"Verification Code"}
                    keyboardType='numeric'
                    value={props.value}
                    onChangeText={props.onChangeText}

                />
            </View>

            <CustomButton
                onPress={props.onNextPress}
                mainButtonStyle={[styles.nextButton, props.nextButtonStyle]}
                btnTextStyle={props.btnTextStyle}
                label={"NEXT"}
                disabled={props.disabled}
            />
        </View>
    )
}

export default VerifyBSComponent

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'flex-start',
        padding:15
    },
    mainHeading: {
        color: Colors.black,
        margin: 5,
        // textAlign: 'center',
        fontFamily: "Roboto-Bold",
        fontSize: 45
    },
    description: {
        marginLeft: 15,
        fontSize: 20,
        marginTop: 10,
        fontFamily: 'Roboto-Regular',
        // color:Colors.LightGray
    },
    nextButton: {
        alignSelf: 'center',
        marginTop: 20,
        width:'90%',
        // marginLeft: 15,
    },
    inputContainer: {
        width: '90%',
        height: 50,
        backgroundColor: Colors.inputColor,
        // marginLeft: 15,
        marginTop: 20,
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
        alignSelf: 'center',
        borderWidth:0.5,
        borderColor:Colors.LightGray,
        borderRadius: 25
    },
    codeContainer: {
        width: '25%',
        height: '100%',
        borderRightWidth: 0.5,
        borderColor: Colors.LightGray,
        // borderRadius:25,
        flexDirection: 'row',
        // marginLeft:10,
        // backgroundColor:'red'
    },
    countryIconContainer: {
        width: 30,
        height: 30,
        alignSelf: 'center',
        marginLeft: 15,
        borderRadius: 50,
        backgroundColor: 'red'
    },
    countryIconStyle: {
        width: '100%',
        height: '100%'
    },
    countryCodeText: {
        alignSelf: 'center',
        marginLeft: 'auto',
        marginRight: 10,
        fontSize: 15
    },
    codeInputContainer: {
        width: '75%',
        height: '100%',
        // backgroundColor:'red',
        // borderRadius:50,
        paddingLeft: 10,
        color:'gray',
        fontSize:15

    }

})

