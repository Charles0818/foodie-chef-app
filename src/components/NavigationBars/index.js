import * as React from 'react';
import { DrawerContentScrollView, } from '@react-navigation/drawer';
import { FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { styles, colors } from '../styles';
import { Button } from '../Buttons';
import { useNavigation } from '@react-navigation/core';

export const BottomBar = ({ state, descriptors, navigation }) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabLongPress', e => {
      // Do something
    });
  
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={[styles.row, styles.nowrap, styles.bg_white, styles.slimBorderTop, styles.padding_sm]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const { icon, badgeCount, IconLibrary = FontAwesome5 } = options;
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <View style={[styles.alignItems_center, styles.padding_sm, styles.marginRight_sm, styles.nowrap]}>
              <View style={{...styles.marginBottom_sm}}>
                <IconLibrary size={16} name={icon} color={isFocused ? colors.color1 : colors.color_dark} />
                {badgeCount > 0 && (
                  <View
                    style={{
                      // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
                      position: 'absolute',
                      right: -16,
                      top: -3,
                      backgroundColor: 'red',
                      borderRadius: 10,
                      width: 20,
                      height: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text numberOfLines={1} style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                      {badgeCount > 99 ? '99+' : badgeCount}
                    </Text>
                  </View>
                )}
              </View>
              <Text numberOfLines={1} style={[styles.font_xsm, isFocused ? styles.color1 : styles.color_dark ]}>{label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export const  DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <ProfileView />
      <DrawerSection>
        <Item navigateTo={"Home"}
          iconLibary={MaterialCommunityIcons} icon="bell"
          label="Notification"
          iconViewColor={colors.color1}
        />
        <Item navigateTo={"Home"}
          iconLibary={FontAwesome5} icon="credit-card"
          label="Payment Method"
          iconViewColor={"#00aff0"}
        />
        <Item navigateTo={"Home"}
          iconLibary={FontAwesome5} icon="crown"
          label="Reward Credits"
          iconViewColor={"#5717de"}
        />
        <Item navigateTo={"Home"}
          iconLibary={MaterialIcons} icon="dialpad"
          label="My Promo code"
          iconViewColor={"#f0b100"}
        />
      </DrawerSection>
      <DrawerSection>
        <Item navigateTo={"Settings"}
          iconLibary={MaterialIcons} icon="settings"
          label="Settings"
          iconViewColor={colors.dark}
        />
        <Item navigateTo={"Home"}
          iconLibary={FontAwesome5} icon="user-plus"
          label="Invite Friends"
          iconViewColor={colors.google_green}
        />
        <Item navigateTo={"Home"}
          iconLibary={MaterialCommunityIcons} icon="help-circle"
          label="Help center"
          iconViewColor={colors.google_yellow}
        />
        <Item navigateTo={"Home"}
          iconLibary={FontAwesome5} icon="info-circle"
          label="About us"
          iconViewColor={colors.facebook}
        />
        <Item navigateTo={"Home"}
          iconLibary={MaterialIcons} icon="feedback"
          label="Feedback"
          iconViewColor={colors.color1}
        />
      </DrawerSection>
    </DrawerContentScrollView>
  );
}

const Item = ({iconLibary: IconLibrary, icon, label, iconViewColor, navigateTo}) => {
  const navigation = useNavigation()
  return (
    <Button action={() => navigation.navigate(navigateTo)}>
      <View style={[styles.row, styles.padding_md, styles.nowrap, { width: '100%', flex: 1 }, styles.alignItems_center, styles.justifyContent_between,]}>
        <View style={[styles.row, styles.alignItems_center]}>
          <View style={[styles.border_r_5, styles.marginRight_md, styles.flexCenter, { width: 30, height: 30, backgroundColor: iconViewColor }]}>
            <IconLibrary  name={icon} style={[]} color={colors.white} size={16} />
          </View>
          <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700]}>{label}</Text>
        </View>
        <FontAwesome5 name="greater-than" size={10} color={colors.gray_color} />
      </View>
    </Button>
  )
}
const DrawerSection = ({children}) => {
  return (
    <View style={[styles.marginBottom_md, styles.slimBorderTop,]}>{children}</View>
  )
}
const ProfileView = () => {
  return (
    <View style={[styles.flexCenter, styles.padding_md, {backgroundColor: '#f0f0f0', height: 150}]}>
      <View style={[styles.row, styles.alignItems_center]}>
        <View style={[styles.avatar, styles.marginRight_md]}>
          <Image source={require('../../assets/avatar.jpg')}
            style={[{width: '100%', flex: 1}]}/>
        </View>
        <View style={[styles.row, styles.alignItems_center]}>
          <View style={[styles.marginRight_lg]}>
            <Text numberOfLines={1} style={[styles.font_lg, styles.marginBottom_xsm, styles.capitalize, styles.fontWeight_700]}>cameroon cook</Text>
            <View style={[styles.row, styles.border_r_5, styles.alignItems_center, styles.padding_sm, styles.bg_color1, { width: 100 }]}>
              <FontAwesome5 name="crown" size={12} color={colors.white} style={[styles.marginRight_xsm]} />
              <Text numberOfLines={1} style={[styles.font_xsm, styles.color_white, styles.capitalize]}>VIP member</Text>
            </View>
          </View>
          <FontAwesome5 name="greater-than" size={8} color={colors.color_gray} />
        </View>
      </View>
    </View>
  )
}

export const DrawerBar = () => {
  const { openDrawer } = useNavigation();
  return (
    <View style={[styles.marginRight_md, {borderRadius: 15}]}>
      <Button style={[styles.flexCenter, {width: 30, height: 30, borderRadius: 15}]}
        action={openDrawer}>
        <FontAwesome5 name="bars" size={16} />
      </Button>
    </View>
  )
}