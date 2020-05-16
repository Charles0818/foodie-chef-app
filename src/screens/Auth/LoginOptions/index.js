import * as React from 'react';
import { View, Text, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import { Screen, Section } from '../../Wrapper';
import { Button } from '../../../components';
import { styles, colors } from '../../styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
const LoginOptions = ({ navigation }) => {
  return (
    <Screen style={[]}>
      <ImageBackground
        source={require("../../../assets/chef.jpg")}
        resizeMethod="scale"
        style={[{ flex: 1 }]}>
        <View style={[styles.bg_darkOpacity, styles.flexCenter, { flex: 1 }]}>
          <View style={[buttonStyle.screenContainer]}>
            <View style={[styles.flexCenter, styles.marginBottom_lg]}>
              <Text numberOfLines={1} style={[styles.font_xlg, styles.fontWeight_700, styles.color_white, styles.marginBottom_md]}>Cuisino</Text>
              <Text numberOfLines={1} style={[styles.color2, styles.font_sm]}>Putting the cook in home cooking.</Text>
            </View>
            <View style={[]}>
              <SocialMediaButton icon={["fab", "facebook"]}
                text="Continue with Facebook"
                color={colors.facebook}
                transparency={colors.facebook_opacity}
                action={() => console.log('action')}
              />
              <SocialMediaButton icon={["fab", "google"]}
                text="Continue with Google"
                color={colors.google_red}
                transparency={colors.google_red_opacity}
                action={() => console.log('action')}
              />
              <SocialMediaButton icon={["fas", "envelope"]}
                text="Continue with Email"
                color={colors.google_yellow}
                transparency={colors.google_yellow_opacity}
                action={() => navigation.navigate("Login")}
              />
              <SocialMediaButton icon={["fas", "phone"]}
                text="Continue with Phone Number"
                color={colors.google_green}
                transparency={colors.google_green_opacity}
                action={() => console.log('action')}
              />
              <View style={[styles.marginVertical_md]}>
                <Text numberOfLines={1}
                  style={[styles.font_md, styles.color_white, styles.fontWeight_700, styles.text_center]}>
                  OR
                </Text>
              </View>
              <Button action={() => navigation.navigate("SignUp")}
                style={[styles.flexCenter, styles.bg_danger, { height: 50, width: '100%', borderColor: colors.danger, borderWidth: 1 }]}>
                <Text numberOfLines={1} style={[styles.font_md, styles.color_white, styles.fontWeight_700, styles.text_center]}>SIGN UP</Text>
              </Button>
            </View>
          </View>
          <Section style={[styles.flexEnd, styles.paddingHorizontal_md, {width: '100%'}]}>
            <View style={[styles.row, {width: '100%'}, styles.justifyContent_between]}>
              <Button action={() => console.log('button fired')}>
                <Text numberOfLines={1} style={[styles.fontWeight_700, styles.color_white, styles.font_sm, styles.uppercase]}>Terms of service</Text>
              </Button>
              <Button action={() => console.log('button fired')}>
                <Text numberOfLines={1} style={[styles.fontWeight_700, styles.color_white, styles.font_sm, styles.uppercase]}>Privacy Policy</Text>
              </Button>
            </View>
          </Section>
        </View>
      </ImageBackground>
    </Screen>
  )
}

const SocialMediaButton = ({ color, transparency, icon, action, text }) => {
  return (
    <View style={[styles.marginBottom_sm]}>
      <Button action={action} style={[styles.row, styles.nowrap, ]}>
        <View style={[buttonStyle.icon, { backgroundColor: color }]}>
          <FontAwesomeIcon size={20} icon={icon} color={colors.white} />
        </View>
        <View style={[ styles.flexCenter, { backgroundColor: transparency, borderColor: color, borderWidth: 2, flex:1 }]}>
          <Text numberOfLines={1} style={[styles.uppercase, styles.font_sm, styles.color_white]}>{text}</Text>
        </View>
      </Button>
    </View>
  )
}

const buttonStyle = StyleSheet.create({
  buttonWrapper: {
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  screenContainer: {
    width: Dimensions.get('window').width - 100,
    marginTop: 100,
  },
  icon: {
    width: 50,
    height: 50,
    ...styles.flexCenter
  }
})

export default LoginOptions;
