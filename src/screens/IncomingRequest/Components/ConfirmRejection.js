import React from 'react';
import { View, Text } from 'react-native';
import { Section } from '../../Wrapper';
import { styles, colors } from '../../styles';
import { Button } from '../../../components';

const ConfirmRejection = ({goBack, proceed}) => {
  return (
    <Section style={[]}>
      <View style={[styles.flexCenter]}>
        <Text style={[styles.font_lg, styles.fontWeight_700, styles.marginBottom_md]}>Are you sure?</Text>
        <Text style={[styles.font_md, styles.marginBottom_md, styles.text_center]}>You're the best FooDoorer for this order! Your acceptance rate will drop to:</Text>
        <Text style={[styles.font_xxlg, styles.color1, styles.marginBottom_md]}>48%</Text>
        <Text style={[styles.font_md, styles.text_center, styles.marginBottom_md, {lineHeight: 22}]}>Consistently accept delivery opportunities to rise you Acceptance</Text>
      </View>
      <View style={[styles.row]}>
        <View style={[styles.marginRight_sm, {flex: 1, height: 50}]}>
          <Button rippleColor={colors.color3_opacity} action={goBack}
            style={[styles.flexCenter, styles.border_r_5, styles.slimBorder, {flex: 1, borderColor: colors.color3}]}>
            <Text numberOfLines={1} style={[styles.font_md, styles.color3, styles.capitalize]}>Go Back</Text>
          </Button>
        </View>
        <View style={[{flex: 1, height: 50}]}>
          <Button rippleColor={colors.danger_opacity} action={proceed}
            style={[styles.flexCenter, styles.border_r_5, styles.slimBorder, {flex: 1, borderColor: colors.danger}]}>
            <Text numberOfLines={1} style={[styles.font_md, styles.color_danger, styles.capitalize]}>decline</Text>
          </Button>
        </View>
      </View>
    </Section>
  )
}

export default ConfirmRejection;
