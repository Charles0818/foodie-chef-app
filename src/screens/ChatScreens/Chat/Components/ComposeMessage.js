import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Section } from '../../../Wrapper';
import { styles, colors } from '../../../styles';
import { Button, Utils, Form, Animations, FilePicker } from '../../../../components';

const { formatting: { durationTimeFormat } } = Utils;
const { ChatFormInput, useFormInput } = Form;
const { AudioRecording } = FilePicker;

const ComposeMessage = ({setMessages}) => {
  const { input: message, handleUserInput: setMessage } = useFormInput('Message');
  const { startRecording, cancelRecording, doneRecording, recordingStatus } = AudioRecording();
  const { isDoneRecording, isRecording, durationMillis } = recordingStatus;
  const opacity = React.useRef(new Animated.Value(1)).current;
  React.useEffect(() => {
    Animated.loop(opacity, {
      toValue: 1,
      iterations: -1,
      useNativeDrawer: true,
      isInteraction: false
    })
  }, [])
  console.log(recordingStatus);
  const sendMessage = async (type = 'text', message) => {
    const newMessage = {
      user: 'Charles',
      message,
      type,
      id: `${Math.random() * Math.random()}`,
      timestamp: new Date(),
    }
    setMessages(prev => [newMessage, ...prev])
    if(type === 'text') setMessage('')
  }
  const sendRecording = async () => {
    const URI = await doneRecording();
    sendMessage('audio', URI);
  }
  return (
    <Section style={[styles.row, styles.alignItems_end, styles.justifyContent_between]}>
    {isRecording ? (
      <View style={[styles.row, styles.alignItems_center, styles.justifyContent_between, styles.slimBorder, styles.paddingVertical_sm, styles.paddingHorizontal_sm, styles.border_r_10, {flex: 1}]}>
        <View style={[styles.row, styles.alignItems_center]}>
          <Animated.View style={[styles.marginRight_sm, {opacity}]}>
            <FontAwesome5 name="microphone" size={20} color={colors.danger} />
          </Animated.View>
          <Text style={[styles.font_md]}>{durationTimeFormat(durationMillis / 1000)}</Text>
        </View>
        <Button style={[]} action={cancelRecording}>
          <Text style={[styles.font_md, styles.fontWeight_700, styles.color_danger]}>{'CANCEL'}</Text>
        </Button>
      </View>
    ) : (
      <>
      <View style={[styles.marginRight_xsm,]}>
        <Button style={[chatStyle.composeButton]} action={() => console.log('button clicked')}>
          <FontAwesome5 name="plus" size={20} color={colors.color1} />
        </Button>
      </View>
      <View style={[styles.marginRight_xsm]}>
        <Button style={[chatStyle.composeButton]} action={() => console.log('button clicked')}>
          <FontAwesome5 name="camera" size={20} color={colors.gray_color} />
        </Button>
      </View>
      <ChatFormInput onChange={setMessage} value={message} />
      </>
    )}
      {message.length > 0 || isRecording ? (
        <Animations.FadeIn style={[styles.marginRight_xsm]}>
          <Button
            action={() => isRecording ? sendRecording() : sendMessage('text', message)}
            style={[chatStyle.composeButton]}>
            <MaterialIcons name="send" size={30} color={colors.color1} />
          </Button>
        </Animations.FadeIn>
      ) :  (
        <Animations.FadeIn style={[styles.marginRight_xsm]}>
          <Button style={[chatStyle.composeButton]} action={startRecording}>
            <FontAwesome5 name="microphone" size={30} color={colors.gray_color} />
          </Button>
        </Animations.FadeIn>
      )}
    </Section>
  )
}


const chatStyle = StyleSheet.create({
  composeButton: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2 ,
    overflow: 'hidden',
    ...styles.flexCenter,
    marginBottom: 5,
  }
});

export default ComposeMessage;
