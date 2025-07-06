import { StyleSheet } from "react-native";

import Colors from "../../Utils/Colors";

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
        // height: '35%',
        // backgroundColor:'red',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:50
    },
    headerStyle: {
        marginBottom: 'auto'
    },
    bottomContainer: {
        width: '100%',
        height: '70%',
        marginTop: 'auto',
        backgroundColor: Colors.white,
        // backgroundColor: 'red',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    bottomInnerainContainer: {
        width: '100%',
        // height: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 15,
        // backgroundColor:'red'
    },
    mainHeading: {
        color: Colors.black,
        margin: 5,
        textAlign: 'center',
        fontFamily: "JosefinSans-Bold",
        fontSize: 28
    },
    loginButtonStyle: {
        backgroundColor: Colors.white,
        borderColor: Colors.green,
        borderWidth: 0.5,
        margin: 20,
        width: "90%"
    },
    loginButtonTextStyle: {
        color: Colors.green,
        fontFamily: 'Roboto-Medium'
    },
    forgotPasswordStyle: {
        marginTop: 50,
        fontSize: 15,
        fontFamily: 'Roboto-Regular'
    },
    newToSkollStyle: {
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
        color: Colors.LightGray
    },
    signUpButtonStyle: {
        fontSize: 20,
        color: Colors.blue,
        textDecorationLine: 'underline'
    },
    rowContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 70,
        backgroundColor: Colors.black,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom:30
    },
    socialButtonContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 'auto',
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
    },
    phoneContainer: {
        width: '90%',
        height:60,
        flexDirection:'row',
        backgroundColor: Colors.inputColor,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Colors.LightGray,
        marginTop: 20
    },
    phoneInputContainer: {
        width: '70%',
        height:50,
        backgroundColor:Colors.inputColor,
        borderWidth: 0,
        // height:'100%',
        marginBottom:20,
        marginRight:10,
        borderRadius: 20,
        alignSelf:'center',
    },
    countryImageContainer:{
        width:'30%',
        flexDirection:'row',
        justifyContent:'space-between',
        // backgroundColor:'red',
        alignSelf:'center'
    },
    statesContainer: {
        width: '90%',
        height:60,
        flexDirection:'row',
        backgroundColor: Colors.inputColor,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Colors.LightGray,
        marginTop: 20
    },
    statesInputContainer: {
        width: '80%',
        height:50,
        backgroundColor:Colors.inputColor,
        borderWidth: 0,
        // height:'100%',
        marginBottom:20,
        marginRight:10,
        borderRadius: 20,
        alignSelf:'center',
    },
    statesImageContainer:{
        width:50,
        alignItems:'center',
        paddingLeft:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignSelf:'center'
    },
    
    inputContainer: {
        width: '90%'
    },
    infoContainer: {
        width: '100%',
        marginTop: 15,
        alignSelf: 'center',
        // alignItems:'flex-start',
    },
    happyText: {
        marginLeft: 20,
        fontSize: 15,
        color:Colors.LightGray,
        fontFamily:'Moniker-Medium'
    },
    radioButtonContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    switchHeading: {
        marginLeft: 10,
        color: Colors.LightGray
    },
    policyHeading: {
        marginLeft: 20,
        marginTop: 3,
        fontSize: 15,
        color: Colors.LightGray,
        fontFamily:'Moniker-Medium'
    },
    policyText: {
        marginLeft: 20,
        marginTop: 3,
        fontSize: 12,
        color: Colors.LightGray
    },
    checkBoxContainer: {
        width: '100%',
        flexDirection: 'row',
    },
    checkBoxStyle: {
        alignSelf: 'center',
        marginLeft: 13,
        // marginTop:5,
        tintColors: Colors.blue,
        transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }]
    },
    agreeText: {
        alignSelf: 'center',
        marginBottom: 2,
        marginLeft: 5,
        color: Colors.LightGray
    }
})

export default Style;
