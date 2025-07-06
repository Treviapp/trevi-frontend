import { StyleSheet } from 'react-native';

import Colors from '../../Utils/Colors';

const Style = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    imageBackGround: {
        width: '100%',
        height: '100%',
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
    innerHeadingContainer: {
        width: '90%',
        alignSelf: 'center',
        // flexDirection:'row'
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
        // backgroundColor:'red'
    },
    mainHeading: {
        color: Colors.black,
        margin: 5,
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: "JosefinSans-Bold",
        fontSize: 20,
        // marginLeft: 95
    },
    optionsContainer: {
        marginTop: 15,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        width: '90%',
        alignSelf: 'flex-start',
        paddingLeft: 10,
        marginTop: 20
    },
    buttonText: {
        fontSize: 16,
        color: Colors.black,
        fontFamily: 'Moniker-Regular'
    },
    switchContainer: {
        marginTop: 15,
        width: '95%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    appVersionContainer: {
        width: '90%',
        marginTop: 'auto',
        marginBottom: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    appVersionText: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '600',
        color: "#000"
    }
})

export default Style;
