import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import _ from 'lodash'
import Colors from '../Utils/Colors';

// import { light } from '../common/theme';

export default class FloatingLabelInputField extends Component {
    state = {
        isFocused: false
    }
    render() {
        const {
            inputContainer,
            onParentPress,
            inputStyle,
            fieldRef,
            value,
            placeholder,
            onChangeText,
            onSubmitEditing,
            onFocus,
            onKeyPress,
            leftIcon,
            rightIcon,
            rightText,
            leftIconStyle,
            rightIconStyle,
            onRightIconPress,
            rightIconContainerStyle,
            hideLabel,
            labelStyle,
            labelContainerStyle,
            placeholderTextColor,
            leftComponent
        } = this.props
        const { isFocused } = this.state

        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    if (this.textInputLocalRef) this.textInputLocalRef.focus()
                    if (onParentPress && typeof onParentPress == 'function') onParentPress()
                }}
                style={[styles.inputContainer, inputContainer,{borderColor:  'black' }]}>
                {leftComponent ?
                    leftComponent
                    :
                    leftIcon &&
                    <Image
                        style={[styles.iconStyle, { marginRight: 5 }, leftIconStyle]}
                        source={leftIcon}
                    />
                }
                {!hideLabel && (isFocused || value?.length > 0) &&
                    <View
                        style={[{ position: 'absolute', top: -10, marginLeft: 10, backgroundColor: '#fff', paddingHorizontal: 5 }, labelContainerStyle]}>
                        <Text style={[{}, labelStyle]}>
                            {placeholder}
                        </Text>
                    </View>
                }
                <TextInput
                    {...this.props}
                    ref={ref => {
                        this.textInputLocalRef = ref
                        if (fieldRef && typeof fieldRef == 'function') fieldRef(ref)
                    }}
                    style={[styles.inputStyle, inputStyle,{color:isFocused?Colors.black : Colors.black, fontFamily:'Avenir Heavy'}]}
                    value={value}
                    placeholder={isFocused ? '' : placeholder}
                    placeholderTextColor={placeholderTextColor ? placeholderTextColor : '#00B3EC'}
                    onChangeText={(text) => {
                        if (onChangeText && typeof onChangeText == 'function') onChangeText(text)
                    }}
                    onSubmitEditing={() => {
                        if (onSubmitEditing && typeof onSubmitEditing == 'function') onSubmitEditing()
                    }}
                    onFocus={(event: Event) => {
                        this.setState({ isFocused: true })
                        if (onFocus && typeof onFocus == 'function') onFocus(event)
                    }}
                    onBlur={(event: Event) => {
                        this.setState({ isFocused: false })
                    }}
                    onKeyPress={({ nativeEvent }) => { if (onKeyPress && typeof onKeyPress == 'function') onKeyPress(nativeEvent) }}
                />
                {
                    rightIcon &&
                    <TouchableOpacity
                        disabled={_.isNil(onRightIconPress)}
                        style={[{ padding: 10 }, rightIconContainerStyle]}
                        onPress={() => {
                            if (onRightIconPress) onRightIconPress()
                        }}>
                        {rightText ?
                            <Text style={{}}>{rightText}</Text>
                            :
                            <Image
                                style={[styles.iconStyle, rightIconStyle]}
                                source={rightIcon}
                            />
                        }
                    </TouchableOpacity>
                }
            </TouchableOpacity >
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        height: 55,
        alignItems: 'center',
        // backgroundColor: 'white',
        margin: 20,
        paddingHorizontal: 15,
        borderBottomWidth:1,
        // borderRadius: 8,
        borderColor:'red',
        // backgroundColor:'#F5F6FA',
        alignSelf:'center',
        
    },
    labelContainerStyle: {
        // backgroundColor:'red'
    },
    inputStyle: {
        flex: 1,
    },
    iconStyle: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }
})
