import * as React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Section, Screen } from '../../Wrapper';
import { Form , Utils, Button, } from '../../../components';
import { styles, colors } from '../../styles';

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
  const { Picker, selectedValue } = usePicker(dropdownItems)
  const { input: firstName, handleUserInput: setFirstName, error: firstNameErr, isValid: firstNameIsValid } = useFormInput('Name');
  const { input: lastName, handleUserInput: setLastName, error: lastNameErr, isValid: lastNameIsValid } = useFormInput('Name');
  const { input: address, handleUserInput: setAddress, error: addressErr, isValid: addressIsValid } = useFormInput('Address');
  const { input: city, handleUserInput: setCity, error: cityErr, isValid: cityIsValid } = useFormInput('City');
  const { input: state, handleUserInput: setState, error: stateErr, isValid: stateIsValid } = useFormInput('State');
  const { input: country, handleUserInput: setCountry, error: countryErr, isValid: countryIsValid } = useFormInput('Country');
  const validate = firstNameIsValid && lastNameIsValid && addressIsValid
  return (
    <Screen>
      <Section style={[styles.paddingHorizontal_md, styles.paddingTop_md, {flex: 1}]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FormInput value={firstName} placeholder="Enter your first name" label="First name" onChange={setFirstName} err={firstNameErr} />
          <FormInput value={lastName} placeholder="Enter your last name (surname)" label="Last name" onChange={setLastName} err={lastNameErr} />
          <FormInput value={address} placeholder="Address" label="Address" onChange={setAddress} err={addressErr} />
          <FormInput value={city} placeholder="City" label="City" onChange={setCity} err={cityErr} />
          <FormInput value={state} placeholder="State" label="State" onChange={setState} err={stateErr} />
          <FormInput value={country} placeholder="Country" label="Country" onChange={setCountry} err={countryErr} />
          <View style={[styles.marginBottom_md]}>
            <Text numberOfLines={1} style={[styles.marginBottom_xsm, styles.fontWeight_700, styles.font_sm]}>Verify Account (choose verification type)</Text>
            <Picker />
            <View style={[styles.marginTop_md]}>
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
          </View>
          <View style={{justifyContent: 'flex-end', flex: 1}}>
            <Button style={[styles.padding_md, styles.bg_color1, styles.border_r_10, styles.flexCenter]}>
              <Text numberOfLines={1} style={[styles.marginBottom_xsm, styles.color_white, styles.fontWeight_700, styles.font_sm,]}>Save Information</Text>
            </Button>
          </View>
        </ScrollView>
        
      </Section>
    </Screen>
  )
}

export default ProfileUpdate;
