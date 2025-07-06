import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    ImageBackground,
    Image
} from 'react-native'

//Files
import Style from './Style';
import Images from '../../Assets/Images';

//Components
import Header from '../../Components/Header';
import CustomButton from '../../Components/CustomButton';

const SuccessScreen = ({ navigation, route }) => {
    const { messageInfo, drinkDetails } = route?.params

    const [drinkNamesList, setDrinkNamesList] = useState('')

    useEffect(() => {
        getDrinkNames()
    }, [drinkDetails])

    const getDrinkNames = () => {
        let tempString = ''
        drinkDetails.forEach((element, index) => {
            if (index == drinkDetails.length - 1 && drinkDetails.length > 1) {
                tempString = tempString.concat(` and ${element?.name}`)
            }
            else if (index < drinkDetails.length - 1) {
                tempString = tempString.concat(`${element?.name}, `)
            }
            else {
                tempString = tempString.concat(`${element?.name}`)
            }
            setDrinkNamesList(tempString)
        });
    }

    return (
        <View style={Style.mainContainer}>
            <ImageBackground
                source={Images.friendsCheering}
            >
                <View style={Style.shadowContainer}>
                    <Header
                        leftIcon={Images.leftIcon}
                        headerStyle={{ marginTop: 15 }}
                        onPress={() => navigation.goBack()}
                    />
                    <View style={Style.innerContainer}>
                        <View style={Style.checkImageContainer}>
                            <Image
                                source={Images.checkMark}
                                style={Style.checkMarkStyle}
                            />
                        </View>
                        <View style={Style.successTextContainer}>
                            <Text style={Style.successTextStyle}>{"Success!"}</Text>
                            <Text style={Style.successTextStyle}>{`You have sent ${drinkNamesList} to ${messageInfo}`}</Text>
                        </View>
                        <CustomButton
                            mainButtonStyle={Style.continueButtonStyle}
                            label={"CONTINUE"}
                            onPress={() => {
                                navigation.popToTop()
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Home' }]
                                })
                            }}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default SuccessScreen;

