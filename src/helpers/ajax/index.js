import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styles, { colors } from '../../styles';
import { FadeIn } from '../../components/Animations';
export const sendHttpRequest = async (method, url, data, authToken ) => {
  if(method === 'GET' || method === 'DELETE') {
    const response = await fetch(url, {
      method:method,
      headers: {
        'Authorization': authToken ? `Token ${authToken}` : ""
      }
    })
    
    if(response.status >= 400) {
      const err = await response.json()
      throw err
    }
    return await response.json()
  }
  const response =  await fetch(url, {
    method:method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authToken ? `Token ${authToken}` : ""
    }
  });
  if(response.status >= 400) {
    const err = await response.json();
    throw err
  }
  return response.json()
  
}

const apiKey = 'https://api.cuisingo.com';

const getData = async (url, authToken) =>  sendHttpRequest('GET', url, null, authToken);

const sendData = async (url, data, authToken) => sendHttpRequest('POST', url, data, authToken);
const modifyData = async (url, data, authToken) => sendHttpRequest('PATCH', url, data, authToken);
const deleteData = async (url, authToken) => sendHttpRequest('DELETE', url, null, authToken);

const useAjaxStatus = () => {
  const initialState = {
    message: '', display: false, status: ''
  }
  const [status, setStatus] = React.useState(initialState)
  const setAjaxStatus = (status, message) => {
    setStatus({status, message, display: true});
    const timeout = setTimeout(() => setStatus(initialState), 3500);
    return () => clearTimeout(timeout)
  }
  const AjaxStatus = () => {
    const bgColor = status.status === 'success' ? colors.google_green : colors.danger
    return status.display && (
      <FadeIn style={[styles.flexCenter, styles.position_absolute, { top: 35, flex: 1, width: '100%', zIndex: 10} ]}>
        <View style={[ styles.padding_md, styles.border_r_5, {backgroundColor: bgColor,width: '80%',}]}>
          <Text style={[styles.color_white, styles.font_sm, styles.text_center, styles.fontWeight_700]}>{status.message}</Text>
        </View>
      </FadeIn>
    )
  }
  return { AjaxStatus, setAjaxStatus }
}
export { sendData, getData, modifyData, deleteData, apiKey, useAjaxStatus }
