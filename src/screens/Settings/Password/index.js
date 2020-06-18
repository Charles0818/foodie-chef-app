import * as React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Section, Screen } from '../../Wrapper';
import { Form , Utils, Button, } from '../../../components';
import { styles, colors } from '../../styles';

const { dataConstants: { availableDocuments } } = Utils;
const { useFormInput, FormInput, usePicker } = Form;
const ChangePassword = ({ navigation }) => {
  const { input: currentPassword, handleUserInput: setFirstName, error: currentPasswordErr, isValid: currentPasswordIsValid } = useFormInput('Name');
  const { input: newPassword, handleUserInput: setNewPassword, error: newPasswordErr, isValid: newPasswordIsValid } = useFormInput('Name');
  const { input: confirmPassword, handleUserInput: setConfirmPassword, error: confirmPasswordErr, isValid: confirmPasswordIsValid } = useFormInput('ConfirmPassword');
  const validatePassword = newPassword !== confirmPassword ? 'Passwords do not match' : '';
  const validate = currentPasswordIsValid && newPasswordIsValid === confirmPasswordIsValid
  return (
    <Screen>
     <Section style={[styles.paddingHorizontal_md, styles.paddingTop_md, {flex: 1}]}>
        <FormInput value={currentPassword} placeholder="Enter current password" label="Current Password" onChange={setFirstName} err={currentPasswordErr} />
        <FormInput value={newPassword} placeholder="Enter new password" label="New Password" onChange={setNewPassword} err={newPasswordErr} />
        <FormInput value={confirmPassword} placeholder="re-type new password" label="Confirm Password" onChange={setConfirmPassword} err={validatePassword} textContentType="newPassword" />
        <View style={{justifyContent: 'flex-end', flex: 1}}>
          <Button style={[styles.padding_md, styles.bg_color1, styles.border_r_10, styles.flexCenter]}>
            <Text numberOfLines={1} style={[styles.marginBottom_xsm, styles.color_white, styles.fontWeight_700, styles.font_sm,]}>Save Password</Text>
          </Button>
        </View>
     </Section>
    </Screen>
  )
}

export default ChangePassword;
