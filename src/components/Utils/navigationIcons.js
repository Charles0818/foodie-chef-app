import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '../Buttons';
import { useNavigation } from '@react-navigation/core';
import { FontAwesome5, AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles, { colors } from '../../styles';

const badgeCount =  108;
export const NotificationBell = ({content = 'dark' }) => {
  const { navigate } = useNavigation();
  return (
    <Button action={() => navigate('Notifications')}
      style={[styles.flexCenter, {width: 40, height: 40, borderRadius: 25}]}>
      <FontAwesome5 name="bell" size={25} color={content === 'light' ? colors.white : colors.dark} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: 5,
            top: 0,
            backgroundColor: 'red',
            borderRadius: 10,
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text numberOfLines={1} style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {badgeCount > 99 ? '99+' : badgeCount}
          </Text>
        </View>
      )}
    </Button>
  )
}

export const GoBackButton = ({content = 'dark'}) => {
  const { goBack } = useNavigation()
  return (
    <Button action={goBack} style={[styles.flexCenter, {width: 40, height: 40, borderRadius: 25}]}>
      <AntDesign name="arrowleft" size={20} color={content === 'light' ? colors.white : colors.dark} />
    </Button>
  )
}