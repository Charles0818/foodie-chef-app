import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles, colors } from '../../../styles';
import { Utils, Animations, Media } from '../../../../components';
const { formatting: { dateTimeFormat_12hr } } = Utils;
const { AudioMessage } = Media;

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
        <Image source={require('../../../../assets/avatar.jpg')} style={{flex: 1, width: '100%', borderRadius: 17.5}} />
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

export default ChatItem