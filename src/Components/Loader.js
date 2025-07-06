import React from 'react';
import { 
    View, 
    ActivityIndicator,
    Text, 
    StyleSheet, 
} from 'react-native';

//Files
import Colors from '../Utils/Colors';


export default Loader = (props) => {
    const { loading, style, containerStyle, color, size ,isText,isShowIndicator} = props

    if (loading)
        return (
            <View style={[styles.container, containerStyle]}>
                {/* {loading && */}
                {isShowIndicator &&
                    <ActivityIndicator
                        // animating={loading}
                        animating={isShowIndicator}
                        size={size ? size : 'large'}
                        color={color ? color : Colors.blue}
                        style={[{ marginLeft: 5 }, style ? style : {}]}
                    />
                }
                {isText &&
                    <Text style={{fontSize:16,fontWeight:'bold'}}>Loading</Text>
                }
            </View>
        )
    else return null
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#00000000',
        // backgroundColor: (colors.white + '30'),
        alignItems: 'center',
        justifyContent: 'center',
    }
})
