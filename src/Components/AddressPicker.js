import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, Modal, TouchableOpacity } from "react-native";

import Colors from "../Utils/Colors";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";


const AddressPicker = (props) => {

    const {
        data = [],
        onCountryPress = () => { },
        placeholder,
        isStateModal
    } = props

    const [filteredList, setFilteredList] = useState(data)
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        setFilteredList(data)
    }, [data])

    const renderItem = ({ item }) => {
        return (
            <View style={styles.flatListContainer}>
                <TouchableOpacity style={styles.rowContainer}
                    onPress={() => {
                        onCountryPress(item)
                    }}
                >
                    <View style={styles.innerRowContainer}>
                        {(!isStateModal && item.image) ?
                            <Image
                                style={{
                                    width: 50,
                                    height: 30,
                                    // marginHorizontal: 10
                                }}
                                source={{ uri: item.image || null }}
                            /> : null
                        }
                        <Text style={styles.codeText}>{item?.summaryline}</Text>
                    </View>
                    <View style={styles.codeContainer}>
                        <Text style={styles.codeText}>{item?.phone_code}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View>
            <Modal
                visible={props.isVisible}
                transparent={true}
            >
                <View style={styles.mainContainer}>
                    {/* <CustomInput
                        mainContainer={styles.inputContainer}
                        value={searchText}
                        placeholder={placeholder}
                        onChangeText={(text) => {
                            let newlist = [...props.data]
                            if (text?.length > 0) {
                                newlist = newlist.filter((item) => (
                                    item.name.toLowerCase().indexOf(text.toLowerCase()) == 0
                                    || `${item.phone_code}`.indexOf(text) == 0
                                ))
                            }
                            setFilteredList(newlist)
                            setSearchText(text)
                        }}
                    /> */}
                    <FlatList
                        renderItem={renderItem}
                        data={filteredList}
                        keyExtractor={item => item.id}
                    />
                    <CustomButton
                        label={'CANCEL'}
                        onPress={props.onPress}
                        mainButtonStyle={styles.buttonStyle}
                        btnTextStyle={styles.buttonTextStyle}
                    />
                </View>
            </Modal>
        </View>
    )
}

export default AddressPicker;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "rgba(10, 10, 10,0.9)",
        alignSelf: 'center',
        height: '85%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 'auto',
        marginBottom: 20
    },
    inputContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: Colors.inputColor
    },
    flatListContainer: {
        flex: 1,
        alignSelf: 'center',

    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        padding: 5,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: Colors.textColor
    },
    innerRowContainer: {
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
        alignSelf: 'center'
    },
    codeContainer: {
        width: '20%',
        alignItems: 'center',
        alignSelf: 'center'
    },
    codeText: {
        fontSize: 15,
        marginLeft: 10,
        color: Colors.textColor
    },
    buttonStyle: {
        backgroundColor: Colors.green,
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '60%',
        height: 44,
        marginTop: 10,
        marginBottom: 10,
    },
    buttonTextStyle: {
        color: Colors.white,
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        textAlign: 'center'
    },
})
