import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { Section } from '../../Wrapper';
import { Button, Form }  from '../../../components';
import { styles, colors } from '../../styles';
import FormInput from './TextInput';
const { useFormInput } = Form;

export default AddTags = ({tags, setTags}) => {
  return (
    <Section>
      <View style={[styles.bg_color1, styles.paddingVertical_sm, styles.paddingHorizontal_sm, styles.marginBottom_xsm]}> 
        <Text style={[styles.font_lg, styles.color_white, styles.fontWeight_700]}>Tag(s)</Text>
      </View>
      {tags.length !== 0 ? <Tags tags={tags} setTags={setTags} /> : null }
      <AddTag setTags={setTags} />
    </Section>
  )
}

const AddTag = ({setTags}) => {
  const { input, handleUserInput, error, isValid, setError} = useFormInput("Tag");
  const addTag = () => {
    setTags(prev => {
      if(prev.find(tag => tag.toLowerCase() === input.toLowerCase())) {
        return prev
      } else {
        return [...prev, input]
      }
    })
    handleUserInput("")
    setError('')
  };
  return (
    <View>
      <FormInput value={input} label="Tag" onChange={handleUserInput} err={error} textInputStyles={[styles.paddingRight_lg]} multiline={true} />
      <Button action={addTag} buttonProps={{disabled: !isValid}}
        style={[styles.flexCenter, styles.bg_color1, {width: 30, height: 30, borderRadius: 15, position: 'absolute', right: 5, top: 5,}]}>
        <AntDesign name="plus" color={colors.white} size={16} />
      </Button>
    </View>
  )
}

const Tags = ({tags, setTags}) => {
  console.log('tags', tags)
  const { input, handleUserInput, error } = useFormInput('Tag', tags.join(','));
  console.log('input', input)
  const editTags = (changes) => {
    setTags(changes.split(','))
  }
  React.useEffect(() => {
    handleUserInput(tags.join(', '))
  }, [tags])
  return (
    <View>
      <FormInput value={input} label="Tag(s)" onChange={editTags} err={error} textInputStyles={[styles.paddingRight_lg]} multiline={true} />
    </View>
  )
}