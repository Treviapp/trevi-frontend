import { StyleSheet } from 'react-native'

// Files
import Colors from '../../Utils/Colors'


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
        alignItems: 'center',
        marginTop: 15,
        alignItems: 'flex-start',
        padding: 15
        // backgroundColor:'red'
    },
    mainHeading: {
        color: Colors.black,
        margin: 5,
        marginLeft:15,
        // alignSelf:'center',
        fontFamily: "JosefinSans-Bold",
        fontSize: 35
    },
    description: {
        marginLeft: 15,
        fontSize: 20,
        marginTop: 10,
        fontFamily: 'Roboto-Regular',
        // alignSelf:'center'
    },
    nextButton: {
        alignSelf: 'center',
        marginTop: '20%',
        width: '90%',
        // marginLeft: 15,
    },
    inputContainer: {
        width: '90%',
        height: 50,
        backgroundColor: Colors.inputColor,
        // marginLeft: 15,
        // marginTop: '10%',
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
        alignSelf: 'center',
        // borderWidth: 0.5,
        borderColor: Colors.LightGray,
        // borderRadius: 25
    },
})

export default Style
