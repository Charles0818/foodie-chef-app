import * as React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect, shallowEqual } from 'react-redux';
import { Section, Screen } from '../../Wrapper';
import { Form , Utils, Button, } from '../../../components';
import { styles, colors } from '../../styles';
import { ProfileCard } from './Components';
const { dataConstants: { availableDocuments } } = Utils;
const { useFormInput, FormInput, usePicker } = Form;

const ProfileUpdate = ({ navigation, user }) => {
  const { avatar } = user;
  const {
    input: first_name, handleUserInput: setFirstName, error: firstNameErr, isValid: firstNameIsValid
  } = useFormInput('Name', user.first_name);
  const {
    input: last_name, handleUserInput: setLastName, error: lastNameErr, isValid: lastNameIsValid
  } = useFormInput('Name', user.last_name);
  const validate = firstNameIsValid && lastNameIsValid
  return (
    <Screen>
      <ProfileCard avatar={ avatar } name={`${user.first_name} ${user.last_name}`} />
      <Section>
        <FormInput value={first_name} placeholder="Enter your first name" label="First name"
          onChange={setFirstName} err={firstNameErr} />
        <FormInput value={last_name} placeholder="Enter your last name (surname)" label="Last name"
          onChange={setLastName} err={lastNameErr} />
      </Section>
    </Screen>
  )
};


const mapUserToProps = state => {
  return { user: state.userReducer }
}

export default connect(mapUserToProps, null)(ProfileUpdate);