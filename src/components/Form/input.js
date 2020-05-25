import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { styles, colors } from '../styles';
import { Button } from '../Buttons';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
export const FormInput = ({placeholder, value, onChange, err, label, ...rest}) => {
  return (
    <View style={[styles.marginBottom_sm]}>
      <Text style={[styles.fontWeight_bold, styles.font_sm, styles.marginBottom_xsm]}>{label}</Text>
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

export const TextArea = ({ placeholder, value, onChange, err, label, ...rest }) => {
  return (
    <View style={[styles.marginBottom_sm]}>
      <Text style={[styles.fontWeight_bold, styles.font_sm, styles.marginBottom_xsm]}>{label}</Text>
      <TextInput style={[formStyles.input, styles.slimBorder, styles.padding_md, styles.marginBottom_xsm, {height: 150}]}
        placeholder={placeholder}
        onChangeText={text => onChange(text)}
        value={value}
        multiline={true}
        textAlignVertical="top"
        {...rest}
      />
      <Text style={[styles.color_danger, styles.font_sm]}>{err}</Text>
    </View>
  )
}

export const ChatFormInput = ({ value, onChange, ...rest }) => {
  return (
    <View style={[styles.marginRight_sm, {flex: 1}]}>
      <TextInput style={[styles.padding_md, styles.border_r_5, styles.slimBorder]}
        placeholder="Type your message here"
        onChangeText={text => onChange(text)}
        value={value} {...rest} 
        multiline={true}
        textAlignVertical="top"
      />
    </View>
  )
}
export const FormInput2 = ({ placeholder, value, onChange, err, icon, iconLibrary: IconLibrary = FontAwesome5, ...rest }) => {
  return (
    <View style={[styles.marginBottom_xsm,]}>
      <View
        style={[styles.position_relative,
        styles.marginBottom_xsm,
        styles.border_r_5,
        styles.bg_darkOpacity,]}
      >
        <TextInput style={[formStyles.input, styles.paddingHorizontal_sm, styles.paddingVertical_sm, styles.font_md, styles.color_white, styles.fontWeight_700,]}
          placeholder={placeholder}
          onChangeText={text => onChange(text)}
          value={value}
          placeholderTextColor={colors.white}
          {...rest}
        />
        <View style={[formStyles.icon, styles.position_absolute]}>
          <IconLibrary size={20} color={colors.white} name={icon} />
        </View>
      </View>
      <Text style={[styles.color_danger, styles.font_sm]}>{err}</Text>
    </View>
  )
}

export const useCheckBox = (value = false) => {
  const [isChecked, setIsCheked] = React.useState(value);
  const toggleCheckBox = () => setIsCheked(prev => !prev)

  const CustomCheckBox = () => (
    <Button
      style={[styles.slimBorder, styles.flexCenter, {borderColor: colors.color1, width: 25, height: 25, borderRadius: 2 }]}
      isChecked={isChecked}
      action={toggleCheckBox}
      rippleColor={colors.color1_opacity}
    >
     <Ionicons size={25} name="ios-checkmark" color={isChecked ? colors.color1 : 'transparent' } /> 
    </Button>
  );
  return { CustomCheckBox, isChecked: isChecked, toggleCheckBox }
}

const formStyles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    paddingBottom: 10,
    paddingRight: 30,
  },
  icon: {
    right: 10,
    top: '30%'
  }
});
