import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native'


import Images from '../Assets/Images'
import Colors from '../Utils/Colors'
import CustomButton from './CustomButton'


const BottomSheetComponent = (props) => {
    return (
        <View style={[styles.mainContainer, props.bsMainContainerStyle]}>

            <TouchableOpacity style={styles.rowContainer}
                onPress={props.onFacilitiesPress}
            >
                <Image
                    style={[styles.distanceIconStyle, props.distanceIconStyle]}
                    source={Images.carIcon}
                />
                <Text
                    style={[styles.distanceTextStyle, props.distanceTextStyle]}
                >{"DISTANCE"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rowContainer}
                onPress={props.onRatingPress}
            >
                <Image
                    style={[styles.iconStyle, props.starIconStyle]}
                    source={Images.starIcon}
                />
                <Text
                    style={[styles.distanceTextStyle, props.ratingTextStyle]}
                >{"RATING"}</Text>
            </TouchableOpacity>

            <CustomButton
                mainButtonStyle={[styles.searchButtonStyle, props.searcButtonStyle]}
                btnTextStyle={[styles.searchButtonTextStyle, props.searchButtonTextStyle]}
                label={'SEARCH'}
                onPress={props.onSearchPress}
            />
        </View>
    )
}

export default BottomSheetComponent;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        alignItems: 'center',
    },

    rowContainer: {
        width: '55%',
        flexDirection: 'row',
        height: 'auto',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0,
        borderColor: Colors.blue,
        marginRight:50,
        marginTop: 30
    },
    venueIconContainer: {
        width: '60%',
        flexDirection: 'row',
        height: 'auto',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderColor: Colors.blue,
        marginLeft: 50,
        marginRight: 'auto',
        marginTop: 40
    },
    searchButtonStyle: {
        marginTop: 'auto',
        marginBottom: 50,
        height: 60,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.blue
    },
    iconStyle: {
        width: 25,
        height: 25,
        tintColor: "gray",
        marginLeft: 10,
        marginTop:8,
        marginRight:20,
        alignSelf: 'flex-start',
        marginBottom: 15
    },
    distanceIconStyle: {
        width: 25,
        height: 25,
        tintColor: "#grey",
        marginLeft: 10,
        marginTop:8,
        marginRight:20,
        alignSelf: 'flex-start',
        marginBottom: 15
    },
    distanceTextStyle: {
        width: '120%',
        marginBottom:10,
        backgroundColor: '#D3D3D3',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
    }
})
