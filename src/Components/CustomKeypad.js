import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'
import Images from '../Assets/Images'

const CustomKeypad = ({
    onOnePress = () => { },
    onTwoPress = () => { },
    onThreePress = () => { },
    onFourPress = () => { },
    onFivePress = () => { },
    onSixPress = () => { },
    onSevenPress = () => { },
    onEightPress = () => { },
    onNightPress = () => { },
    onZeroPress = () => { },
    onBackPress,
    onDonePress
}) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.mainRow}>
                <TouchableOpacity
                    onPress={() => onOnePress("1")}
                    style={styles.keyStyle}>
                    <Text style={styles.keyText}>{"1"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onTwoPress("2")}
                    style={styles.keyStyle}>
                    <Text style={styles.keyText}>{"2"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onThreePress("3")}
                    style={styles.keyStyle}>
                    <Text style={styles.keyText}>{"3"}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.mainRow}>
                <TouchableOpacity
                    onPress={() => onFourPress("4")}
                    style={styles.keyStyle}>
                    <Text style={styles.keyText}>{"4"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onFivePress("5")}
                    style={styles.keyStyle}>
                    <Text style={styles.keyText}>{"5"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onSixPress("6")}
                    style={styles.keyStyle}>
                    <Text style={styles.keyText}>{"6"}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.mainRow}>
                <TouchableOpacity
                    onPress={() => onSevenPress("7")}
                    style={styles.keyStyle}>
                    <Text style={styles.keyText}>{"7"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onEightPress("8")}
                    style={styles.keyStyle}>
                    <Text style={styles.keyText}>{"8"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onNightPress("9")}
                    style={styles.keyStyle}>
                    <Text style={styles.keyText}>{"9"}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.mainRow}>
                <TouchableOpacity
                    onPress={onBackPress}
                    style={styles.keyStyle}>
                    <Image
                        source={Images.deleteIcon}
                        style={styles.iconStyle} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onZeroPress("0")}
                    style={styles.keyStyle}>
                    <Text style={styles.keyText}>{"0"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onDonePress}
                    style={styles.keyStyle}>
                    <Image
                        source={Images.checkBoxIcon}
                        style={styles.iconStyle} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomKeypad

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        height: "50%",
        // backgroundColor: "pink",
        paddingBottom: 10
    },
    mainRow: {
        width: "80%",
        height: "25%",
        alignSelf: "center",
        // backgroundColor: "yellow",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    keyStyle: {
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "red",
        height: 70,
        width: 70,
        borderRadius: 100
    },
    keyText: {
        color: Colors.black,
        fontSize: 26,
        fontFamily: "Roboto-Bold",
    },
    iconStyle: {
        height: 22,
        width: 22,
        resizeMode: "contain",
        tintColor: Colors.black
    }
})
