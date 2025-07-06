import React, { useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    SafeAreaView
} from 'react-native';

// Libraries
import { StackActions } from '@react-navigation/native';
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
import { changeEmail } from '../../api/methods/auth';

// Redux Imports
import { logoutUser, signInResponse } from '../../redux/actions/userSession'
import { useDispatch, useSelector } from 'react-redux';

const ChangeEmailScreen = ({ navigation }) => {

    const { currentUser } = useSelector(state => state.userSession)

    const dispatch = useDispatch()

    const [email, setEmail] = useState(true)
    const [loading, setLoading] = useState(false)

    const onChangePress = async () => {
        setLoading(true)
        try {
            // const formData = new FormData()
            // formData.append('email', email)
            const response = await changeEmail({
                email:email
            })
            if(response?.status==200){
                Toast.show(response?.data?.message)
                dispatch(logoutUser())
                Toast.show("Please login with new email")
            }
        } catch (error) {
            Toast.show(error?.response?.data?.error?.message)
        }
        finally {
            setLoading(false)
        }
    }

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
                                {"Change Email"}
                            </Text>
                            <CustomInput
                                mainContainer={{
                                    width: '90%',
                                    marginLeft: 20,
                                }}
                                placeholder={"New Email"}
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                            <CustomButton
                                mainButtonStyle={[Style.loginButtonStyle, {
                                    backgroundColor: email.length > 0 ? Colors.blue : 'transparent'
                                }]}
                                btnTextStyle={[Style.loginButtonTextStyle, {
                                    color: email.length > 0 ? Colors.white : Colors.blue
                                }]}
                                label={"CHANGE"}
                                onPress={() => onChangePress()}
                            />
                        </View>


                    </View>
                </View>
            </ImageBackground>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    );
};

export default ChangeEmailScreen;

