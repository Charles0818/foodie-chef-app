import * as React from 'react';
import { View, Text, Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList, DrawerItem
} from '@react-navigation/drawer';
import { styles, colors } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


const  DrawerContent = ({ progress, ...rest }) => {
  const translateX = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <Animated.View style={{ transform: [{ translateX }] }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Help"
          onPress={() => Linking.openUrl('https://mywebsite.com/help')}
        />
      </DrawerContentScrollView>
    </Animated.View>
  );
}

const ProfileView = () => {
  return (
    <View style={[styles.slimBorderBottom, styles.bg_gray, styles.paddingVertical_md, {height: 200}]}>
      <View style={[styles.row, styles.alignItems_center]}>
        <View style={[styles.avatar, styles.marginRight_md]}>
          
        </View>
        <View style={[styles.row]}>
          <View style={[styles.marginRight_lg]}>
            <Text numberOfLines={1} style={[styles.font_md, styles.marginBottom_sm, styles.capitalize, styles.fontWeight_700]}>cameroon cook</Text>
          </View>
          <FontAwesomeIcon color={colors.color_gray} />
        </View>
      </View>
    </View>
  )
}

export default DrawerContent;
