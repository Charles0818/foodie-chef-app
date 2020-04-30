import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { styles, colors } from '../styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
export const FormInput = ({placeholder, value, onChange, err, label, ...rest}) => {
  return (
    <View style={[styles.marginBottom_sm]}>
      <Text style={[styles.fontWeight_bold, styles.marginBottom_xsm]}>{label}</Text>
      <TextInput style={[formStyles.input, styles.slimBorderBottom, styles.marginBottom_xsm]}
        placeholder={placeholder}
        onChangeText={text => onChange(text)}
        value={value}
        {...rest}
      />
      <Text style={[styles.color_danger, styles.font_sm]}>{err}</Text>
    </View>
  )
}

export const FormInput2 = ({ placeholder, value, onChange, err, icon, ...rest }) => {
  return (
    <View style={[styles.marginBottom_xsm,]}>
      <View
        style={[styles.position_relative,
        
        styles.marginBottom_xsm,
        styles.bg_darkOpacity,
        { borderColor: colors.white, borderWidth: 1 }]}
      >
        <TextInput style={[formStyles.input, styles.paddingHorizontal_sm, styles.font_sm, styles.color_white, styles.fontWeight_700,]}
          placeholder={placeholder}
          onChangeText={text => onChange(text)}
          value={value}
          placeholderTextColor={colors.white}
          {...rest}
        />
        <View style={[formStyles.icon, styles.position_absolute]}>
          <FontAwesomeIcon icon={16} color={colors.white} icon={icon} />
        </View>
      </View>
      <Text style={[styles.color_danger, styles.font_sm]}>{err}</Text>
    </View>
  )
}

const formStyles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    paddingBottom: 10,
    paddingRight: 25,
  },
  icon: {
    right: 4,
    top: '30%'
  }
});
