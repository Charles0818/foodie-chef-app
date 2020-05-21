import React from 'react';
import { View, Text, ImageBackground, Image, ScrollView } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { Screen, Section } from '../../Wrapper';
import { Button, Form }  from '../../../components';
import { styles, colors } from '../../styles';
import { Ingredients, FormInput } from '../Components';
const { useFormInput, usePicker } = Form;

const categories = [
  { value: 'Vegetable', label: 'Vegetable' },
  { value: 'Nutrition', label: 'Nutrition' }
]

const CreateService = ({navigation, route: { params }}) => {
  const { thumbnail } = params;
  const { input: description, handleUserInput: setDesc, error: descErr, isValid: descIsValid } = useFormInput('Description');
  const { input: title, handleUserInput: setTitle, error: titleErr, isValid: titleIsValid } = useFormInput('Title');
  const { input: cookingTime, handleUserInput: setCookingTime, error: cookingTimeErr, isValid: cookingTimeIsValid } = useFormInput('Cooking time');
  const { Picker, selectedValue } = usePicker(categories)
  return (
    <Screen>
      <ScrollView>
        <Section style={[styles.paddingTop_md]}>
          <View style={[styles.marginBottom_md, styles.slimBorder, {width: '100%', height: 250}]}>
            <ImageBackground source={thumbnail ? thumbnail : null}  style={[styles.bg_gray, styles.flexCenter, {width: '100%', flex: 1}]}>
              <Button action={() => navigation.navigate('SelectCookThumbnail')} style={[styles.flexCenter, styles.bg_darkOpacity, {height: 50, width: 50, borderRadius: 25}]}>
                <Foundation name="photo" size={20} color={colors.white} />
              </Button>
            </ImageBackground>
          </View>
        </Section>
        <Section>
          <FormInput label="Title" value={title} onChange={setTitle} err={titleErr} />
          <FormInput label="Cooking time (in minutes)" value={cookingTime} onChange={setCookingTime} err={cookingTimeErr} keyboardType="numeric" />
        </Section>
        <Section>
          <View style={[styles.bg_color1, styles.paddingVertical_sm, styles.paddingHorizontal_sm, styles.marginBottom_xsm]}> 
            <Text style={[styles.font_lg, styles.color_white, styles.fontWeight_700]}>Category</Text>
          </View>
          <Picker />
        </Section>
        <Ingredients />
        <Section>
        <FormInput label="Description" textAlignVertical="top" textInputStyles={[{minHeight: 150}]} multiline={true} value={description} onChange={setDesc} err={descErr} />
          <View style={{justifyContent: 'flex-end', flex: 1}}>
            <Button style={[styles.padding_md, styles.bg_color1, styles.border_r_10, styles.flexCenter]}>
              <Text numberOfLines={1} style={[styles.marginBottom_xsm, styles.color_white, styles.fontWeight_700, styles.font_md,]}>Save Dish</Text>
            </Button>
          </View>
        </Section>
      </ScrollView>
    </Screen>
  )
}

export default CreateService;