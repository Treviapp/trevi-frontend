import React, {
    useState,
    useEffect
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from 'react-native';

// Libraries
import { useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-simple-toast'

// Components
import Loader from './Loader';

// Files
import Images from '../Assets/Images';
import Colors from '../Utils/Colors';

// Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/actions/userSession';

// API Endpoints
import { logoutAPI, getProfileApi } from '../api/methods/auth';

const UserProfileBSComponent = (props) => {

    const { currentUser } = useSelector(state => state.userSession)
    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState('')

    const getUserProfile = async () => {
        try {
            
            setLoading(true)
            const response = await getProfileApi(currentUser?.user_id)
            setUserInfo(response.data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    const onLogoutPress = async () => {
        try {
            setLoading(true)
            const response = await logoutAPI()
            if (response.status == 200) {
                dispatch(logoutUser())
                Toast.show(response?.data?.message)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            Toast.show('Something went wrong!')
        }
    }

    useEffect(() => {
        getUserProfile()
    }, [])

    return (
        <SafeAreaView style={styles.mainContainer}>
           
            <ScrollView>
                <TouchableOpacity style={styles.rowContainer}
                    onPress={() => {
                        props?.navigation?.navigate('ProfileScreen')
                    }
                    }>
                    <View style={styles.innerRowContainer}>
                        {userInfo.profile_picture ?
                            <Image
                                style={{ width: 40, height: 40,borderRadius:100 }}
                                source={{uri: userInfo.profile_picture}}
                            /> :
                            <Image
                                style={{ width: 40, height: 40,borderRadius:20 }}
                                source={Images.profileAvatar}
                            />
                        }

                        <Text style={{
                            marginLeft: 10,
                            alignSelf: 'center',
                            fontSize: 18,
                            color: Colors.black,
                            fontFamily: 'JosefinSans-SemiBold',
                        }}>{`${userInfo.first_name ? userInfo.first_name : ' '}` + " " + `${userInfo.last_name ? userInfo.last_name : ' '}`}</Text>
                    </View>
                    <View style={styles.forwardIconContainer}>
                        <Image
                            source={Images.forwardIcon}
                            style={{ width: 8, height: 16, marginRight: 20, tintColor: Colors.forwardIconColor }}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.subRowContainer} onPress={() => props?.navigation?.navigate('NotificationScreen')}>
                    <View style={styles.innerRowContainer}>
                        <View style={styles.iconContainer}>
                            <Image
                                style={styles.iconStyle}
                                source={Images.NotificationIcon}
                            />
                        </View>
                        <Text style={styles.userName}>{"Notifications"}</Text>
                    </View>
                    <View style={styles.forwardIconContainer}>
                        <Image
                            source={Images.forwardIcon}
                            style={{ width: 8, height: 16, marginRight: 20, tintColor: Colors.forwardIconColor }}
                        />
                    </View>
                </TouchableOpacity>


                <TouchableOpacity style={styles.subRowContainer} onPress={() => props.navigation.navigate('HistoryScreen')}>
                    <View style={styles.innerRowContainer}>
                        <View style={[styles.iconContainer, { backgroundColor: Colors.LightBlue }]}>
                            <Image
                                style={styles.historyIconStyle}
                                source={Images.historyIcon}
                            />
                        </View>
                        <Text style={styles.userName}>{"History"}</Text>
                    </View>
                    <View style={styles.forwardIconContainer}>
                        <Image
                            source={Images.forwardIcon}
                            style={{ width: 8, height: 16, marginRight: 20, tintColor: Colors.forwardIconColor }}
                        />
                    </View>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.subRowContainer} onPress={() => ''}>
                    <View style={styles.innerRowContainer}>
                        <View style={[styles.iconContainer, { backgroundColor: Colors.paymentIconColor }]}>
                            <Image
                                style={styles.paymentIconStyle}
                                source={Images.paymentIcon}
                            />
                        </View>
                        <Text style={styles.userName}>{"Payment method"}</Text>
                    </View>
                    <View style={styles.forwardIconContainer}>
                        <Image
                            source={Images.forwardIcon}
                            style={{ width: 8, height: 16, marginRight: 20, tintColor: Colors.forwardIconColor }}
                        />
                    </View>
                </TouchableOpacity> */}

                <TouchableOpacity style={styles.subRowContainer}
                    onPress={() => props?.navigation?.navigate('AccountSettings')}>
                    <View style={styles.innerRowContainer}>
                        <View style={[styles.iconContainer, { backgroundColor: Colors.blue }]}>
                            <Image
                                style={styles.iconStyle}
                                source={Images.settingIcon}
                            />
                        </View>
                        <Text style={styles.userName}>{"Settings"}</Text>
                    </View>
                    <View style={styles.forwardIconContainer}>
                        <Image
                            source={Images.forwardIcon}
                            style={{ width: 8, height: 16, marginRight: 20, tintColor: Colors.forwardIconColor }}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.subRowContainer} onPress={() => props.navigation.navigate('HelpAndSupport')}>
                    <View style={styles.innerRowContainer}>
                        <View style={[styles.iconContainer, { backgroundColor: Colors.green }]}>
                            <Image
                                style={styles.iconStyle}
                                source={Images.questionMarkIcon}
                            />
                        </View>
                        <Text style={styles.userName}>{"Help & Support"}</Text>
                    </View>
                    <View style={styles.forwardIconContainer}>
                        <Image
                            source={Images.forwardIcon}
                            style={{ width: 8, height: 16, marginRight: 20, tintColor: Colors.forwardIconColor }}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.subRowContainer} onPress={() =>
                    props.navigation.navigate('FaqScreen')
                }>
                    <View style={styles.innerRowContainer}>
                        <View style={[styles.iconContainer, { backgroundColor: Colors.FaqIconColor }]}>
                            <Image
                                style={styles.iconStyle}
                                source={Images.swimmingTyerIcon}
                            />
                        </View>
                        <Text style={styles.userName}>{"Faq's"}</Text>
                    </View>
                    <View style={styles.forwardIconContainer}>
                        <Image
                            source={Images.forwardIcon}
                            style={{ width: 8, height: 16, marginRight: 20, tintColor: Colors.forwardIconColor }}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.subRowContainer} onPress={() => onLogoutPress()}>
                    <View style={styles.innerRowContainer}>
                        <View style={[styles.iconContainer, { backgroundColor: Colors.FaqIconColor }]}>
                            <Image
                                style={styles.iconStyle}
                                source={Images.logoutIcon}
                            />
                        </View>
                        <Text style={styles.userName}>{"Logout"}</Text>
                    </View>
                    <View style={styles.forwardIconContainer}>
                        <Image
                            source={Images.forwardIcon}
                            style={{ width: 8, height: 16, marginRight: 20, tintColor: Colors.forwardIconColor }}
                        />
                    </View>
                </TouchableOpacity>
            </ScrollView>
            <View style={{ margin: 5 }}></View>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView >
    );
};

export default UserProfileBSComponent;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        padding: 15
    },
    rowContainer: {
        width: '100%',
        flexDirection: 'row',
    },
    subRowContainer: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 30,
        borderBottomWidth: 0.5,
        borderColor: Colors.LightGray
    },
    innerRowContainer: {
        flexDirection: 'row',
        width: '60%',
        paddingLeft: 10,
    },
    userName: {
        marginLeft: 10,
        alignSelf: 'center',
        fontSize: 18,
        color: Colors.black,
        fontFamily: 'JosefinSans-SemiBold',
        marginBottom: 10
    },
    forwardIconContainer: {
        width: '40%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.yellow,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    iconStyle: {
        width: 20,
        height: 20,
        tintColor: Colors.white,
        alignSelf: 'center'
    },
    historyIconStyle: {
        width: 22,
        height: 20,
        tintColor: Colors.white,
        alignSelf: 'center'
    },
    paymentIconStyle: {
        width: 30,
        height: 20,
        tintColor: Colors.white,
        alignSelf: 'center'
    }
});
