import React, { useCallback } from 'react';
import { View, Text, ImageBackground, Image, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect, useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Foundation } from '@expo/vector-icons';
import { Screen, Section, NetworkInfo } from '../../Wrapper';
import { Button, Form, Spinners }  from '../../../components';
import { actions, ajax } from '../../../helpers';
import { styles, colors } from '../../styles';
import { Ingredients, FormInput, AddTags, Category } from '../Components';
const { useFormInput, usePicker } = Form;
const { useOverlaySpinner } = Spinners;
const { useAjaxStatus } = ajax;
const { cookBookActions: { createDishRequest } } = actions;
const CreateService = ({navigation, route: { params }, createDishRequest}) => {
  const { animating, setAnimating, OverlaySpinner } = useOverlaySpinner();
  const { AjaxStatus, setAjaxStatus } = useAjaxStatus();
  const { dish, searchText } = params;
  const { input: description, handleUserInput: setDesc, error: descErr, isValid: descIsValid } = useFormInput('Description');
  const { input: title, handleUserInput: setTitle, error: titleErr, isValid: titleIsValid } = useFormInput('Title');
  const { input: cooking_time, handleUserInput: setCookingTime, error: cookingTimeErr, isValid: cookingTimeIsValid } = useFormInput('Cooking time');
  const [special_recipe, setIngredients] = React.useState(dish.ingredients ? dish.ingredients : []);
  console.log('dish', dish.tags ? dish.tags : [])
  const [tags, setTags] = React.useState(dish.tags ? dish.tags : []);
  const validateAllFields = descIsValid && titleIsValid && cookingTimeIsValid
    && special_recipe.length > 0 && tags.length > 0;
  const createDish = () => useCallback(createDishRequest(
    { title, description, cooking_time, special_recipe, tags,  },
    setAnimating, setAjaxStatus
  ), [createDishRequest])
  React.useEffect(() => {
    setTags(dish.tags ? dish.tags : []);
    setIngredients(dish.ingredients ? dish.ingredients : []);
  }, [dish]);
  // if(animating) return <OverlaySpinner />
  return (
    <NetworkInfo>
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
            <FormInput label="Title" value={title} onChange={setTitle} err={titleErr} maxLength={256} />
            <FormInput label="Cooking time (in minutes)" value={cooking_time} onChange={setCookingTime}
              err={cookingTimeErr} maxLength={256} minLength={1} keyboardType="numeric"
              maxLength={256} />
          </Section>
          <Category category={dish.category} />
          <AddTags tags={tags} setTags={setTags} />
          <Ingredients ingredients={special_recipe} setIngredients={setIngredients} />
          <Section>
            <FormInput label="Description" textAlignVertical="top" textInputStyles={[{minHeight: 150}]}
              multiline={true} value={description} onChange={setDesc} err={descErr}
              maxLength={256} />
            <View style={{justifyContent: 'flex-end', flex: 1}}>
              <Button buttonProps={{disabled: !validateAllFields}} action={createDish}
                style={[styles.padding_md, styles.bg_color1, styles.border_r_10, styles.flexCenter]}>
                <Text numberOfLines={1} style={[styles.marginBottom_xsm, styles.color_white, styles.fontWeight_700, styles.font_md,]}>Save Dish</Text>
              </Button>
            </View>
          </Section>
        </ScrollView>
        {AjaxStatus}
        <OverlaySpinner />
      </Screen>
    </NetworkInfo>
  )
}


const mapDispatchToProps = dispatch => 
  bindActionCreators({ createDishRequest }, dispatch);

export default connect(null, mapDispatchToProps)(CreateService);