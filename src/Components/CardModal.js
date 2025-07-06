import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Text,
  Dimensions,
  Modal,
  Image,
} from 'react-native';

import Colors from '../Utils/Colors';
import CustomButton from './CustomButton';

import Images from '../Assets/Images';
import {useIsFocused} from '@react-navigation/native';

const CardModal = props => {
  const {isVisible, cardInfo, onPress} = props;

  const isFocused = useIsFocused();

  const [cardNumber, setCardNumber] = useState('');

  useEffect(() => {
    if (cardInfo?.number) {
      SetCardInput(cardInfo?.number);
    }
  }, [cardInfo?.number]);

  const SetCardInput = text => {
    let newString;
    newString = text
      .replace(/[^\dA-Z]/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
    setCardNumber(newString);
  };

  return (
    <View>
      <Modal transparent={true} visible={isVisible}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={[styles.container, props.modalContainerStyle]}>
            <View style={styles.cardContainer}>
              <Text style={styles.cardNumberHeading}>{'Card Number'}</Text>
              <Text style={styles.cardNumber}>{cardNumber}</Text>

              <View style={styles.cvcRowContainer}>
                <View style={{width: 90}}>
                  <Text style={styles.cardNumberHeading}>{'CVC'}</Text>
                  <Text style={styles.expiryText}>{cardInfo?.cvc}</Text>
                </View>
                <View style={{width: 90, justifyContent: 'center'}}>
                  <Text style={styles.cardNumberHeading}>{'Expiry'}</Text>
                  <Text style={styles.expiryText}>
                    {'0' + cardInfo?.exp_month + '/' + cardInfo?.exp_year}
                  </Text>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <Text style={styles.cardNumberHeading}>
                  {'Available Balance:'}
                </Text>
                <Text style={styles.balanceText}>
                  {cardInfo?.available_balance}
                </Text>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.visaImage}
                    source={Images.visaIcon}
                    resizeMode={'contain'}
                  />
                </View>
              </View>
            </View>

            <CustomButton label={'CONTINUE'} onPress={onPress} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CardModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardGray,
    alignSelf: 'center',
    height: 300,
    width: '90%',
    alignItems: 'center',
    borderRadius: 20,
  },
  containerHeader: {
    fontFamily: 'JosefinSans-Bold',
    fontSize: 16,
    marginTop: 20,
    color: Colors.blue,
    textAlign: 'center',
  },
  cardContainer: {
    width: '90%',
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  cardNumber: {
    color: Colors.white,
    fontSize: 25,
    marginTop: 5,
  },
  expiryText: {
    color: Colors.white,
    fontSize: 18,
    marginTop: 5,
  },
  balanceText: {
    color: Colors.white,
    fontSize: 16,
    marginTop: 12,
    marginLeft: 10,
    textAlign: 'center',
  },
  cardNumberHeading: {
    fontFamily: 'JosefinSans-Bold',
    fontSize: 18,
    marginTop: 10,
    color: Colors.white,
  },
  cvcRowContainer: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: Colors.white,
    marginLeft: 'auto',
    borderRadius: 10,
  },
  visaImage: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  emptyComponentMessageText: {
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: Colors.black,
  },
});
