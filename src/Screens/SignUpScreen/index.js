import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    Switch,
    Keyboard,
} from 'react-native';


// Libraries
import Toast from 'react-native-simple-toast';
import CheckBox from '@react-native-community/checkbox';
import { useIsFocused } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import moment from "moment";


//Files
import Style from './Style';
import Images from '../../Assets/Images';
import Colors from '../../Utils/Colors';


//Components
import Header from '../../Components/Header';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import Loader from '../../Components/Loader';
import CountryPicker from '../../Components/CountryPicker'


// API Endpoints
import { getCountriesApi, getStatesByCountry, signUpAPI } from '../../api/methods/auth'

// Redux Imports
import { signInResponse, signupResponse } from '../../redux/actions/userSession'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import AddressPicker from '../../Components/AddressPicker';



const END_POINT = 'https://ws.postcoder.com/pcw/PCWQF-DRHPS-YJ464-M7H83/address/UK/'

const SignUpScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const timeoutRef = useRef()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    const [loading, setLoading] = useState(false)
    const [pushNotifcation, setPushNotification] = useState(true)
    const [smsSwitch, setSmsSwitch] = useState(true)
    const [emailSwitch, setEmailSwitch] = useState(true)
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [agreeMarket, setAgreeMarket] = useState(false)
    const [show, setShow] = useState(false)
    const [country, setCountry] = useState([])
    const [countryCode, setCountryCode] = useState(defaultCountry)
    const [defaultCountry, setDefaultCountry] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())
    const [dateCheck, setDateCheck] = useState(0)
    const [selectedYear, setSelectedYear] = useState('')
    const [addressLine1, setAddressLine1] = useState('')
    const [addressLine2, setAddressLine2] = useState('')
    const [city, setCity] = useState('')
    const [countryName, setCountryName] = useState(null)
    const [userState, setUserState] = useState('')
    const [zip, setZip] = useState('')
    const [stateShortName, setStateShortName] = useState('')
    const [countryShortName, setCountryShortName] = useState('')
    const [stateModal, setStateModal] = useState(false)
    const [addressModal, setAddressModal] = useState(false)
    const [countryStatesList, setCountryStatesList] = useState([])
    const [selectedState, setSelectedState] = useState('')
    const [countryModal, setCountryModal] = useState(false)
    const [disabledRegister, setDisabledRegister] = useState(false)
    const [defaultCountryName, setDefaultCountryName] = useState('')

    const pushNotifcationToggleSwitch = () => setPushNotification(previousState => !previousState);
    const smsToggleSwitch = () => setSmsSwitch(previousState => !previousState)
    const emailToggleSwitch = () => setEmailSwitch(previousState => !previousState)

    const [countryPostCode, setCountryPostCode] = useState("United Kingdom")
    const [searchterm, setSearchterm] = useState()
    const [addresslines, setAddresslines] = useState(15)
    const [postCodeData, setPostCodeData] = useState([])


    const postCodeFunc = async (text) => {
        try {
            setLoading(true)
            const response = await axios.get(END_POINT + text, {
                headers: {
                    "Accept": "application/json"
                }
            })

            console.log("postCodeFunc-response.status", response.status)
            if (response.status == 200) {
                setLoading(false)
                console.log("postCodeFunc-response.data", response.data)
                setPostCodeData(response?.data)
                setAddressModal(true)
            }
        } catch (error) {
            setLoading(false)
            console.log("postCodeFunc-error", error)
        }
    }

    useEffect(() => {
        isPickerShowFalse()
        getCountires()
    }, [])

    const isPickerShowFalse = () => {
        setShow(false)
        setCountryModal(false)
        setStateModal(false)
    }

    // To Check Input Fields
    const inputcheck = async () => {
        if (firstName === "") {
            Toast.show("First Name is required");
        }
        else if (lastName === "") {
            Toast.show("Last Name is required");
        }
        else if (phoneNo === "") {
            Toast.show("Phone No is required");
        }
        else if (email === "") {
            Toast.show("Email is required");
        }
        else if (email === undefined ||
            email === '' ||
            email.length <= 0 ||
            !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            Toast.show("Please enter valid email")
        }
        else if (password === "") {
            Toast.show("Enter Password");
        }
        else if (password.length < 8) {
            Toast.show("Password must be atleast 8 characters")
        }
        else if (selectedYear < 18) {
            Toast.show("You must be above 18 to use this app!")
        }
        // else if (city === '') {
        //     Toast.show("Please enter city")
        // }
        else if (agreeTerms == false) {
            Toast.show("Please accept terms & conditions")
        }
        // else if (agreeMarket == false) {
        //     Toast.show("Please accept marketing communication")
        // }
        else if (phoneNo.startsWith(0)) {
            let newPhone = phoneNo
            newPhone = newPhone.replace(0, ' ')
            setPhoneNo(newPhone)
            signUpFunction(newPhone)

        }
        else if (phoneNo.startsWith("+44")) {
            let newPhone = phoneNo
            newPhone = newPhone.replace("+44", ' ')
            setPhoneNo(newPhone)
            signUpFunction(newPhone)
        }
        else {
            signUpFunction()
        }
    };

    // SignUp APi Function
    const signUpFunction = async (newPhone) => {

        const formData = new FormData()
        formData.append('role', 'customer')
        formData.append('first_name', firstName)
        formData.append('last_name', lastName)
        formData.append('date_of_birth', moment(date).format('DD-MM-YYYY'))
        formData.append('email', email)
        formData.append('phone_code', defaultCountry?.phone_code)
        formData.append('phone', newPhone ? newPhone : phoneNo)
        formData.append('password', password)
        formData.append('is_allow_push', pushNotifcation)
        formData.append('is_allow_sms', smsSwitch)
        formData.append('is_allow_email', emailSwitch)
        if(addressLine1 !=''){
            formData.append('address_line_1', addressLine1)
        }
        if(addressLine2 !=''){
            formData.append('address_line_2', addressLine2)
        }
        if(city !=''){
            formData.append('city', city)
        }
        
        formData.append('country', countryName?.name || defaultCountry?.name)
        if(selectedState != ''){
            formData.append('state', selectedState?.name)
        }
        if(zip != ''){
            formData.append('zip', zip)
        }
        if(countryName !=null || defaultCountry !=null){
            formData.append('country_short_name', countryName?.code || defaultCountry?.code)
        }
        
        console.log('sendingData:', JSON.stringify(formData))
        try {
            setLoading(true)
            const response = await signUpAPI(formData)
            console.log("sign-up api response---=>", response?.data);
            if (response.status == 200) {
                Toast.show(response.data.message)
                navigation.navigate('VerificationScreen', {
                    userPhoneCode: defaultCountry?.phone_code,
                    countryCodeImage: countryCode?.image || defaultCountry?.image,
                    userPhone: newPhone ? newPhone : phoneNo,
                    email: email,
                    newUser: true
                })
                // navigation.navigate('PhoneVerificationScreen', {
                //     email: email,
                //     phoneNo: (countryCode?.phone_code || defaultCountry?.phone_code) + phoneNo,
                //     countryCodeImage: countryCode?.image || defaultCountry?.image,
                //     newUser: true
                // })
            }
            setLoading(false)
        } catch (error) {
            console.log('eroor1-->>', error)
            console.log('eroor2-->>', error?.response?.data)
            Toast.show(error.response.data.error.message)
            setLoading(false)
        }
    }

    const getCountires = async () => {
        try {
            const response = await getCountriesApi()
            setCountry(response.data.data)
            console.log('countries-=-=',response.data.data);
            setDefaultCountryName(response?.data?.data[1]?.name)
            setDefaultCountry(response?.data?.data[1])
            getAllCountryStates(response?.data?.data[1]?.id)
        } catch (error) {
            console.log('countries api error==>>', error)
        }
    }

    const getAllCountryStates = async (countryId) => {
        setLoading(true)
        try {
            const response = await getStatesByCountry(countryId)
            setCountryStatesList(response?.data?.data)
            setSelectedState(response?.data?.data[0])
        } catch (error) {
            console.log('erroor===>>>', error?.response?.data);
        }
        finally {
            setLoading(false)
        }
    }

    const dateValidity = (selectedDate) => {
        let defaultDate = new Date()
        let momentDefaultDate = moment(defaultDate).format('DD-MM-YYYY')
        let defaultYear = moment(selectedDate).format('DD-MM-YYYY')
        let checkYear = moment(momentDefaultDate, 'DD-MM-YYYY').diff(moment(defaultYear, 'DD-MM-YYYY'), 'year')
        setSelectedYear(checkYear)
        setDate(selectedDate)
    }

    const onChnagePostCode = (text) => {

        if (/^[0-9 a-zA-Z ]*$/.test(text) && (countryName?.name || defaultCountry?.name) === 'United Kingdom') {
            if (zip.length == 3 && text.length == 4) {
                if (text.substr(4, 1) != ' ') {
                    text = zip + ' ' + text.substr(4, text.length - 1);
                }
                setZip(text)
            }
            else {
                setZip(text)
            }
        }
        else {
            setZip(text)
        }
    }

    return (
        <View style={Style.mainContainer}>
            <ImageBackground
                source={Images.friendsCheering}
                style={Style.imageBackGround}
            >
                <View style={Style.shadowContainer}>
                    <View style={Style.headingContainer}>
                        <Header
                            headerStyle={Style.headerStyle}
                        />
                    </View>
                    <View style={Style.bottomContainer}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps={"handled"}>
                            <View style={Style.bottomInnerainContainer}>
                                <Text style={Style.mainHeading}>
                                    {"Create new account"}
                                </Text>
                                {/* First Name Input */}
                                <CustomInput
                                    mainContainer={Style.inputContainer}
                                    placeholder={"FIRST NAME"}
                                    value={firstName}
                                    onChangeText={(text) => setFirstName(text)}
                                />

                                {/* Last Name Inpuut */}
                                <CustomInput
                                    mainContainer={Style.inputContainer}
                                    placeholder={"LAST NAME"}
                                    value={lastName}
                                    onChangeText={(text) => setLastName(text)}
                                />

                                {/* Calendar Input */}

                                <CustomInput
                                    mainContainer={Style.inputContainer}
                                    placeholder={"Date of Birth"}
                                    value={dateCheck === 1 ? moment(date).format('DD-MM-YYYY') : "Date of Birth"}
                                    source={Images.calendarIcon}
                                    editable={false}
                                    onPress={() => {
                                        setOpen(true)
                                        setDateCheck(1)
                                    }} />

                                {/* Phone Inpuut */}
                                <View style={Style.phoneContainer}>
                                    <View style={Style.countryImageContainer}>
                                        <Image
                                            resizeMode='contain'
                                            style={{ width: 40, height: 30, marginLeft: 15 }}
                                            source={{ uri: countryCode?.image ? countryCode?.image : defaultCountry?.image }}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setShow(true)}
                                        >
                                            <Image
                                                style={{ width: 25, height: 25, marginRight: 10, marginTop: 5, tintColor: Colors.LightGray }}
                                                source={Images.downArrow}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <CustomInput
                                        mainContainer={Style.phoneInputContainer}
                                        placeholder={"PHONE NO."}
                                        value={phoneNo}
                                        maxLength={16}
                                        keyboardType={'phone-pad'}
                                        onChangeText={(text) => setPhoneNo(text)}
                                    />
                                </View>

                                {/* Email Input */}
                                <CustomInput
                                    mainContainer={Style.inputContainer}
                                    placeholder={"EMAIL"}
                                    value={email}
                                    keyboardType={'email-address'}
                                    onChangeText={(text) => setEmail(text)}
                                />
                                {/* Passowrd Input */}

                                <CustomInput
                                    mainContainer={Style.inputContainer}
                                    placeholder={"PASSWORD"}
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                    secureTextEntry={showPassword}
                                    source={showPassword ? Images.invisiblePasswordIcon : Images.visiblePasswordIcon}
                                    onPress={() => {
                                        setShowPassword(!showPassword)
                                    }}
                                />
                                {/* Country Input */}
                                <View style={Style.phoneContainer}>
                                    <View style={Style.countryImageContainer}>
                                        <Image
                                            resizeMode='contain'
                                            style={{ width: 40, height: 30, marginLeft: 15 }}
                                            source={{ uri: countryName?.image || defaultCountry?.image }}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setCountryModal(true)}
                                        >
                                            <Image
                                                style={{ width: 25, height: 25, marginRight: 10, marginTop: 5, tintColor: Colors.LightGray }}
                                                source={Images.downArrow}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <CustomInput
                                        mainContainer={Style.phoneInputContainer}
                                        placeholder={"Country"}
                                        value={countryName?.name || defaultCountryName}
                                        editable={false}
                                    />
                                </View>
                                {(countryName?.name || defaultCountryName) === "United Kingdom" ?
                                    <>
                                        <CustomInput
                                            mainContainer={Style.inputContainer}
                                            placeholder={"POST CODE"}
                                            maxLength={10}
                                            value={zip}
                                            source={Images.searchIcon}
                                            onChangeText={(text) => {
                                                // if (timeoutRef.current) clearTimeout(timeoutRef.current)
                                                // timeoutRef.current = setTimeout(() => {
                                                //     postCodeFunc(encodeURIComponent(text))
                                                // }, 3000);
                                                // onChnagePostCode(text)
                                                setZip(text)
                                            }}
                                            onPress={() => { postCodeFunc(encodeURIComponent(zip)) }}
                                            disableLeftIcon={zip ? false : true}
                                        />
                                        {postCodeData.length > 1 ? <>
                                            <View style={Style.statesContainer}>
                                                <CustomInput
                                                    mainContainer={Style.statesInputContainer}
                                                    placeholder={"SELECT AN ADDRESS"}
                                                    value={selectedState}
                                                    // maxLength={20}
                                                    // keyboardType={'numeric'}
                                                    editable={false}
                                                // onChangeText={(text) => setSelectedState(text)}
                                                />
                                                <View style={Style.statesImageContainer}>
                                                    <TouchableOpacity
                                                        onPress={() => setAddressModal(true)}>
                                                        <Image
                                                            style={{
                                                                width: 25,
                                                                height: 25,
                                                                // marginRight: 10, 
                                                                marginTop: 5,
                                                                alignSelf: 'center',
                                                                tintColor: Colors.LightGray,
                                                            }}
                                                            source={Images.downArrow}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            {/* Address Line 1 */}
                                            <CustomInput
                                                mainContainer={Style.inputContainer}
                                                placeholder={"ADDRESS LINE 1"}
                                                value={addressLine1}
                                                onChangeText={(text) => setAddressLine1(text)}
                                            />
                                            {/* Address Line 2 */}
                                            <CustomInput
                                                mainContainer={Style.inputContainer}
                                                placeholder={"ADDRESS LINE 2"}
                                                value={addressLine2}
                                                onChangeText={(text) => setAddressLine2(text)}
                                            />
                                            {/* City */}
                                            <CustomInput
                                                mainContainer={Style.inputContainer}
                                                placeholder={"CITY"}
                                                value={city}
                                                onChangeText={(text) => setCity(text)}
                                            />
                                        </> : null}
                                    </> :
                                    <>
                                        {/* Address Line 1 */}
                                        <CustomInput
                                            mainContainer={Style.inputContainer}
                                            placeholder={"ADDRESS LINE 1"}
                                            value={addressLine1}
                                            onChangeText={(text) => setAddressLine1(text)}
                                        />
                                        {/* Address Line 2 */}
                                        <CustomInput
                                            mainContainer={Style.inputContainer}
                                            placeholder={"ADDRESS LINE 2"}
                                            value={addressLine2}
                                            onChangeText={(text) => setAddressLine2(text)}
                                        />
                                        {/* City */}
                                        <CustomInput
                                            mainContainer={Style.inputContainer}
                                            placeholder={"CITY"}
                                            value={city}
                                            onChangeText={(text) => setCity(text)}
                                        />
                                        <CustomInput
                                            mainContainer={Style.inputContainer}
                                            placeholder={"STATE"}
                                            value={selectedState}
                                            onChangeText={(text) => setSelectedState(text)}
                                        />
                                        <CustomInput
                                            mainContainer={Style.inputContainer}
                                            placeholder={"POST CODE"}
                                            value={zip}
                                            onChangeText={(text) => setZip(text)}
                                        />
                                        {/* State Inpuut */}
                                        {/* <View style={Style.statesContainer}>
                                            <View style={Style.statesImageContainer}>
                                                <TouchableOpacity
                                                    onPress={() => setStateModal(true)}
                                                >
                                                    <Image
                                                        style={{
                                                            width: 25,
                                                            height: 25,
                                                            // marginRight: 10, 
                                                            marginTop: 5,
                                                            alignSelf: 'center',
                                                            tintColor: Colors.LightGray,
                                                        }}
                                                        source={Images.downArrow}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            <CustomInput
                                                mainContainer={Style.statesInputContainer}
                                                placeholder={"STATE"}
                                                value={selectedState?.name}
                                                // maxLength={20}
                                                // keyboardType={'numeric'}
                                                editable={false}
                                            // onChangeText={(text) => setSelectedState(text)}
                                            />
                                        </View> */}
                                    </>}
                                <View style={Style.infoContainer}>
                                    <Text style={Style.happyText}>{"Are you happy to hear from us via"}</Text>
                                    <View style={Style.radioButtonContainer}>
                                        <Text style={{ marginLeft: 20, color: Colors.LightGray }}>{"Push Notification"}</Text>
                                        <Switch
                                            trackColor={{ true: Colors.green, false: Colors.LightGray }}
                                            thumbColor={pushNotifcation ? Colors.green : Colors.LightGray}
                                            value={pushNotifcation}
                                            style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                                            onValueChange={pushNotifcationToggleSwitch}
                                        />
                                        <Text style={Style.switchHeading}>{"SMS"}</Text>
                                        <Switch
                                            trackColor={{ true: Colors.green, false: Colors.LightGray }}
                                            thumbColor={smsSwitch ? Colors.green : Colors.LightGray}
                                            value={smsSwitch}
                                            style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                                            onValueChange={smsToggleSwitch}
                                        />
                                        <Text style={Style.switchHeading}>{"Email"}</Text>
                                        <Switch
                                            trackColor={{ true: Colors.green, false: Colors.LightGray }}
                                            thumbColor={emailSwitch ? Colors.green : Colors.LightGray}
                                            value={emailSwitch}
                                            onValueChange={emailToggleSwitch}
                                            style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                                        />
                                    </View>
                                    <Text style={Style.policyHeading}>{'Privacy Policy'}</Text>
                                    <Text style={Style.policyText}>{'By registering for the use of this app, I confirm that I am over the age of 18 and have read and accepted the terms of the '}<Text onPress={() => navigation.navigate('PrivacyPolicy')} style={[Style.policyText, { color: Colors.blue }]}>{'privacy policy.'}</Text></Text>
                                    <View style={Style.checkBoxContainer}>
                                        <CheckBox
                                            tintColors={{ true: Colors.green, false: Colors.LightGray }}
                                            style={Style.checkBoxStyle}
                                            value={agreeTerms}
                                            onValueChange={(value) => setAgreeTerms(value)}
                                        />
                                        {/* <Text style={Style.agreeText}>{"Yes I agree"}</Text> */}
                                        <Text style={Style.agreeText}>{"I accept Term and Conditions"}</Text>
                                    </View>
                                    <View style={Style.checkBoxContainer}>
                                        <CheckBox
                                            tintColors={{ true: Colors.green, false: Colors.LightGray }}
                                            style={Style.checkBoxStyle}
                                            value={agreeMarket}
                                            onValueChange={(value) => setAgreeMarket(value)}
                                        />
                                        <Text style={Style.agreeText}>{"I agree to accept marketing communications"}</Text>
                                    </View>
                                </View>
                                <CustomButton
                                    mainButtonStyle={[Style.loginButtonStyle, {
                                        backgroundColor: firstName.length > 0 && lastName.length > 0 &&
                                            phoneNo.length > 0 && email.length && password.length > 0 ? Colors.green : 'transparent'
                                    }]}
                                    btnTextStyle={[Style.loginButtonTextStyle, {
                                        color: firstName.length > 0 && lastName.length > 0 &&
                                            phoneNo.length > 0 && email.length && password.length > 0 ? Colors.white : Colors.green
                                    }]}
                                    label={"REGISTER"}
                                    onPress={() => {
                                        Keyboard.dismiss()
                                        inputcheck()
                                        // navigation.navigate("PhoneVerificationScreen")
                                    }}
                                />
                                <View style={Style.rowContainer}>
                                    <Text style={Style.newToSkollStyle}>{"Already have an account? "}</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                                        <Text style={Style.signUpButtonStyle}>{"Sign in"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode='date'
                    placeholder="select date"
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                        dateValidity(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }} />

                {/* For Countries List */}
                <CountryPicker
                    isVisible={show}
                    onPress={() => setShow(false)}
                    data={country}
                    placeholder={'Search country'}
                    onCountryPress={(itemDetails) => {
                        setShow(false)
                        setCountryCode(itemDetails)
                    }}
                />
                {/* To Select Country */}
                <CountryPicker
                    isVisible={countryModal}
                    onPress={() => setCountryModal(false)}
                    data={country}
                    placeholder={'Search country'}
                    onCountryPress={(itemDetails) => {
                        setCountryModal(false)
                        setCountryName(itemDetails)
                        getAllCountryStates(itemDetails?.id)
                    }}
                />
                {/* For Country States List */}
                <CountryPicker
                    placeholder={'Search State'}
                    isVisible={stateModal}
                    onPress={() => setStateModal(false)}
                    data={countryStatesList}
                    onCountryPress={(itemDetails) => {
                        setStateModal(false)
                        setSelectedState(itemDetails)
                    }}
                />
                {/* For Address Picker */}
                <AddressPicker
                    isVisible={addressModal}
                    data={postCodeData}
                    onPress={() => setAddressModal(false)}
                    onCountryPress={(itemDetails) => {
                        setAddressLine1(itemDetails?.number + " " + itemDetails?.street)
                        setAddressLine2(itemDetails?.county)
                        setCity(itemDetails?.posttown)
                        setZip(itemDetails?.postcode)
                        setSelectedState(itemDetails?.summaryline)
                        setAddressModal(false)
                    }}
                />
            </ImageBackground>
            <Loader loading={loading} isShowIndicator={true} />
        </View>
    );
};

export default SignUpScreen;


