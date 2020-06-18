import React from 'react';
import { View, Text } from 'react-native';
import { Section } from '../../Wrapper';
import { styles, colors } from '../../styles';
import { Button, Utils, Form } from '../../../components';

const { dataConstants: { declineRequestReasons } } = Utils;
const { useCheckBox } = Form;
const SubmitRejectionReasons = ({goBack}) => {
  const options = declineRequestReasons.map(reason => {
    return { text: reason, checked: false }
  })
  const Option = ({option, index}) => {
    const { text } = option
    const { isChecked, CustomCheckBox, toggleCheckBox } = useCheckBox(option.checked);
    options[index].checked = isChecked;
    return (
      <View onPress={toggleCheckBox}
        style={[styles.row, styles.alignItems_center, styles.justifyContent_between, styles.marginBottom_md,]}>
        <Text numberOfLines={1} style={[styles.font_md, styles.color_dark, {lineHeight: 25}]}>
          {text}
        </Text>
        <CustomCheckBox />
      </View>
    )
  }
  return (
    <Section style={[styles.paddingVertical_sm]}>
      <Text numberOfLines={1} style={[styles.font_lg, styles.fontWeight_700, styles.text_center, styles.capitalize, styles.marginBottom_md]}>tell us why</Text>
      {options.map((option, index) => <Option option={option} key={index} index={index} />)}
      <View style={[styles.row, styles.paddingTop_sm]}>
        <View style={[styles.marginRight_sm, {flex: 1, height: 50}]}>
          <Button action={goBack} rippleColor={colors.color3_opacity}
            style={[styles.flexCenter, styles.border_r_5, styles.slimBorder, {flex: 1, borderColor: colors.color3}]}>
            <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700, styles.color3, styles.capitalize]}>Go Back</Text>
          </Button>
        </View>
        <View style={[{flex: 1, height: 50}]}>
          <Button
            style={[styles.flexCenter, styles.border_r_5, styles.bg_danger, {flex: 1}]}>
            <Text numberOfLines={1} style={[styles.font_md, styles.color_white, styles.capitalize]}>submit</Text>
          </Button>
        </View>
      </View>
    </Section>
  )
}

export default SubmitRejectionReasons;
