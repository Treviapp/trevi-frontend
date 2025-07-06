import { StyleSheet } from 'react-native';

import Colors from '../../Utils/Colors';

const Style = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    imageBackGround: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop:'50%'
    },
    shadowContainer: {
        // flex:1,
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(10, 10, 10,0.5)",
        // tintColor:('rgba',68, 66, 65,0.6)

    },
    headingContainer: {
        width: '100%',
        height: '35%',
        // backgroundColor:'red',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop:5
    },
    headerStyle: {
        marginBottom: 'auto'
    },
    bottomContainer: {
        width: '100%',
        height: '70%',
        marginTop: 'auto',
        backgroundColor: Colors.white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    bottomInnerainContainer: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        marginTop:15,
        // backgroundColor:'red'
    },
    mainHeading: {
        color: Colors.black,
        margin: 5,
        fontFamily: "JosefinSans-Bold",
        fontSize: 28,
        marginLeft:20,
    },
    loginButtonStyle: {
        backgroundColor: Colors.white,
        borderColor: Colors.blueBorder,
        borderWidth: 0.5,
        margin: 20,
        marginTop:'auto',
        marginBottom:50,
        width:'90%'
    },
    loginButtonTextStyle: {
        color: Colors.blue,
        fontFamily: 'Roboto-Medium'
    },
    forgotPasswordStyle: {
        marginTop: 20,
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        color: Colors.LightGray
    },
    newToSkollStyle: {
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        color: Colors.LightGray
    },
    signUpButtonStyle: {
        fontSize: 15,
        color: Colors.blue,
        textDecorationLine: 'underline'
    },
    rowContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 'auto',
        // backgroundColor:'red',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    socialButtonContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 'auto',
        // backgroundColor:'red',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    orTextStyle: {
        margin: 10,
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        color: Colors.LightGray
    },
    facebookButtonStyle: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: Colors.blue,
        alignItems: 'center',
        alignSelf: 'center',
        marginHorizontal: 10
    },
    logoStyle: {
        width: '100%',
        height: '100%',
        alignSelf: 'center'
    }
})

export default Style;
