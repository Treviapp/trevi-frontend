import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    SafeAreaView
} from 'react-native';

// Libraries
import { StackActions, useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

//Files
import Style from './Style';
import Images from '../../Assets/Images';
import Colors from '../../Utils/Colors';


//Components
import Header from '../../Components/Header';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import Loader from '../../Components/Loader';

// API Endpoints
import { changePhoneNumber, getProfileApi } from '../../api/methods/auth';

// Redux Imports
import { signInResponse } from '../../redux/actions/userSession'
import { useDispatch, useSelector } from 'react-redux';

const ChangePhoneNo = ({ navigation }) => {

    const isFocused = useIsFocused()

    const { currentUser } = useSelector(state => state.userSession)

    const [currentPhone, setCurrentPhone] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [userInfo, setUserInfo] = useState('')

    const [loading, setLoading] = useState(false)


    const onChangePress = async () => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('current_phone', currentPhone)
            formData.append('new_phone', newNumber)
            const response = await changePhoneNumber(formData)
            if(response.status===200){
                Toast.show(response.data.message)
                navigation.navigate("AccountSettings")
            }
        } catch (error) {
            console.log('error===>>>', error.response.data);
            Toast.show(error.response.data.error.message)
        }
        finally {
            setLoading(false)
        }
    }

    // useEffect(() => {
    //     getUserProfile()
    // }, [isFocused])

    return (
        <SafeAreaView style={Style.mainContainer}>
            <ImageBackground
                // resizeMode="contain"
                source={Images.friendsCheering}
                style={Style.imageBackGround}
            >
                <View style={Style.shadowContainer}>
                    <View style={Style.headingContainer}>
                        <Header
                            leftIcon={Images.leftIcon}
                            onPress={() => navigation.goBack()}
                            headerStyle={Style.headerStyle}
                        />
                    </View>
                    <View style={Style.bottomContainer}>

                        <View style={Style.bottomInnerainContainer}>
                            <Text style={Style.mainHeading}>
                                {"Change Phone No."}
                            </Text>
                            <CustomInput
                                mainContainer={{
                                    width: '90%'
                                }}
                                placeholder={"Current Number"}
                                value={currentPhone}
                                onChangeText={(text) => setCurrentPhone(text)}
                            />
                            <CustomInput
                                mainContainer={{
                                    width: '90%'
                                }}
                                placeholder={"New Number"}
                                value={newNumber}
                                onChangeText={(text) => setNewNumber(text)
                                }
                            />
                            <CustomButton
                                mainButtonStyle={[Style.loginButtonStyle, {
                                    backgroundColor: currentPhone && newNumber.length > 0 ? Colors.blue : 'transparent'
                                }]}
                                btnTextStyle={[Style.loginButtonTextStyle, {
                                    color: currentPhone && newNumber.length > 0 ? Colors.white : Colors.blue
                                }]}
                                label={"CHANGE"}
                                onPress={() =>
                                    // navigation.dispatch(StackActions.replace('AppStack'))
                                    onChangePress()
                                }
                            />
                        </View>


                    </View>
                </View>
            </ImageBackground>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    );
};

export default ChangePhoneNo;

