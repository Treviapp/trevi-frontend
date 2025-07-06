import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'

import CheckBox from '@react-native-community/checkbox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../Utils/Colors'
import Images from '../Assets/Images'


import CustomButton from './CustomButton'
import CustomInput from './CustomInput'


const PaymentBSComponent = (props) => {
    const {
        onPayPress = () => { }
    } = props

    const [cardNumber, setCardNumber] = useState(props?.cardInfo?.cardNumber)
    const [expiryValue, setExpiryValue] = useState(props?.cardInfo?.expiry)
    const [cvcValue, setCvcValue] = useState(props?.cardInfo?.cvc)
    const [cardHolderName, setCardHolderName] = useState(props?.cardInfo?.cardholderName)

    return (
        <KeyboardAwareScrollView>
            <View style={[styles.mainContainer, props.bsMainContainerStyle]}>
                <View style={styles.headinContainer}>
                    <Text style={styles.headingText}>{"ADD CARD INFORMATION"}</Text>
                </View>
                <View style={styles.inputHeadingContainer}>
                    <Text style={styles.inputHeading}>{"CARD NUMBER"}</Text>
                </View>
                <CustomInput
                    mainContainer={{ width: '90%' }}
                    placeholder={'4242 4242 4242 4242'}
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    maxLength={16}
                    keyboardType={props.cardNumberKeyboardType}
                />
                <View style={styles.rowContainer}>
                    <View style={styles.expiryInputContainer}>
                        <View style={styles.inputHeadingContainer}>
                            <Text style={styles.expiryInputHeading}>{"EXPIRY"}</Text>
                            <CustomInput
                                mainContainer={{ width: '100%' }}
                                placeholder={'3/24'}
                                value={expiryValue}
                                onChangeText={setExpiryValue}
                                maxLength={props.expiryMaxLength}
                                keyboardType={props.expiryKeyboardType}
                                inputMainStyle={styles.expiryInputField}

                            />
                        </View>
                    </View>
                    <View style={styles.cvcInputContainer}>
                        <Text style={styles.expiryInputHeading}>{"CVC"}</Text>
                        <CustomInput
                            placeholder={'123'}
                            value={cvcValue}
                            onChangeText={setCvcValue}
                            maxLength={3}
                            keyboardType={props.cvcKeyboardType}
                            inputMainStyle={styles.expiryInputField}
                        />
                    </View>
                </View>
                <View style={styles.inputHeadingContainer}>
                    <Text style={styles.cardHolderHeading}>{"CARDHOLDER NAME"}</Text>
                </View>
                <CustomInput
                    mainContainer={{ width: '90%' }}
                    placeholder={'JOHN DOE'}
                    value={cardHolderName}
                    onChangeText={setCardHolderName}
                    maxLength={props.cardHolderNameMaxLength}
                    keyboardType={props.cardHolderNameKeyboardType}
                />
                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        tintColors={props.tintColors}
                        style={styles.checkBoxStyle}
                        value={props.checkBoxValue}
                        onValueChange={props.checkBoxValueChange}
                    />
                    <Text style={styles.cardText}>{'SAVE CARD'}</Text>
                </View>
                <CustomButton
                    disabled={props.disabled}
                    onPress={() => onPayPress(
                        {
                            cardNumber,
                            expiryValue,
                            cvcValue,
                            cardHolderName
                        }
                    )}
                    mainButtonStyle={[styles.payButtonStyle, props.payButtonStyling]}
                    btnTextStyle={[styles.payButtonTextStyle, props.payButtonTextStyling]}
                    label={"PAY NOW"}
                />
            </View>
        </KeyboardAwareScrollView>
    )
}

export default PaymentBSComponent;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        alignItems: 'center'
    },
    IconContainer: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        // backgroundColor:'red',
        paddingLeft: 50
    },
    imageContainer: {
        width: '25%',
        height: 80,

        // backgroundColor:'blue'
    },
    payPalImageContainer: {
        width: '25%',
        height: 80,
        marginLeft: 25,
        // backgroundColor:'blue'
    },
    inputHeadingContainer: {
        width: '90%',
    },
    inputHeading: {
        fontSize: 12,
        marginLeft: 10,
        fontFamily: 'JosefinSans-Bold',
        color: Colors.blue
    },
    rowContainer: {
        width: "90%",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    expiryInputContainer: {
        width: "60%",
    },
    cvcInputContainer: {
        width: '40%'
    },
    expiryInputField: {
        width: '100%'
    },
    expiryInputHeading: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 12,
        fontFamily: 'JosefinSans-Bold',
        color: Colors.blue
    },
    cardHolderHeading: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 12,
        fontFamily: 'JosefinSans-Bold',
        color: Colors.blue
    },
    payButtonStyle: {
        marginTop: 30,
        // width: '100%',
        marginBottom: 80,
        backgroundColor: 'transparent',
        borderColor: Colors.blue,
        borderWidth: 1
    },
    payButtonTextStyle: {
        color: Colors.blue
    },
    checkBoxContainer: {
        width: "90%",
        flexDirection: 'row'
    },
    checkBoxStyle: {
        marginTop: '10%',
        marginLeft: 15,
        tintColors: Colors.blue
    },
    cardText: {
        fontSize: 15,
        marginTop: '11%',
        marginLeft: 5
    },
    headinContainer: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        // marginTop: 5
    },
    headingText: {
        color: Colors.black,
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: "JosefinSans-Bold",
        fontSize: 20
    },
})
