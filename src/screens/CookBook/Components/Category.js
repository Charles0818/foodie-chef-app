import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { Section } from '../../Wrapper';
import { Button, Form }  from '../../../components';
import { styles, colors } from '../../styles';
import FormInput from './TextInput';
const { useFormInput } = Form;

export default Category = ({category}) => {
  const { input, handleUserInput, error } = useFormInput('Tag', category);
  return (
    <Section>
      <View style={[styles.bg_color1, styles.paddingVertical_sm, styles.paddingHorizontal_sm, styles.marginBottom_xsm]}> 
        <Text style={[styles.font_lg, styles.color_white, styles.fontWeight_700]}>Category</Text>
      </View>
      <FormInput editable={false} value={category} placeholder="Category" err={error} />
    </Section>
  )
}
