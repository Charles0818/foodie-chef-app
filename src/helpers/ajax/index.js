import React, { useState } from 'react';
import { Text } from 'react-native';
export const sendHttpRequest = async (method, url, data, authToken ) => {
        if(method === 'GET' || method === 'DELETE') {
            const response = await fetch(url, {
                method:method,
                headers: {
                    'Authorization': authToken ? `Token ${authToken}` : ""
                }
            })
            
        // console.log(`Token ${authToken}`)
            if(response.status >= 400) {
                // console.log(response)
                const err = await response.json()
                throw err
            }
            // console.log(response)
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
        // console.log(response)
        if(response.status >= 400) {
            const err = await response.json();
            throw err
        }
        return response.json()
    
}

const apiKey = 'https://teamworkbycharles.herokuapp.com/api/v1';

const getData = async (url, authToken) =>  sendHttpRequest('GET', url, null, authToken);

const sendData = async (url, data, authToken) => sendHttpRequest('POST', url, data, authToken);
const modifyData = async (url, data, authToken) => sendHttpRequest('PATCH', url, data, authToken);
const deleteData = async (url, authToken) => sendHttpRequest('DELETE', url, null, authToken);

export { sendData, getData, modifyData, deleteData, apiKey }
