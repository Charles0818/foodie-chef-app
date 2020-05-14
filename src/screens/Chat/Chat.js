import React from 'react';
import { View, Text, Image, FlatList, ScrollView, Dimensions, StyleSheet, Animated } from 'react-native';
import { FontAwesome5, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import io from 'socket.io-client';
import { Screen, Section } from '../Wrapper';
import { styles, colors } from '../styles';
import { Button, Utils, Form, Modal, Animations, Spinners, FilePicker } from '../../components';

const { chat: { OnlineIndicator }, formatting: { dateTimeFormat_12hr, durationTimeFormat } } = Utils;
const { ChatFormInput, useFormInput } = Form;
const { useSpinner } = Spinners;
const { AudioRecording } = FilePicker;
const ENDPOINT = 'localhost:8080';

const messageStructure = {
  user: 'Charles',
  message: 'message',
  timestamp: '5',

}

const useMessages = (username) => {
  const [messages, setMessages] = React.useState([
    {
      user: username,
      id: `${Math.random() * Math.random()}`,
      message: "I'll get back to you when I've decide",
      timestamp: '2020-05-07T08:11:19.531Z',
    },
    {
      user: 'Charles',
      id: `${Math.random() * Math.random()}`,
      message: 'Are you there? Well I would love to let you know that I  have been planning for a meeting',
      timestamp: '2020-05-07T08:13:49.415Z',
    },
    {
      user: username,
      id: `${Math.random() * Math.random() + 1}`,
      message: "I'll get back to you when I've decide",
      timestamp: '2020-05-07T08:11:19.531Z',
    },
    {
      user: 'Charles',
      id: `${Math.random() * Math.random()}`,
      message: 'Are you there? Well I would love to let you know that I  have been planning for a meeting',
      timestamp: '2020-05-07T08:13:49.415Z',
    },
    {
      user: username,
      id: `${Math.random() * Math.random()}`,
      message: "I'll get back to you when I've decide",
      timestamp: '2020-05-07T08:11:19.531Z',
    },
    {
      user: 'Charles',
      id: `${Math.random() * Math.random()}`,
      message: 'Are you there? Well I would love to let you know that I  have been planning for a meeting',
      timestamp: '2020-05-07T08:13:49.415Z',
    },
    {
      user: username,
      id: `${Math.random() * Math.random()}`,
      message: "I'll get back to you when I've decide",
      timestamp: '2020-05-07T08:11:19.531Z',
    },
    {
      user: 'Charles',
      id: `${Math.random() * Math.random()}`,
      message: 'Are you there? Well I would love to let you know that I  have been planning for a meeting',
      timestamp: '2020-05-07T08:13:49.415Z',
    },
    {
      user: username,
      id: `${Math.random() * Math.random()}`,
      message: "I'll get back to you when I've decide",
      timestamp: '2020-05-07T08:11:19.531Z',
    },
    {
      user: 'Charles',
      id: `${Math.random() * Math.random()}`,
      message: 'Are you there? Well I would love to let you know that I  have been planning for a meeting',
      timestamp: '2020-05-07T08:13:49.415Z',
    },
    {
      user: username,
      id: `${Math.random() * Math.random()}`,
      message: "I'll get back to you when I've decide",
      timestamp: '2020-05-07T08:11:19.531Z',
    },
    {
      user: 'Charles',
      id: `${Math.random() * Math.random()}`,
      message: 'Are you there? Well I would love to let you know that I  have been planning for a meeting',
      timestamp: '2020-05-07T08:13:49.415Z',
    },
    {
      user: username,
      id: `${Math.random() * Math.random()}`,
      message: "I'll get back to you when I've decide",
      timestamp: '2020-05-07T08:11:19.531Z',
    },
    {
      user: 'Charles',
      id: `${Math.random() * Math.random()}`,
      message: 'Are you there? Well I would love to let you know that I  have been planning for a meeting',
      timestamp: '2020-05-07T08:13:49.415Z',
    },
    
  ]);
  return { messages, setMessages};
}
const Chat = React.memo(({ navigation, route: { params } } ) => {
  const { animating, setAnimating, Spinner } = useSpinner(true);
  const { lastSeen, username, isActive } = params;
  const { messages, setMessages } = useMessages(username);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={[]}>
          <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700, styles.marginBottom_xsm]}>{username}</Text>
          <View style={[styles.row, styles.alignItems_center]}>
            {isActive ? <OnlineIndicator style={[styles.marginRight_xsm]} /> : null}
            <Text numberOfLines={1} style={[styles.font_sm, styles.color_gray,]}>{isActive ? 'Active now': `Last seen: ${lastSeen}`}</Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <View style={[styles.marginRight_md, {borderRadius: 15}]}>
          <Button style={[styles.flexCenter, {width: 30, height: 30, borderRadius: 15}]}
            action={() => console.log('drawer requested')}>
            <FontAwesome5 name="bars" size={16} />
          </Button>
        </View>
      )
    })
  });
  React.useEffect(() => {
    const timeout = setTimeout(() => setAnimating(false), 500);
    return () => clearTimeout(timeout);
  }, []);
  const scrollRef = React.useRef();
  if(animating) return Spinner;
  console.log('something changed')
  return (
    <Screen>
      <View style={[styles.slimBorderBottom, styles.paddingHorizontal_sm, {flex: 1}]}>
        <FlatList
          inverted
          windowSize={21}
          maxToRenderPerBatch={2}
          data={messages.slice().sort(
            (a,b) => b.timestamp.valueOf() - a.timestamp.valueOf())}
          renderItem={({ item, index, separators }) => {
            console.log('rendered')
            const { timestamp, message, user } = item;
            return <ChatItem timestamp={timestamp} message={message} isCustomer={user === username} />
            
          }}
          ref={scrollRef}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={true}
        />
      </View>
      <View style={[styles.paddingTop_sm]}>
        <ComposeMessage setMessages={setMessages} />
      </View>
    </Screen>
  )
}, (prev, next) => prev !== next)
const SenderChat = ({message, timestamp}) => {
  const { width } = Dimensions.get('window');
  return (
    <View style={[styles.marginBottom_sm, styles.alignItems_end,]}>
      <View style={[styles.alignItems_end,{width: width / 2 + 100}]}>
        <Animations.FadeIn style={[styles.borderPoint_right, styles.bg_color1, styles.padding_md, styles.marginBottom_xsm]}>
          <Text style={[styles.color_white, styles.font_md, {fontWeight: '600'}]}>{message}</Text>
        </Animations.FadeIn>
        <Time time={dateTimeFormat_12hr(new Date(timestamp))} />
      </View>
    </View>
  )
}


