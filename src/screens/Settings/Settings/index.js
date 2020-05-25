import * as React from 'react';
import { View, Text } from 'react-native'
import { FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { Button, useToggleButton,  } from '../../../components';
import { Screen, Section } from '../../Wrapper';
import { styles, colors } from '../../styles';
const Settings = () => {
  const { ToggleButton: NewsLetterSwitch } = useToggleButton(true);
  const { ToggleButton: TextMessageSwitch } = useToggleButton();
  const { ToggleButton: PhoneCallSwitch } = useToggleButton();
  return (
    <Screen>
      <Section style={[styles.paddingTop_md]}>
        <View style={[styles.marginBottom_md]}>
          <Text style={[styles.fontWeight_700, styles.marginBottom_sm, styles.paddingLeft_sm, styles.font_md]}>Account</Text>
          <ListItemWithIcon iconLibary={FontAwesome5} icon="lock" label="Change Password" navigateTo={["ChangePassword"]} />
          <ListItemWithIcon iconLibary={MaterialCommunityIcons} icon="bell" label="Notifications" navigateTo={["NotificationSettings"]} />
          <ListItemWithIcon iconLibary={MaterialCommunityIcons} icon="security" label="Privacy Settings" navigateTo={["PrivacySettings"]} />
          <ListItemWithIcon iconLibary={FontAwesome5} icon="user" label="Personal Information" navigateTo={["ProfileUpdate"]} />
          <ListItemWithIcon iconLibary={FontAwesome5} icon="sign-out-alt" label="Sign Out" navigateTo={["Home"]} />
        </View>
        <View style={[]}>
          <Text style={[styles.fontWeight_700, styles.marginBottom_sm, styles.paddingLeft_sm, styles.font_md]}>More Options</Text>
          <ListItemWithSwitch label="Newsletter" switch={NewsLetterSwitch} />
          <ListItemWithSwitch label="Text Messages" switch={TextMessageSwitch} />
          <ListItemWithSwitch label="Phone Calls" switch={PhoneCallSwitch} />
          <ListItemWithValue label="Currency" navigateTo="Currencies" value="$-USD" />
          <ListItemWithValue label="Language" navigateTo="Languages" value="English" />
          <ListItemWithValue label="Linked Accounts" navigateTo="Home" value="Facebook, Google" />
        </View>
      </Section>
    </Screen>
  )
}


const ListItemWithIcon = ({iconLibary: IconLibrary, icon, label, navigateTo }) => {
  const navigation = useNavigation()
  return (
    <View style={[styles.slimBorderBottom,]}>
      <Button action={() => navigation.navigate(...navigateTo)}>
        <View style={[styles.paddingVertical_sm, styles.paddingHorizontal_sm,]}>
          <View style={[styles.row, styles.alignItems_center, ]}>
            <View style={[styles.border_r_5, styles.bg_color1, styles.marginRight_md, styles.flexCenter, { width: 30, height: 30 }]}>
              <IconLibrary  name={icon} style={[]} color={colors.white} size={16} />
            </View>
            <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700]}>{label}</Text>
          </View>
        </View>
      </Button>
    </View>
  )
}

const ListItemWithSwitch = ({switch: Switch, label}) => {
  return (
    <View style={[styles.slimBorderBottom]}>
      <Button >
        <View style={[styles.row, styles.alignItems_center, styles.paddingVertical_sm, styles.paddingHorizontal_sm, styles.justifyContent_between]}>
          <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700]}>{label}</Text>
          {Switch}
        </View>
      </Button>
    </View>
  )
}

const ListItemWithValue = ({label, value, navigateTo}) => {
  const navigation = useNavigation()
  return (
    <View style={[styles.slimBorderBottom]}>
      <Button action={() => navigation.navigate(navigateTo)}>
        <View style={[styles.row, styles.alignItems_center, styles.justifyContent_between, styles.paddingVertical_sm, styles.paddingHorizontal_sm,]}>
          <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700]}>{label}</Text>
          <View style={[styles.row, styles.alignItems_center]}>
            <Text numberOfLines={1} style={[styles.font_md, styles.color_gray, styles.fontWeight_700, styles.marginRight_sm]}>{value}</Text>
          </View>
        </View>
      </Button>
    </View>
  )
}

export default Settings;