import React from 'react';
import { View, Text, Image, FlatList, ScrollView, Dimensions, StyleSheet, Animated } from 'react-native';
import { FontAwesome5, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import io from 'socket.io-client';
import { Screen, Section } from '../Wrapper';
import { styles, colors } from '../styles';
import { Button, Utils, Form, Modal, Animations, Spinners, FilePicker, Media } from '../../components';

const { chat: { OnlineIndicator }, formatting: { dateTimeFormat_12hr, durationTimeFormat } } = Utils;
const { ChatFormInput, useFormInput } = Form;
const { useSpinner } = Spinners;
const { AudioRecording } = FilePicker;
const { AudioMessage } = Media;
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
      type: 'text',
      message: "I'll get back to you when I've decide",
      timestamp: '2020-05-07T08:11:19.531Z',
    },
    {
      user: 'Charles',
      id: `${Math.random() * Math.random()}`,
      type: 'text',
      message: 'Are you there? Well I would love to let you know that I  have been planning for a meeting',
      timestamp: '2020-05-07T08:13:49.415Z',
    },
    {
      user: username,
      id: `${Math.random() * Math.random() + 1}`,
      type: 'text',
      message: "I'll get back to you when I've decide",
      timestamp: '2020-05-07T08:11:19.531Z',
    },
    {
      user: 'Charles',
      id: `${Math.random() * Math.random()}`,
      type: 'text',
      message: 'Are you there? Well I would love to let you know that I  have been planning for a meeting',
      timestamp: '2020-05-07T08:13:49.415Z',
    },
    {
      user: username,
      id: `${Math.random() * Math.random()}`,
      type: 'text',
      message: "I'll get back to you when I've decide",
      timestamp: '2020-05-07T08:11:19.531Z',
    },
    {
      user: 'Charles',
      id: `${Math.random() * Math.random()}`,
      type: 'text',
      message: 'Are you there? Well I would love to let you know that I  have been planning for a meeting',
      timestamp: '2020-05-07T08:13:49.415Z',
    },
    {
      user: username,
      id: `${Math.random() * Math.random()}`,
      type: 'text',
      message: "I'll get back to you when I've decide",
      timestamp: '2020-05-07T08:11:19.531Z',
    },
    {
      user: 'Charles',
      id: `${Math.random() * Math.random()}`,
      type: 'text',
      message: 'Are you there? Well I would love to let you know that I  have been planning for a meeting',
      timestamp: '2020-05-07T08:13:49.415Z',
    },
    {
      user: username,
      id: `${Math.random() * Math.random()}`,
      type: 'text',
      message: "I'll get back to you when I've decide",
      timestamp: '2020-05-07T08:11:19.531Z',
    },
    {
      user: 'Charles',
      id: `${Math.random() * Math.random()}`,
      type: 'text',
      message: 'Are you there? Well I would love to let you know that I  have been planning for a meeting',
      timestamp: '2020-05-07T08:13:49.415Z',
    },
    {
      user: username,
      id: `${Math.random() * Math.random()}`,
      type: 'text',
      message: "I'll get back to you when I've decide",
      timestamp: '2020-05-07T08:11:19.531Z',
    },
    {
      user: 'Charles',
      id: `${Math.random() * Math.random()}`,
      type: 'text',
      message: 'Are you there? Well I would love to let you know that I  have been planning for a meeting',
      timestamp: '2020-05-07T08:13:49.415Z',
    },
    {
      user: username,
      id: `${Math.random() * Math.random()}`,
      type: 'text',
      message: "I'll get back to you when I've decide",
      timestamp: '2020-05-07T08:11:19.531Z',
    },
    {
      user: 'Charles',
      id: `${Math.random() * Math.random()}`,
      type: 'text',
      message: 'Are you there? Well I would love to let you know that I  have been planning for a meeting',
      timestamp: '2020-05-07T08:13:49.415Z',
    },
  ]);
  console.log(messages);
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
            <FontAwesome5 name="ellipsis-v" size={16} />
          </Button>
        </View>
      )
    })
  });
  React.useEffect(() => {
    const timeout = setTimeout(() => setAnimating(false), 500);
    return () => clearTimeout(timeout);
  }, []);
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
            return <ChatItem chat={item} isCustomer={user === username} />
            
          }}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={true}
        />
      </View>
      <View style={[styles.paddingTop_sm]}>
        <ComposeMessage setMessages={setMessages} />
      </View>
    </Screen>
  )
}, (prev, next) => prev !== next);

const SenderChat = ({message, timestamp, type}) => {
  const { width } = Dimensions.get('window');
  return (
    <View style={[styles.marginBottom_sm, styles.alignItems_end,]}>
      <View style={[styles.alignItems_end,{width: width / 2 + 100}]}>
        {type === 'text' ? (
          <Animations.FadeIn style={[styles.borderPoint_right, styles.bg_color1, styles.padding_md, styles.marginBottom_xsm]}>
            <Text style={[styles.color_white, styles.font_md, {fontWeight: '600'}]}>{message}</Text>
          </Animations.FadeIn>
        ) : (
          <AudioMessage asset={message} />
        )}
        <Time time={dateTimeFormat_12hr(new Date(timestamp))} />
      </View>
    </View>
  )
}

const ReceiverChat = ({message, timestamp, type}) => {
  const { width } = Dimensions.get('window');
  return (
    <View style={[styles.row, styles.alignItems_end, styles.marginBottom_sm]}>
      <View style={[styles.avatar_sm, styles.marginRight_xsm]}>
        <Image source={require('../../assets/avatar.jpg')} style={{flex: 1, width: '100%', borderRadius: 17.5}} />
      </View>
      <View style={[{width: width / 2 + 80}]}>
        {type === 'text' ? (
          <Animations.FadeIn style={[styles.borderPoint_left, styles.bg_gray, styles.padding_md]}>
            <Text style={[styles.font_md, {fontWeight: '600'}]}>{message}</Text>
          </Animations.FadeIn>
        ) : (
          <AudioMessage asset={message} />
        )}
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
    const { isCustomer, chat: { timestamp, message, type } } = this.props;
    return isCustomer
    ? <ReceiverChat timestamp={timestamp} message={message} type={type}  />
    : <SenderChat timestamp={timestamp} message={message} type={type} />
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
})

export default Chat;

