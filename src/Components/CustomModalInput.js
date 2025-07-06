import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text, Dimensions, TouchableOpacity, Image, TextInput } from "react-native"
// import { Colors } from '../utils/Colors'
import Modal from "react-native-modal";
import Colors from "../Utils/Colors";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import Style from "../Screens/SendDrink/Style";
import Images from "../Assets/Images";
import CountryPicker from "./CountryPicker";
import { getCountriesApi } from "../api/methods/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default CustomModal = (props) => {
    const [countryModal, setCountryModal] = useState(false)
    const [country, setCountry] = useState([])
    const [countryName, setCountryName] = useState(null)
    const [newNumber, setNewNumber] = useState(null)
    const [fone_code, setFone_code] = useState('')



    useEffect(() => {
        // getCountires()
        // setNewNumber(recepNumber)
    })

    const getAllCountryStates = async (countryId) => {
        setLoading(true)
        try {
            const response = await getStatesByCountry(countryId)
            setCountryStatesList(response?.data?.data)
            setSelectedState(response?.data?.data[0])
        } catch (error) {
            console.log('erroor===>>>', error?.response?.data);
        }
        finally {
            setLoading(false)
        }
    }

    const getCountires = async () => {
        try {
            const response = await getCountriesApi()
            setCountry(response.data.data)
        } catch (error) {
            console.log('countries api error==>>', error)
        }
    }
    return (
        <View>
            <Modal isVisible={props.isVisible}
            // style={{backgroundColor:'red'}}
            // transparent={props.transparent}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={[styles.container, props.modalContainerStyle]}>
                        <Text style={[styles.containerHeader, props.modalLabelStyle]}>{props.label}</Text>
                        <View style={Style.phoneContainer}>
                            <TouchableOpacity
                                onPress={props.onCountryPickerPress}
                                // setCountryModal(true)}
                                style={Style.countryImageContainer}>
                                <View>
                                    <Image
                                        style={{ width: 10, height: 10, tintColor: Colors.LightGray, }}
                                        source={Images.caretDown}
                                    />
                                </View>
                                <Text style={{
                                    fontFamily: 'Roboto-Regular',
                                    color: Colors.textColor,
                                }}>{props.fone_code || "91"}</Text>
                            </TouchableOpacity>
                            <TextInput
                                placeholderTextColor={Colors.LightGray}
                                style={Style.phoneInputContainer}
                                placeholder={"RECIPIENT PHONE NUMBER*"}
                                value={props.value}
                                onChangeText={props.onChangeText}
                            />
                        </View>

                        {/* <CustomInput
                        mainButtonStyle={[styles.addButtonStyle, props.firstButtonStyle]}
                        label={props.firstButtonLabel}
                        onPress={props.onInput}
                        btnTextStyle={[styles.btnTextStyle, props.firstButtonTextStyle]}
                        /> */}

                        <CustomButton
                            mainButtonStyle={[styles.continueButton, props.secondButtonStyle]}
                            label={props.secondButtonLabel}
                            onPress={props.onContinue}
                            btnTextStyle={props.secondButtonTextStyle}
                        />
                        <CustomButton
                            mainButtonStyle={[styles.cancelButton, props.cancelButtonStyle]}
                            label={"CANCEL"}
                            onPress={props.onCancel}
                            btnTextStyle={[styles.cancelButtonText, props.cancelButtonTextStyle]}
                        />
                    </View>
                </View>
                {props.show && <CustomButton
                    mainButtonStyle={styles.nextButtonStyle}
                    label={"NEXT"}
                    onPress={props.onNextPress}
                />}
            </Modal>
            <CountryPicker
                isVisible={countryModal}
                onPress={() => setCountryModal(false)}
                data={country}
                placeholder={'Search country'}
                onCountryPress={(itemDetails) => {
                    setCountryModal(false)
                    setCountryName(itemDetails)
                    getAllCountryStates(itemDetails?.id)
                    setFone_code(itemDetails?.phone_code)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        alignSelf: 'center',
        height: 280,
        width: '80%',
        alignItems: 'center',
        // justifyContent: 'center',
        borderRadius: 20,
        // marginTop:'50%'
    },
    containerHeader: {
        fontFamily: 'JosefinSans-Bold',
        fontSize: 16,
        // textAlign: 'auto',
        // marginBottom: 'auto',
        marginTop: 20,
        color: Colors.blue,
        textAlign: 'center',
    },
    cancelButton: {
        backgroundColor: Colors.white,
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20
    },
    cancelButtonText: {
        color: Colors.LightGray
    },
    continueButton: {
        backgroundColor: Colors.green,
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20
    },
    addButtonStyle: {
        backgroundColor: Colors.white,
        borderColor: Colors.blue,
        borderWidth: 0.5,
        marginTop: 20,
        height: 40,
    },
    btnTextStyle: {
        color: Colors.blue
    },
    nextButtonStyle: {
        backgroundColor: Colors.green,
        width: '80%',
        marginBottom: 'auto'
    },
    phoneContainer: {
        width: '80%',
        height: 50,
        flexDirection: 'row',
        backgroundColor: Colors.inputColor,
        borderRadius: 25,
        alignSelf: 'center',
        marginTop: 20,
        paddingHorizontal: 15,
        alignItems: "center",
    },
    phoneInputContainer: {
        height: "60%",
        width: "78%",
        paddingLeft: 10,
        borderLeftWidth: 0.5,
        borderLeftColor: Colors.DarkGray,
        marginLeft: 10,
        fontFamily: 'Roboto-Regular',
        color: Colors.textColor,
        padding: 0
    },
    countryImageContainer: {
        width: '18%',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
    },
})
