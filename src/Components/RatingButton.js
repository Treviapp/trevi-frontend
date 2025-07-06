import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'

import Images from '../Assets/Images'
import Colors from '../Utils/Colors'

const RatingButton = (props) => {

    const { label, onPress, mainContainer } = props

    return (
        <TouchableOpacity style={[styles.mainContainer,mainContainer]}
            onPress={onPress}
        >
            <Text style={styles.labelText}>{label}</Text>
            <Image
                // resizeMode='contain'
                style={styles.iconContainer}
                source={Images.starIcon}
            />
        </TouchableOpacity>
    )
}

export default RatingButton

const styles = StyleSheet.create({
    mainContainer: {
        width: 60,
        height: 50,
        backgroundColor: Colors.DarkGray,
        flexDirection: 'row',
        alignSelf: 'center',
        borderWidth:1,
        borderColor:Colors.white,
        borderRadius:5,
        alignItems:'center',
    },
    labelText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize:20,
        marginLeft:10
    },
    iconContainer: {
        width: 20,
        height: 20,
        marginLeft:5
    }
})
