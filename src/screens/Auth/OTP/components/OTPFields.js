import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { styles, colors } from '../../../styles';
export default OtpFields = ({ otpArray, setOtpArray }) => {
  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const refCallback = textInputRef => node => {
    textInputRef.current = node;
  };
  const onResendOtpButtonPress = () => {
    // clear last OTP
    if (firstTextInputRef) {
      setOtpArray(['', '', '', '']);
      firstTextInputRef.current.focus();
    }

    // setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    // startResendOtpTimer();

    // resend OTP Api call
    // todo
    console.log('todo: Resend OTP');
  };
  const onOtpChange = index => {
    return value => {
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);

      // auto focus to next InputText if value is not blank
      if (value !== '') {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        }
      }
    };
  };
  const onOtpKeyPress = index => {
    return ({nativeEvent: {key: value}}) => {
      // auto focus to previous InputText if value is blank and existing value is also blank
      if (value === 'Backspace' && otpArray[index] === '') {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        }

        /**
         * clear the focused text box as well only on Android because on mweb onOtpChange will be also called
         * doing this thing for us
         * todo check this behaviour on ios
         */
        if (Platform.os === 'android' && index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = ''; // clear the previous box which will be in focus
          setOtpArray(otpArrayCopy);
        }
      }
    };
};
  return (
    <View style={[styles.row]}>
      {[
        firstTextInputRef,
        secondTextInputRef,
        thirdTextInputRef,
        fourthTextInputRef,
      ].map((textInputRef, index) => (
        <TextInput
          value={otpArray[index]}
          onKeyPress={onOtpKeyPress(index)}
          onChangeText={onOtpChange(index)}
          keyboardType={'numeric'}
          maxLength={1}
          autoFocus={index === 0 ? true : undefined}
          ref={refCallback(textInputRef)}
          textContentType="oneTimeCode"
          key={index}
          placeholderTextColor={colors.white}
          textAlignVertical="center"
          style={[otpStyles.field, styles.bg_gray, styles.text_center, styles.border_r_5, styles.marginRight_sm]}
        />
      ))}
    </View>
  )
}

const otpStyles = StyleSheet.create({
  field: {
    width: 45,
    height: 45,
    fontSize: 30,
  }
})