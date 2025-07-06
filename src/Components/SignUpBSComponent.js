import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

import Images from '../Assets/Images'

import Colors from '../Utils/Colors'
import CustomButton from './CustomButton'

import CustomInput from './CustomInput'

const SignUpBSComponent = (props) => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.mainHeading}>
                {props.label}
            </Text>
            {/* First Name Input */}
            <CustomInput
                placeholder={props.firstNamPlaceholder}
                value={props.value}
                onChangeText={props.firstNameOnChangeText}
                maxLength={props.maxLength}
                keyboardType={props.keyboardType}

            />

            {/* Last Name Inpuut */}
            <CustomInput
                placeholder={props.lastNamePlaceholder}
                value={props.value}
                onChangeText={props.lastNameOnChangeText}
                maxLength={props.maxLength}
                keyboardType={props.keyboardType}

            />
            {/* Email Input */}
            <CustomInput
                placeholder={props.emailPlaceholder}
                value={props.value}
                onChangeText={props.emailOnChangeText}
                maxLength={props.maxLength}
                keyboardType={props.keyboardType}

            />
            {/* Passowrd Input */}

            <CustomInput
                placeholder={props.passwordPlaceHolder}
                value={props.passwordValue}
                onChangeText={props.passwordOnChangeText}
                maxLength={props.passwordMaxLength}
                secureTextEntry={props.secureTextEntry}
                keyboardType={props.passwordKeyboardType}
            />

            <CustomButton
                mainButtonStyle={styles.loginButtonStyle}
                btnTextStyle={styles.loginButtonTextStyle}
                label={props.buttonLabel}
                onPress={props.onLoginPress}
            />
            <View style={styles.rowContainer}>
                <Text style={styles.newToSkollStyle}>{"Alreay have account? "}</Text>
                <TouchableOpacity onPress={props.onSignUpPress}>
                    <Text style={styles.signUpButtonStyle}>{"Sign in"}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.orTextStyle}>{"- or -"}</Text>

            <View style={styles.socialButtonContainer}>

                {/* Facebook Buttom */}

                <TouchableOpacity style={styles.facebookButtonStyle}
                    onPress={props.onFacebookPress}
                >
                    <Image
                        style={styles.logoStyle}
                        source={Images.facebookLogo}
                    />
                </TouchableOpacity>


                {/* Twitter Button */}

                <TouchableOpacity style={styles.facebookButtonStyle}
                    onPress={props.onTwitterPress}
                >
                    <Image
                        style={styles.logoStyle}
                        source={Images.twitterLogo}
                    />
                </TouchableOpacity>

                {/* Google Button */}

                <TouchableOpacity style={styles.facebookButtonStyle}
                    onPress={props.onGooglePress}
                >
                    <Image
                        style={styles.logoStyle}
                        source={Images.googlePlusLogo}
                    />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default SignUpBSComponent;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        alignItems: 'center'
    },
    mainHeading: {
        color: Colors.black,
        margin: 5,
        textAlign: 'center',
        fontFamily: "Roboto-Bold",
        fontSize: 25
    },
    loginButtonStyle: {
        backgroundColor: Colors.white,
        borderColor: Colors.green,
        borderWidth: 0.5,
        margin: 20
    },
    loginButtonTextStyle: {
        color: Colors.green,
        fontFamily: 'Roboto-Medium'
    },
    forgotPasswordStyle: {
        marginTop: 50,
        fontSize: 15,
        fontFamily: 'Roboto-Regular'
    },
    newToSkollStyle: {
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        color:Colors.LightGray
    },
    signUpButtonStyle: {
        fontSize: 15,
        color: Colors.blue,
        textDecorationLine: 'underline'
    },
    rowContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 'auto',
        // backgroundColor:'red',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    socialButtonContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 'auto',
        // backgroundColor:'red',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    orTextStyle: {
        margin: 10,
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        color:Colors.LightGray
    },
    facebookButtonStyle: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: Colors.blue,
        alignItems: 'center',
        alignSelf: 'center',
        marginHorizontal: 10
    },
    logoStyle: {
        width: '100%',
        height: '100%',
        alignSelf: 'center'
    }
})
