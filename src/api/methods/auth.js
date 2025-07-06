import {useSelector} from 'react-redux';
import {
  postRequest,
  getRequest,
  postWithFormRequest,
  getFilterRequest,
  deleteRequest,
} from '../index';

// const {currentUser} = useSelector(state=>state.userSession)

// Endpoints for Auth
export const signUpAPI = payload => postWithFormRequest('/register', payload);
export const signInAPI = payload => postWithFormRequest('/login', payload);
export const logoutAPI = () => postRequest('/logout');

// Endpoints for forgotPassword/ChangePassword
export const forgotPasswordAPI = payload =>
  postWithFormRequest('/forgot-password', payload);
export const verifyEmailOTP = payload =>
  postWithFormRequest('/verify-email-otp', payload);
export const resetUserPasswordAPI = payload =>
  postWithFormRequest('/reset-password', payload);
export const changePasswordApi = payload =>
  postWithFormRequest('/change-password', payload);

//End points for User verification
export const verifyUserAccount = payload =>
  postWithFormRequest('/verify-user-verification-otp', payload);
// export const verifyUserAccount = payload => postWithFormRequest('/is-valid-verify-account-otp', payload)
export const resendUserVerificationMail = payload =>
  postWithFormRequest('/resend-verification-mail', payload);

export const resendVerificationEmailAPI = payload =>
  postWithFormRequest('/resend-verification-mail', payload);
export const resendEmailOTP = payload =>
  postWithFormRequest('/resend-verification-mail', payload);
export const interestListApi = payload => getRequest('/interest-list', payload);
export const updateProfileApi = payload =>
  postWithFormRequest('/update-profile', payload);

// Endpoints for Drinks
export const getDrinkCategories = payload =>
  getRequest('/all-drink-categories', payload);
export const getVenues = (latitude, longitude) =>
  getRequest(`/venues-list?latitude=${latitude}&longitude=${longitude}`);
export const sendDrinkApi = payload =>
  postWithFormRequest('/send-a-drink', payload);

// Endpoints for phone verification
export const verifyPhoneApi = payload =>
  postWithFormRequest('/resend-phone-otp', payload);
export const verifyPhoneOtp = payload =>
  postWithFormRequest('/verify-phone-otp', payload);

// Endpoint for Claim a drink
export const giftsList = user_id =>
  getRequest(`/order-gifts-list/?user_id=${user_id}`);
export const redeemGift = payload =>
  postWithFormRequest('/redeem-gift', payload);
export const sendThankyouMessage = payload =>
  postWithFormRequest('/send-message', payload);

// export const getCountriesApi = payload => getRequest('/countries-list', payload)
export const getCountriesApi = payload =>
  getRequest('/allowed-country', payload);
export const getProfileApi = user_id =>
  getRequest(`/user-profile?user/${user_id}`);
export const getNotificationsList = payload =>
  getRequest('/notifications-list', payload);
export const getOriderLists = (type, user_id) =>
  getRequest(`/order-gifts-list?type='${type}'&user_id=${user_id}`);

// Endpoint for Marketing Preference
export const updateMarketingPreferenceApi = payload =>
  postWithFormRequest('/update-marketing-preference', payload);

// Endpoint for GetOffers
export const getAllOffersApi = payload => getRequest('/offers', payload);

// Endpoint to rate venue
export const rateVenue = payload => postWithFormRequest('/rate-venue', payload);

// To Issue Card Details
export const issueCardDetails = payload =>
  getRequest('/issuing-card-details', payload);

// To Change Phone Number
export const changePhoneNumber = payload =>
  postWithFormRequest('/change-phone-number', payload);

// To get history listing
export const historyListing = payload => getRequest('/history', payload);

// To get history detail
export const historyDetailsApi = orderId =>
  getRequest(`/history-details/${orderId}`);

// To get All Faqs
export const faqsApi = payload => getRequest('/faqs', payload);

// For help and support
export const helpSupport = payload =>
  postWithFormRequest('/help-and-support', payload);

// To Delete User Account
export const deleteAccount = payload =>
  deleteRequest('/delete-account', payload);

// To Change Email
export const changeEmail = payload => postRequest('/update-email', payload);

// To get Country States
export const getStatesByCountry = id => getRequest(`/state-by-country/${id}`);

// To get Admin Comission
export const getCommission = payload => getRequest('/admin-comission', payload);
export const getPaypalFees = payload => getRequest('/get-paypal-fees', payload);
export const getFixedCommision = payload => getRequest('/get-fixed-commission');
export const msgAfterRedeem = payload =>
  getRequest('/get-message/REDDEM_SUCCESS_MESSAGE');
// To get Offers
export const getOffersBySearch = searchText => {
  let endpoint = '';
  if (searchText?.length > 0) endpoint = `search_text=${searchText}`;
  return getRequest(`/offers?${endpoint}`);
};

// To Update Notificaiton Status
export const notificationStatusApi = payload =>
  postWithFormRequest('/update-notification-status', payload);
// Notification read-bit
export const markNotification = id => postRequest(`mark-as-read/${id}`);
// To Get Privacy Policy
export const getPrivacyPolicyApi = payload =>
  getRequest('/privacy-policy', payload);
