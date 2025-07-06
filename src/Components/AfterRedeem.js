import React, { useEffect, useState } from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import Colors from "../Utils/Colors";
import Loader from "./Loader";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import { msgAfterRedeem } from "../api/methods/auth";

const AfterRedeem = ({ setModalShow, drinkInfo, modalShow }) => {
    let text = 'Your gift will be in your PayPal account in 24 hours'
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')
    const navigation = useNavigation();
    const isFocused= useIsFocused();
    useEffect(()=>{
       msgRedeem();
    },[])

    const msgRedeem = async()=>{
        try {
            // setLoading(true)
            const response = await msgAfterRedeem()
             setMsg(response?.data?.data?.commission)
        } catch (error) {
            // setLoading(false)
            console.log('Msg api error', error);
        }
    }
    
    return (

        <Modal transparent={true} visible={modalShow} style={styles.main} >
            <View style={styles.main}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 18,padding:10 }}>Redeem successfully</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.txt}>{msg}</Text>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        setModalShow(false)
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }]
                        })
                    }}>
                        <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 18 }}>Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

    )
}
export default AfterRedeem
const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#rgba(0,0,0,0.7)'
    },
    container: {
        width: '80%',
        height: '35%',
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: Colors.inputColor

    },
    subContainer: {
        backgroundColor: Colors.inputColor
    },
    txt: {
        fontSize: 16,
        color: Colors.blue,
        fontWeight: '700',
        padding: 10,
        fontFamily: 'JosefinSans-Bold',
        textAlign: 'center'
    },
    btn: {
        backgroundColor: Colors.green,
        width: '70%',
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position:'absolute',
        bottom:20
    },
    header:{
        width:'100%',
        backgroundColor:Colors.green,
        justifyContent:"center",
        alignItems:'center',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    }

})