const ReceiverChat = ({message, timestamp}) => {
  const { width } = Dimensions.get('window');
  return (
    <View style={[styles.row, styles.alignItems_end, styles.marginBottom_sm]}>
      <View style={[styles.avatar_sm, styles.marginRight_xsm]}>
        <Image source={require('../../assets/avatar.jpg')} style={{flex: 1, width: '100%', borderRadius: 17.5}} />
      </View>
      <View style={[{width: width / 2 + 80}]}>
        <Animations.FadeIn style={[styles.borderPoint_left, styles.bg_gray, styles.padding_md]}>
          <Text style={[styles.font_md, {fontWeight: '600'}]}>{message}</Text>
        </Animations.FadeIn>
        <Time time={dateTimeFormat_12hr(new Date(timestamp))} />
      </View>
    </View>
  )
}

class ChatItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    const { timestamp, message, isCustomer } = this.props;
    return isCustomer
    ? <ReceiverChat timestamp={timestamp} message={message} />
    : <SenderChat timestamp={timestamp} message={message}/>
  }
}

const Time = ({time}) => {
  return (
    <View style={[styles.row, styles.alignItems_center]}>
      <FontAwesome5 name="clock" color={colors.gray_color} size={8} style={[styles.marginRight_xsm]} />
      <Text numberOfLines={1} style={[styles.color_gray, styles.font_xsm]}>{time}</Text>
    </View>
  )
}

const ComposeMessage = ({setMessages}) => {
  const { input: message, handleUserInput: setMessage } = useFormInput('Message');
  const { startRecording, stopRecording, recordingStatus } = AudioRecording();
  const { isDoneRecording, isRecording, durationMillis  } = recordingStatus;
  console.log(recordingStatus);
  const sendMessage = async (type = 'text', message) => {
    const newMessage = {
      user: 'Charles',
      message,
      id: `${Math.random() * Math.random()}`,
      timestamp: new Date(),
    }
    setMessages(prev => [newMessage, ...prev])
    setMessage('')
  }
  return (
    <Section style={[styles.row, styles.alignItems_end, styles.justifyContent_between]}>
    {isRecording ? (
      <View style={[styles.row, styles.alignItems_center]}>
        <Button action={stopRecording} style={[chatStyle.composeButton, styles.marginRight_md]}>
          <FontAwesome5 name="times" size={25} />
        </Button>
        <Text style={[styles.font_md, {marginBottom: 5}]}>{durationTimeFormat(durationMillis/ 1000)}</Text>
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
            buttonProps={{disabled: !message.length > 0 || isRecording}}
            action={() => isRecording ? stopRecording() : sendMessage('text', message)}
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

const RecordingProgress = () => {
  return (
    <View style={[]}>

    </View>
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
})

export default Chat;

