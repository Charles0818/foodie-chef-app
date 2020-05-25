import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { styles, colors } from '../styles'
export const MediumSpinner = ({animating}) => {
  return (
    <View style={[{flex: 1}, styles.flexCenter, styles.bg_darkOpacity]}>
      <ActivityIndicator animating={animating} size={70} color={colors.color1} />
    </View>
  )
}

export const useSpinner = (bool) => {
  const [animating, setAnimating] = useState(bool ? bool : false);
  const Spinner = <MediumSpinner animating={animating} />
  return { animating, setAnimating, Spinner }
}

export const useImagePreload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const ImagePreLoad = isLoading && <ActivityIndicator animating={isLoading} size={30} color="#ff680a" />
  return { setIsLoading, ImagePreLoad }
}

export const ButtonSpinner = (bool) => {
  const [animating, setAnimating] = useState(bool ? bool : false);
  const Spinner =  animating && <ActivityIndicator animating={animating} size={20} color={colors.white} />
  return { animating, setAnimating, Spinner }
}