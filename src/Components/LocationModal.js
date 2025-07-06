import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Modal from "react-native-modal";

import Colors from '../Utils/Colors';
import Images from '../Assets/Images';

// Components
import Loader from './Loader';
import { getCountriesApi } from '../api/methods/auth';

const LocationModal = (props) => {

    const locationInputRef = useRef(null)

    const [closeModal, setCloseModal] = useState(false)
    const [enabledCountries, setEnabledCountries] = useState([])

    useEffect(() => {
        setTimeout(() => {
            if (props.isVisible) {
                locationInputRef?.current?.focus()
            }
            getCountries()
        }, 200)

    }, [props.isVisible])

    const getCountries = async () => {
        try {
            const response = await getCountriesApi()
            toGetEnabledCountries(response?.data?.data)
        } catch (error) {
            console.log('error==>>', error);
        }
    }

    const toGetEnabledCountries = (countries) => {
        let tempArray = [...countries];
        let tempString = null;
        let allowedCountries = [];
        tempArray.forEach(element => {
            allowedCountries.push(`country:${element?.code}`)
        });
        tempString = allowedCountries.join("||")
        setEnabledCountries(tempString)

    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.isVisible}
            onRequestClose={props.onRequestClose}

        >
            <View style={styles.mainContainer}>
                <View style={{ alignItems: 'flex-end' }}>

                    <TouchableOpacity onPress={props.onClosePress}>
                        <Image
                            source={Images.crossIcon}
                            style={{ tintColor: Colors.DarkBlue, width: 20, height: 20 }}
                            resizemode='contain'
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    keyboardShouldPersistTaps='handled'
                >
                    <GooglePlacesAutocomplete
                        ref={locationInputRef}
                        placeholder='Search Location'
                        GooglePlacesDetailsQuery={{ fields: "geometry" }}
                        fetchDetails={true}
                        onPress={props.onGooglePlacePress}
                        textInputProps={{
                            backgroundColor: Colors.inputColor,
                            marginTop: 20,
                            borderRadius: 10,
                            height: 50,
                            color: Colors.black,
                            placeholderTextColor: Colors.DarkGray,
                        }}

                        query={{
                            key: 'AIzaSyBDItaeh2NygRIaZHSYJ2_Kbue9_-Dj0k4',
                            // key: 'AIzaSyDmojQImNP7prk7G8iHHLyZVz1-4b5N4Ws',
                            language: 'en',
                            components: enabledCountries
                        }}
                        styles={{
                            predefinedPlacesDescription: {
                                color: Colors.black
                            },
                            row: {
                                backgroundColor: Colors.white,
                            },
                            listView: {
                                backgroundColor: Colors.white,
                            },
                            description: {
                                color: Colors.black
                            }
                        }}

                    />
                </ScrollView>
            </View>
        </Modal>
    )
}

export default LocationModal;

const styles = StyleSheet.create({
    mainContainer: {
        padding: 20,
        backgroundColor: Colors.white,
        height: '70%',
        width: '90%',
        borderRadius: 30,
        alignSelf: 'center',
        marginTop: '30%',
        elevation: 4,
    },
    innerContainer: {
        width: '100%',
        height: '100%'
    }
})
