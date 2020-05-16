import * as React from 'react';
import { View, Text } from 'react-native'
import { useToggleButton } from '../../../components';
import { Screen, Section } from '../../Wrapper';
import { styles } from '../../styles';

export default NotificationSettings = () => {
  const { ToggleButton, isActive } = useToggleButton(true);
  return (
    <Screen>
      <Section>
        <View style={[styles.row, styles.alignItems_center,  styles.justifyContent_between, styles.paddingVertical_sm, styles.paddingHorizontal_sm, styles.slimBorderBottom]}>
          <Text>Push Notification</Text>
          {ToggleButton}
        </View>
        <View style={[]}>
          <Text style={[styles.font_md, styles.fontWeight_700, styles.marginBottom_sm]}>Notify me</Text>
        </View>
      </Section>
    </Screen>
  )
}