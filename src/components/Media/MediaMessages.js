import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { styles } from '../styles';


export const Video = () => {
  <View></View>
}

export const timeFormat = (num) => {
  const hours = Math.floor(num / 3600);
  const minutes = Math.floor(num / 60) % 60;
  const seconds = Math.floor(num - minutes * 60);
  if(hours < 1) return `${slice(minutes)}:${slice(seconds)}`
  return `${slice(hours)}:${slice(minutes)}:${slice(seconds)}`
}

export const ProgressBar = (trackLength) => {
  const trackLength = React.useRef(trackLength);
  const [progress, setProgress] = React.useState({
    timeElapsed: "0:00",
    timeRemaining: `${trackLength}`
  })
  const formatProgress = (seconds) => {
    const slice = (part) => (`000${part}`).slice(-2);
    const timeFormat = (num) => {
      const hours = Math.floor(num / 3600);
      const minutes = Math.floor(num / 60) % 60;
      const seconds = Math.floor(num - minutes * 60);
      if(hours < 1) return `${slice(minutes)}:${slice(seconds)}`
      return `${slice(hours)}:${slice(minutes)}:${slice(seconds)}`
    }
    const timeElapsed = timeFormat(seconds);
    const timeRemaining = timeFormat((trackLength.current - seconds));
    setProgress({timeElapsed, timeRemaining})
  }
  return (
    <Section style={[styles.row, styles.alignItems_center, styles.justifyContent_between]}>
      <Text style={[styles.color_gray, styles.font_xsm]}>{progress.timeElapsed}</Text>
      <Slider
        minimumValue={0}
        maximumValue={trackLength.current}
        thumbTintColor={colors.color1}
        minimumTrackTintColor={colors.color1}
        maximumTrackTintColor={colors.gray_color}
        onValueChange={seconds => formatProgress(seconds)}
      />
      <Text style={[styles.color_gray, styles.font_xsm]}>-{progress.timeRemaining}</Text>
    </Section>
  )
}