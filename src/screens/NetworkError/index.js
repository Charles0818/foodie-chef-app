import * as React from 'react';
import { View, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { styles, colors } from '../styles';
import { Button } from '../../components';
export const NetworkError = ({action}) => {
  return (
    <View style={[styles.flexCenter, {flex: 1}]}>
      <View style={[styles.padding_lg]}>
        <View style={[styles.flexCenter]}>
          <Text style={[styles.font_md, styles.marginBottom_lg]}>No Connection</Text>
          <View style={[styles.marginBottom_lg]}>
            <FontAwesome5 name="wifi" size={53} color={colors.gray_color} />
          </View>
          <Text style={[styles.color_gray, styles.font_md, styles.marginBottom_lg]}>An internet error occured, please try again</Text>
          <Button action={action} style={[styles.bg_gray, styles.padding_md]}>
            <Text style={[styles.fontWeight_700]}>Try again</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

export default useNetworkError = (action) => {
  const [displayErrorScreen, setDisplayErrorScreen] = React.useState(false);
  const handleAction = () => {
    setDisplayErrorScreen(false);
    action()
  }
  const NetworkErrorScreen = displayErrorScreen && <NetworkError action={handleAction} />
  return { NetworkErrorScreen, displayErrorScreen, setDisplayErrorScreen }
}