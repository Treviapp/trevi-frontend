import { StyleSheet } from "react-native";

import Colors from '../../Utils/Colors'

const Style = StyleSheet.create({
    mainContainer:{
        flex:1
    },
    shadowContainer: {
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: "rgba(10, 10, 10,0.5)",
        // backgroundColor:"red"

    },
    innerContainer: {
        width: '100%',
        // backgroundColor:'red',
        padding: 10,
        marginTop: 20,
        alignItems: 'center',
        height: '60%'
    },
    continueButtonStyle:{
        marginTop:'auto',
        backgroundColor:Colors.green
    },
    checkImageContainer:{
        width:'100%',
        marginTop:20,
        alignSelf:'center',
        alignItems:'center',
        // backgroundColor:'red'
    },
    checkMarkStyle:{
        width:120,
        height:150,
        tintColor:Colors.white
    },
    successTextContainer:{
        width:'100%',
        marginTop:15,
        alignSelf:'center',
        alignItems:'center',
        // backgroundColor:'red'
    },
    successTextStyle:{
        color:Colors.white,
        fontFamily:'JosefinSans-SemiBold',
        fontSize:20,
        textAlign:'center'
    }
})

export default Style;
