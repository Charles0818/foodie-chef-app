import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { styles, colors } from '../styles';
import { formatting } from '../Utils';
import { PlayAudio } from '../FilePicker';
import { Button } from '../Buttons';
const { durationTimeFormat } = formatting;

export const Video = () => {
  <View>

  </View>
}

export const AudioMessage = ({asset}) => {
  const { setPosition, playPause } = PlayAudio(asset);
  return (
    <View style={[styles.row, styles.alignItems_center]}>
      <Button style={[styles.marginRight_sm]} action={playPause}>
        <FontAwesome5 name={"pause"} size={25} color={colors.gray_color}/>
      </Button>
      <ProgressBar duration={3000} onUpdateProgress={setPosition} />
    </View>
  )
}

export const ProgressBar = ({duration, onUpdateProgress}) => {

  const trackLength = React.useRef(trackLength);
  const [progress, setProgress] = React.useState({
    timeElapsed: "0:00",
    timeRemaining: `${trackLength}`
  })
  const formatProgress = (seconds) => {
    const timeElapsed = durationTimeFormat(seconds);
    const timeRemaining = durationTimeFormat((trackLength.current - seconds));
    setProgress({timeElapsed, timeRemaining})
    if(onUpdateProgress) onUpdateProgress(seconds * 1000)
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