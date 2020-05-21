import React from 'react';
import { View, Text, ImageBackground, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { ScaleToSize, FadeIn } from '../../Animations';
import { Button } from '../../Buttons';
import useRating from '../../Rating';
import { styles ,colors } from '../../styles';

export default PortraitServiceCard = () => {
  const { CustomRating } = useRating(4)
  return (
    <FadeIn style={[cardStyle.container, styles.boxShadow_md, styles.marginRight_sm, styles.marginBottom_sm]}>
      <Button action={() => console.log('action fired')}>
        <ImageBackground style={[cardStyle.thumbnail]} source={require('../../../assets/peppered-snail.jpg')} />
        <View style={[cardStyle.desc, styles.padding_md]}>
          <Text numberOfLines={1} style={[styles.font_lg, styles.fontWeight_700, styles.marginBottom_xsm]}>Peppered Snail</Text>
          <Text style={[styles.color_gray, styles.marginBottom_sm]}>Body 2</Text>
          <CustomRating readonly={true} />
        </View>
      </Button>
    </FadeIn>
  )
}


const cardStyle = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 2 - 20,
    height: 'auto',
    borderRadius: 5,
    ...styles.bg_white,
    overflow: 'hidden'
  },
  thumbnail: {
    height: 200,
    flex: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  desc: {
    height: 120,
  }
});