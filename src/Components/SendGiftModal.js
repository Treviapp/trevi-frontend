import { StyleSheet, Text, View, Modal } from 'react-native'
import React, { useState } from 'react'
import Colors from '../Utils/Colors'
import CustomButton from './CustomButton'
import CheckBox from '@react-native-community/checkbox';
const SendGiftModal = ({
    visible,
    confirmPress = () => { },
}) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
        >
            <View style={styles.mainContainer}>
                <View style={styles.primaryContainer}>
                    <Text style={styles.titleText}>
                        {"HOW IT WORKS"}
                    </Text>
                    <View style={{ flexDirection: "row", marginTop: 20, width: "90%" }}>
                        <Text style={styles.descText}>{"- "}</Text>
                        <Text style={styles.descText}>{"When you buy a friend a drink and recommend a venue, they receive a cash transfer."}</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 10, width: "90%" }}>
                        <Text style={styles.descText}>{"- "}</Text>
                        <Text style={styles.descText}>{"The money can be used at any bar, to buy any drink."}</Text>
                    </View>
                    <View style={{ position: "absolute", bottom: 20, width: "100%", justifyContent: "center", alignItems: "center" }}>
                        <CustomButton
                            onPress={() => confirmPress(toggleCheckBox)}
                            mainButtonStyle={{ backgroundColor: Colors.blue, marginBottom: 10 }}
                            label={"I Understand!"}
                        />
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={styles.dontText}>{"Don’t show again"}</Text>
                            <CheckBox
                                style={{ height: 20, width: 20, marginLeft: 10 }}
                                disabled={false}
                                value={toggleCheckBox}
                                onValueChange={(newValue) => {
                                    setToggleCheckBox(newValue)
                                }}
                                tintColors={"black"}
                                boxType={"square"}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default SendGiftModal

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    primaryContainer: {
        height: 350,
        width: "90%",
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    titleText: {
        color: Colors.black,
        fontSize: 16,
        fontFamily: 'JosefinSans-Bold',
    },
    descText: {
        color: Colors.black,
        fontSize: 14,
        fontFamily: 'JosefinSans-Light',
        // textAlign: "left"
    },
    dontText: {
        color: Colors.black,
        fontFamily: 'JosefinSans-Light',
    },
})
