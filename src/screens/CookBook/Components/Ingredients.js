import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { Section } from '../../Wrapper';
import { Button, Form }  from '../../../components';
import { styles, colors } from '../../styles';
import FormInput from './TextInput';
const { useFormInput } = Form;

export default Ingredients = ({ ingredients, setIngredients }) => {
  return (
    <Section>
      <View style={[styles.bg_color1, styles.paddingVertical_sm, styles.paddingHorizontal_sm, styles.marginBottom_xsm]}> 
        <Text style={[styles.font_lg, styles.color_white, styles.fontWeight_700]}>Special Ingredient(s)</Text>
      </View>
      {ingredients.map((ingredient, index) => (
        <Ingredient index={index} key={index}
          ingredient={ingredient} setIngredients={setIngredients}
        />
      ))}
      <AddIngredient setIngredients={setIngredients} />
      {ingredients.length > 0 ? (
      <View style={[styles.row]}>
        <View style={[styles.flexCenter, styles.bg_color1, styles.marginRight_sm, {width: 25, height: 25, borderRadius: 12.5}]}>
          <Text numberOfLines={1} style={[styles.font_md, styles.color_white, styles.fontWeight_700]}>{ingredients.length}</Text>
        </View>
        <Text style={[styles.font_md]}>{ingredients.length === 1 ? 'ingredient' : 'ingredients'}</Text>
      </View>
      ) : null }
    </Section>
  )
}

const AddIngredient = ({setIngredients}) => {
  const { input, handleUserInput, error, isValid, setError} = useFormInput("Ingredient");
  const addIngredient = () => {
    setIngredients(prev => [...prev, input]);
    handleUserInput("")
    setError('')
  };
  return (
    <View>
      <FormInput value={input} label="Ingredient(s)" onChange={handleUserInput} err={error} textInputStyles={[styles.paddingRight_lg]} multiline={true} />
      <Button action={addIngredient} buttonProps={{disabled: !isValid}}
        style={[styles.flexCenter, styles.bg_color1, {width: 30, height: 30, borderRadius: 15, position: 'absolute', right: 5, top: 5,}]}>
        <AntDesign name="plus" color={colors.white} size={16} />
      </Button>
    </View>
  )
}

const Ingredient = ({ingredient, index, setIngredients}) => {
  const { input, handleUserInput, error } = useFormInput('Ingredient', ingredient)
  const removeIngredient = () => setIngredients(prev => prev.filter((_, key) => key !== index))
  return (
    <View>
      <FormInput value={input} label="Ingredient(s)" onChange={handleUserInput} err={error} textInputStyles={[styles.paddingRight_lg]} multiline={true} />
      <Button action={removeIngredient}
        style={[styles.flexCenter, {width: 30, height: 30, borderRadius: 10, position: 'absolute', right: 5, top: 5,}]}>
        <FontAwesome5 name="times" color={colors.gray_color} size={16} />
      </Button>
    </View>
  )
}