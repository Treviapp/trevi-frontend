import React from "react";
import {
  Image,
  View, Text,
} from "react-native";

//Files
import Images from "../Assets/Images";
import Colors from "../Utils/Colors";


//Libraries 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Redux Imports 
import { useSelector } from "react-redux";


// Screens
import WelecomeBack from "../Screens/WelcomBack";
import ThankYou from "../Screens/ThankYou";
import SendDrink from "../Screens/SendDrink";
import ClaimADrink from "../Screens/ClaimADrink";
// import PersonLocation from "../Screens/PersonLocation";
import SelectDrink from "../Screens/SelectDrink";
import PaymentScreen from "../Screens/PaymentScreen";
import SuccessScreen from "../Screens/SuccessScreen"
import RecieveScreen from "../Screens/RecieveScreen";
import ThankyouMessageScreen from "../Screens/ThankyouMessageScreen";
import MessageSent from "../Screens/MessageSent";
import VenueScreen from "../Screens/VenueScreen";
import VenueDetail from "../Screens/VenueDetail";
import SuggestAVenue from "../Screens/SuggestAVenue";
import ChoosePaymentMethod from "../Screens/ChoosePaymentMethod";
import ProfileScreen from "../Screens/ProfileScreen";
import ExploreOffers from "../Screens/Explore Offers";
import NotificationScreen from "../Screens/NotificationScreen";
import AccountSettings from "../Screens/AccountSettings";
import ChangePassword from "../Screens/ChangePassword";
import BankDetailsScreen from "../Screens/BankDetailsScreen";
import MessageConfirmScreen from "../Screens/MessageConfirmScreen";
import RateTheVenueScreen from "../Screens/RateTheVenueScreen";
import ReviewSubmitScreen from "../Screens/ReviewSubmitScreen";
import FaqScreen from "../Screens/FaqScreen";
import ChangePhoneNo from "../Screens/ChangePhoneNo";
import HistoryScreen from '../Screens/HistoryScreen';
import HistoryDetailScreen from "../Screens/HistoryDetailScreen";
import HelpAndSupport from "../Screens/HelpAndSupporScreen";
import ChangeEmailScreen from '../Screens/ChangeEmailScreen';
import DeleteAccountScreen from "../Screens/DeleteAccountScreen";
import OffersDetailScreen from "../Screens/OffersDetailScreen";
import SearchOffers from "../Screens/Search Offers";
import SearchOffersDetail from "../Screens/SearchOffersDetail";
import NotificationDetails from "../Screens/NotificationDetails";
const Stack = createNativeStackNavigator()

const Tab = createBottomTabNavigator();

const SendDrinkStack = ({ route }) => {
  const params = route?.params?.name || false
  const searchOffers = route?.params?.searchOffers || false
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}>
      {params ?
        <Stack.Screen name="ExploreOffers" component={ExploreOffers} />
        :
        !params && searchOffers ?
          <Stack.Screen name="SearchOffers" component={SearchOffers} /> :
          <Stack.Screen name="SelectDrink" component={SelectDrink} />
      }
      <Stack.Screen name="SuggestAVenue" component={SuggestAVenue} />
      <Stack.Screen name="SendDrink" component={SendDrink} />
      {/* <Stack.Screen name="PersonLocation" component={PersonLocation} /> */}
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
      <Stack.Screen name="ChoosePaymentMethod" component={ChoosePaymentMethod} />
      <Stack.Screen name="ClaimADrink" component={ClaimADrink} />
    </Stack.Navigator>
  )
}

const ClaimADrinkStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="ClaimADrink" component={ClaimADrink} />
      <Stack.Screen name="RecieveScreen" component={RecieveScreen} />
      <Stack.Screen name="ThankyouMessageScreen" component={ThankyouMessageScreen} />
      <Stack.Screen name="MessageSent" component={MessageSent} />
      <Stack.Screen name="MessageConfirmScreen" component={MessageConfirmScreen} />
    </Stack.Navigator>
  )
}

const VenueStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="VenueScreen" component={VenueScreen} />
      <Stack.Screen name="VenueDetail" component={VenueDetail} />
    </Stack.Navigator>
  )
}

const BottomTabStack = ({ route }) => {

  const { _giftCounter } = useSelector(state => state.userSession)
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          width: '100%',
          position: 'absolute',
          alignSelf: 'center'
        }
      }}

      initialRouteName={
        'Home'
      }
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  width: 25,
                  height: 30,
                  tintColor: focused ? Colors.LightBlue : Colors.LightGray
                }}
                resizeMode='contain'
                source={Images.bottomHomeIcon}
              />
            )
          }
        }}
        name="Home" component={WelecomeBack} />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  width: 25,
                  height: 30,
                  tintColor: focused ? Colors.LightBlue : Colors.LightGray
                }}
                resizeMode='contain'
                source={Images.wineGlass}
              />
            )
          }
        }}
        name="Send" component={SendDrinkStack} />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Image
                  style={{
                    width: 25,
                    height: 30,
                    tintColor: focused ? Colors.LightBlue : Colors.LightGray
                  }}
                  resizeMode='contain'
                  source={Images.wineGlass}
                />
                {_giftCounter > 0 &&
                  <View style={{
                    height: 16,
                    width: 16,
                    position: "absolute",
                    backgroundColor: "red",
                    borderRadius: 100,
                    top: 2,
                    right: 32,
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    <Text style={{
                      color: 'white',
                      fontSize: 10,
                      fontWeight: "700"
                    }}>{_giftCounter}</Text>
                  </View>}
              </>
            )
          }
        }}
        name="Redeem" component={ClaimADrinkStack}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{
                  width: 25,
                  height: 30,
                  tintColor: focused ? Colors.LightBlue : Colors.LightGray
                }}
                resizeMode='contain'
                source={Images.venueIcon}
              />
            )
          }
        }}
        name="Venues" component={VenueStack}
      />
    </Tab.Navigator>
  )
}

const AppStack = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false

      }}
      initialRouteName="BottomTabStack">
      <Stack.Screen name="BottomTabStack" component={BottomTabStack} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="AccountSettings" component={AccountSettings} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="BankDetailsScreen" component={BankDetailsScreen} />
      <Stack.Screen name="RateTheVenueScreen" component={RateTheVenueScreen} />
      <Stack.Screen name="ReviewSubmitScreen" component={ReviewSubmitScreen} />
      <Stack.Screen name="FaqScreen" component={FaqScreen} />
      <Stack.Screen name="ChangePhoneNo" component={ChangePhoneNo} />
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      <Stack.Screen name="HistoryDetailScreen" component={HistoryDetailScreen} />
      <Stack.Screen name="NotificationDetails" component={NotificationDetails} />
      <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
      <Stack.Screen name="ChangeEmailScreen" component={ChangeEmailScreen} />
      <Stack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen} />
      <Stack.Screen name="OffersDetailScreen" component={OffersDetailScreen} />
      <Stack.Screen name="SearchOffersDetail" component={SearchOffersDetail} />
    </Stack.Navigator>
  )
}

export default AppStack;
