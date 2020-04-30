import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { styles, colors } from '../styles';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const Header = ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <LinearGradient colors={['#ff8109', '#ff80095d', '#ff680911']}
      style={[headerStyle.headerStyle, styles.padding_md]}>
      {previous ? (
      <View style={[headerStyle.backButton, styles.marginTop_sm]} onPress={() => navigation.goBack()}>
        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.gray_color, true)}>
          <View style={[styles.flexCenter]}>
            <FontAwesomeIcon icon="arrow-left" style={{...styles.color_white}}/>
          </View>
        </TouchableNativeFeedback>
      </View>
      ) : null}
      <View style={[{flex: 1}, styles.flexCenter]}>
        <Text style={[styles.font_xlg, styles.color_white, styles.fontWeight_bold]}>{title}</Text>
      </View>
    </LinearGradient>
  );
};

const headerStyle = StyleSheet.create({
  headerStyle: {
    height: 150,
    ...styles.bg_color1,
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden'
  }
})

export default Header;
