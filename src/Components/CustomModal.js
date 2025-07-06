import React, { useState } from "react";
import { View, StyleSheet, Alert, Text, Dimensions, } from "react-native"
// import { Colors } from '../utils/Colors'
import Modal from "react-native-modal";
import Colors from "../Utils/Colors";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";


export default CustomModal = (props) => {

    return (
        <View>
            <Modal isVisible={props.isVisible}
            // style={{backgroundColor:'red'}}
            // transparent={props.transparent}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={[styles.container, props.modalContainerStyle]}>
                        <Text style={[styles.containerHeader, props.modalLabelStyle]}>{props.label}</Text>
                        <CustomButton
                            mainButtonStyle={[styles.addButtonStyle, props.firstButtonStyle]}
                            label={props.firstButtonLabel}
                            onPress={props.onAdd}
                            btnTextStyle={[styles.btnTextStyle, props.firstButtonTextStyle]}
                        />
                        
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
                {props.show&&<CustomButton
                    mainButtonStyle={styles.nextButtonStyle}
                    label={"NEXT"}
                    onPress={props.onNextPress}
                />}
            </Modal>
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
})
