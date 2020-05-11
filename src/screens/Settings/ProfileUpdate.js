import * as React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Section, Screen } from '../Wrapper';
import { Form , Utils, Button, } from '../../components';
import { styles, colors } from '../styles';

const AttachUploadedDocument = () => {
  return (
    <View style={[styles.border_r_5, padding_sm, styles.flexCenter]}>
      
    </View>
  )
}

const { dataConstants: { availableDocuments } } = Utils;
const { useFormInput, FormInput, usePicker } = Form;
const ProfileUpdate = ({ navigation, route: { params } }) => {
  const { uploadedDocuments } = params;
  const dropdownItems = availableDocuments.map(document => {
    return { label: document.title, value: document.title }
  });
  console.log('this is', uploadedDocuments)
  const { Picker, selectedValue } = usePicker(dropdownItems)
  const { input: firstName, handleUserInput: setFirstName, error: firstNameErr, isValid: firstNameIsValid } = useFormInput('Name');
  const { input: lastName, handleUserInput: setLastName, error: lastNameErr, isValid: lastNameIsValid } = useFormInput('Name');
  const { input: email, handleUserInput: setEmail, error: emailErr, isValid: emailIsValid } = useFormInput('Email');
  const validate = firstNameIsValid && lastNameIsValid && emailIsValid
  return (
    <Screen>
      <Section style={[styles.paddingHorizontal_md, {flex: 1}]}>
        <ScrollView>
          <FormInput value={firstName} placeholder="Enter your first name" label="First name" onChange={setFirstName} err={firstNameErr} />
          <FormInput value={lastName} placeholder="Enter your last name (surname)" label="Last name" onChange={setLastName} err={lastNameErr} />
          <FormInput value={email} placeholder="Enter a valid email" label="Email" onChange={setEmail} err={emailErr} />
          <View style={[]}>
            <Text numberOfLines={1} style={[styles.marginBottom_xsm, styles.fontWeight_700, styles.font_sm]}>Verify Account (choose verification type)</Text>
            <Picker />
            {uploadedDocuments ? (
            <Button disabled={!uploadedDocuments} action={() => navigation.navigate("VerificationProof", {document: selectedValue })}
              style={[styles.flexCenter, styles.bg_gray, styles.border_r-5, styles.padding_md]}>
              <Text numberOfLines={1} style={[styles.fontWeight_700, styles.color_gray, styles.font_sm, styles.capitalize]}>Click to upload document</Text>
            </Button> ) : (
              uploadedDocuments.map(document => (
                <View style={[styles.bg_gray, styles.padding_sm, styles.border_r_5]}>
                  <Text numberOfLines={1} style={[styles.fontWeight_700, styles.color_gray, styles.font_sm]}>{document.view}</Text>
                </View>
              ))
            )}
          </View>
        </ScrollView>
        <View style={{justifyContent: 'flex-end', flex: 1}}>
          <Button style={[styles.padding_md, styles.bg_color1, styles.border_r_10, styles.flexCenter]}>
            <Text numberOfLines={1} style={[styles.marginBottom_xsm, styles.color_white, styles.fontWeight_700, styles.font_sm,]}>Save Information</Text>
          </Button>
        </View>
      </Section>
    </Screen>
  )
}

export default ProfileUpdate;
