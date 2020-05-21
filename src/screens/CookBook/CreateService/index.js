import React from 'react';
import { View, Text, ImageBackground, Image, ScrollView } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { Screen, Section } from '../../Wrapper';
import { Button, Form }  from '../../../components';
import { styles, colors } from '../../styles';
import { Ingredients, FormInput, AddTags, Category } from '../Components';
const { useFormInput, usePicker } = Form;

const CreateService = ({navigation, route: { params }}) => {
  const { dish, searchText } = params;
  const { input: description, handleUserInput: setDesc, error: descErr, isValid: descIsValid } = useFormInput('Description');
  const { input: title, handleUserInput: setTitle, error: titleErr, isValid: titleIsValid } = useFormInput('Title');
  const { input: cookingTime, handleUserInput: setCookingTime, error: cookingTimeErr, isValid: cookingTimeIsValid } = useFormInput('Cooking time');
  const [ingredients, setIngredients] = React.useState(dish.ingredients ? dish.ingredients : []);
  console.log('dish', dish.tags ? dish.tags : [])
  const [tags, setTags] = React.useState(dish.tags ? dish.tags : []);
  React.useEffect(() => {
    setTags(dish.tags ? dish.tags : []);
    setIngredients(dish.ingredients ? dish.ingredients : []);
  }, [dish])
  return (
    <Screen>
      <ScrollView>
        <Section style={[styles.paddingTop_md]}>
          <FormInput autoFocus={true} placeholder="Search Dish" value={searchText} onChange={text => navigation.navigate("SelectCookThumbnail", {searchText: text})} err={titleErr} />
          <View style={[styles.marginBottom_md, styles.slimBorder, {width: '100%', height: 250}]}>
            <ImageBackground source={dish ? dish.thumbnail : null}  style={[styles.bg_gray, styles.flexCenter, {width: '100%', flex: 1}]}>
              {/* <Button action={() => navigation.navigate('SelectCookThumbnail')} style={[styles.flexCenter, styles.bg_darkOpacity, {height: 50, width: 50, borderRadius: 25}]}>
                <Foundation name="photo" size={20} color={colors.white} />
              </Button> */}
            </ImageBackground>
          </View>
        </Section>
        <Section>
          <FormInput label="Title" value={title} onChange={setTitle} err={titleErr} />
          <FormInput label="Cooking time (in minutes)" value={cookingTime} onChange={setCookingTime} err={cookingTimeErr} keyboardType="numeric" />
        </Section>
        <Category category={dish.category} />
        <AddTags tags={tags} setTags={setTags} />
        <Ingredients ingredients={ingredients} setIngredients={setIngredients} />
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