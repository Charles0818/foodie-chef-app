import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Screen } from '../../Wrapper';
import { styles, colors } from '../../styles';
import { Button, Utils, Spinners } from '../../../components';
import { ComposeMessage, ChatItem } from './Components'
const { chat: { OnlineIndicator } } = Utils;
const { useSpinner } = Spinners;
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

export default Chat;

