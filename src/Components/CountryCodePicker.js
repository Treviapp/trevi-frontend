// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, TextInput } from 'react-native';
// import CountryPicker from 'react-native-country-picker-modal';
// // import { getCountryCodeFromPhoneNumber } from '../utils/phoneUtils';

// const CountryCodePicker = () => {
//   const [countryCode, setCountryCode] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const countryPickerRef = useRef();

//   useEffect(() => {
//     if (phoneNumber) {
//     //   const code = getCountryCodeFromPhoneNumber(phoneNumber);
//       setCountryCode(code);
//     }
//   }, [phoneNumber]);

//   const handleCountrySelect = (country) => {
//     setCountryCode(country.cca2);
//   };

//   return (
//     <View>
//       <Text>Phone Number:</Text>
//       <TextInput
//         value={phoneNumber}
//         onChangeText={setPhoneNumber}
//         keyboardType='phone-pad'
//       />
//       <Text>Country Code:</Text>
//       <TouchableOpacity onPress={() => countryPickerRef.current.openModal()}>
//         <View>
//           <Text>{`+${CountryPicker.callingCode(countryCode)}`}</Text>
//           <CountryPicker
//             ref={countryPickerRef}
//             onChange={handleCountrySelect}
//             translation='eng'
//             cca2={countryCode}
//             filterable
//             closeable
//           />
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default CountryCodePicker;
