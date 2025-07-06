import {sendDrinkApi} from '../api/methods/auth';
import ChoosePaymentMethod from '../Screens/ChoosePaymentMethod';

// const SendDrink = async (res) => {
//     console.log("Response====>>", res);
//     // To remove white spaces
//     let formatedPhoneNo = ''
//     let phoneNo = messageInfo?.senderPhone
//     formatedPhoneNo = phoneNo.replace(/\s+/g, '')
//     formatedPhoneNo = formatedPhoneNo.replace(formatedPhoneNo.charAt(0), "+")
//     try {
//         setLoading(true)
//         const formData = new FormData()
//         // formData.append('user_id', currentUser?.user_id)
//         // formData.append('phone', formatedPhoneNo.replace(/-/g, ""))
//         // formData.append('message', messageInfo?.senderMessage)
//         // formData.append('name', messageInfo?.senderName)
//         // formData.append('total_price', totalPrice);
//         formData.append('place_id', 1);
//         formData.append('longitude', 1);
//         formData.append('latitude', 1);
//         formData.append('country', 1);
//         formData.append('address', Address);
//         formData.append('venue', 1);
//         formData.append('payment_gateway', "paypal");
//         formData.append('total_price', 100);
//         formData.append('phone:', 9724931762);
//         formData.append('message:', 'message');
//         formData.append('name:', "neel");
//         formData.append('drink_array[0][drink_id]:', 1);
//         formData.append('amount:', 100);
//         formData.append('transition_id:', "asasasa6s564ewe");
//         formData.append('paypal_fees:', 5);
//         formData.append('commission:', 1);
//         // drinkDetails?.map((item, index) => {
//         //     formData.append(`drink_array[${index}]`, `[{"drink_id": ${item?.id},"quantity": "1"}]`)
//         // })
//         // formData.append('image', messageInfo?.messagePhoto)
//         // formData.append('payment_gateway', 'Paypal')
//         // formData.append('card_number', cardNumber)
//         // formData.append('expire_date', cardExpiry)
//         // formData.append('cvv', cardCvc)
//         // if (selectedVenue?.id) {
//         //     formData.append('venue', selectedVenue?.id)
//         // }
//         // else {

//         //     let city = selectedVenue.vicinity;
//         //     city = city.split(',');

//         //     let countryName = selectedVenue?.plus_code?.compound_code
//         //     countryName = countryName.split(',')

//         //     formData.append('venue_name', selectedVenue?.name)
//         //     formData.append('address', selectedVenue?.vicinity)
//         //     formData.append('address_line_2', selectedVenue?.vicinity)
//         //     formData.append('city', city[1])
//         //     formData.append('state', city[1])
//         //     formData.append('country', countryName[1])
//         //     formData.append('latitude', selectedVenue?.geometry?.location?.lat)
//         //     formData.append('longitude', selectedVenue?.geometry?.location?.lng)
//         //     formData.append('place_id', selectedVenue?.place_id)
//         // }
//         // return false
//         const response = await sendDrinkApi(formData)
//         if (response.status == 200) {
//             navigation.navigate('SuccessScreen', {
//                 messageInfo: messageInfo?.senderName,
//                 drinkDetails: drinkDetails
//             })
//         }
//         setLoading(false)
//     } catch (error) {
//         setLoading(false)
//         Toast.show(error?.response?.data?.error?.message)
//     }
// }

// let baseUrl = 'https://api-m.sandbox.paypal.com';
// import base64 from 'base-64';
// let ClientId =
//   'AUEK-afmUzo0WE0mqJDXG0Pj9OE1dsfa2LAonQfgxLgttxhk39uNNNPhV3_JD57x2MZ8BHJDZe9ccZsT';
// let secretkey =
//   'EKcttnGX7ivOyXp5ZbXFF7N-fElQVbt4LSzJFZfmWSSq9TWT979LsT_BuaTb5NJrNPklHORMBll97qAY';
const baseUrl = 'https://api.paypal.com'; //Live
const ClientId =
  'Afkgv-0RalsuZZVLfL-rgVOopS2rMuUPCg07ZQNP6sY5a4H6pPX2nhZpGjX7b8-TsbLMoqWHGl950SSf';
const secretkey =
  'EA9BDtiQlLjIOlMcUgwrIr98DDgD3RwJxn-Nbwc8M-zQoIiI6TGsaEzdO_K-PJkgzaUcg-3Vr3SMpTNz';
// const baseUrl = 'https://api-m.sandbox.paypal.com'; //Sandbox
// const ClientId =
//   'AUEK-afmUzo0WE0mqJDXG0Pj9OE1dsfa2LAonQfgxLgttxhk39uNNNPhV3_JD57x2MZ8BHJDZe9ccZsT';
// const secretkey =
//   'EKcttnGX7ivOyXp5ZbXFF7N-fElQVbt4LSzJFZfmWSSq9TWT979LsT_BuaTb5NJrNPklHORMBll97qAY';


let orderDetail = {
  intent: 'CAPTURE',
  purchase_units: [
    {
      items: [
        {
          name: 'Drink',
          description: 'Green XL',
          quantity: '1',
          unit_amount: {
            currency_code: 'GBP',
            value: '1.00',
          },
        },
      ],
      amount: {
        currency_code: 'GBP',
        value: '1.00',
        breakdown: {
          item_total: {
            currency_code: 'GBP',
            value: '1.00',
          },
        },
      },
    },
  ],
  application_context: {
    return_url: 'https://example.com/return',
    cancel_url: 'https://example.com/cancel',
  },
};

const generateToken = () => {
  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append(
    'Authorization',
    'Basic ' + base64.encode(`${ClientId}:${secretkey}`),
  );

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: 'grant_type=client_credentials',
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + '/v1/oauth2/token', requestOptions)
      .then(response => response.text())
      .then(result => {
        const {access_token} = JSON.parse(result);
        resolve(access_token);
      })
      .catch(error => {
        console.log('error raised ', error);
        reject(error);
      });
  });
};

const createOrder = (token = '', props) => {
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderDetail),
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + '/v2/checkout/orders', requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result);
        resolve(res);
      })

      .catch(error => {
        console.log('error raised ', error);
        reject(error);
      });
  });
};

const capturePayment = (id, token = '') => {
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + `/v2/checkout/orders/${id}/capture`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result);
        resolve(res);
        // SendDrink(res)
      })

      .catch(error => {
        console.log('error raised ', error);
        reject(error);
      });
  });
};

export default {
  generateToken,
  createOrder,
  capturePayment,
};
