import * as React from 'react';
import { View, Text } from 'react-native';
import { useCenterModal } from '../Modal';
import { Button } from '../Buttons';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { styles, colors } from '../styles';
export const usePicker = (labels = []) => {
  const [selectedValue, setSelectedValue] = React.useState(labels[0].value);
  const Picker = ({...props}) => {
    return <CustomPicker labels={labels} selectedValue={selectedValue} onChange={setSelectedValue} {...props} />
  }
  return { selectedValue, Picker }
}

const CustomPicker = ({ selectedValue, onChange, labels }) => {
  const { openModal, closeModal, Modal, modalVisible } = useCenterModal();
  return (
    <View>
      <Button action={openModal} style={[styles.row, styles.alignItems_center, styles.justifyContent_between, styles.paddingVertical_sm, styles.paddingHorizontal_sm, styles.slimBorder]}>
        <Text numberOfLines={1} style={[styles.font_md, styles.capitalize]}>{selectedValue}</Text>
        <FontAwesome5 name="arrow-down" size={12} />
      </Button>
      {modalVisible && <Modal enableSwipe={false}>
        {labels.map((item, index) => <PickerItem style={[styles.capitalize]} key={index} item={item} closeModal={closeModal} onChange={onChange} />)}
      </Modal>}
    </View>
  )
}

const PickerItem = React.memo(({item, onChange, closeModal }) => {
  const {label, value} = item;
  const action = () => {
    onChange(value);
    closeModal()
  }
  return (
    <Button action={action} style={[styles.paddingVertical_sm, styles.paddingHorizontal_sm, styles.slimBorderBottom]}>
      <Text numberOfLines={1} style={[styles.font_md, styles.capitalize]}>{label}</Text>
    </Button>
  )
});

export const useCheckboxPicker = (labels = []) => {
  const [selectedValues, setSelectedValues] = React.useState(labels[0].value);
  const Picker = ({...props}) => {
    return <CheckBoxPicker labels={labels} selectedValues={selectedValues} onChange={setSelectedValues} {...props} />
  }
  return { selectedValue, Picker }
}

const CheckBoxPicker = React.memo(({ selectedValues, onChange, labels }) => {
  const { openModal, closeModal, Modal, modalVisible } = useCenterModal();
  return (
    <View>
      <Button action={openModal} style={[styles.row, styles.alignItems_center, styles.justifyContent_between, styles.paddingVertical_sm, styles.paddingHorizontal_sm, styles.slimBorder]}>
        <Text numberOfLines={1} style={[styles.font_md, styles.capitalize]}>{selectedValues}</Text>
        <FontAwesome5 name="arrow-down" size={12} />
      </Button>
      {modalVisible && <Modal enableSwipe={false}>
        {labels.map((item, index) => <CheckBoxPickerItem style={[styles.capitalize]} key={index} item={item} closeModal={closeModal} onChange={onChange} />)}
        <View style={[styles.row]}>
          <Button action={closeModal} style={[styles.marginRight_sm, styles.flexCenter, styles.bg_gray, styles.border_r_5, {flex: 1,}]}>
            <Text style={[styles.font_md, styles.color_white, styles.fontWeight_700, styles.uppercase]}>Cancel</Text>
          </Button>
          <Button style={[styles.marginRight_sm, styles.flexCenter, styles.bg_color1, styles.border_r_5, {flex: 1,}]}>
            <Text style={[styles.font_md, styles.color_white, styles.fontWeight_700, styles.uppercase]}>OK</Text>
          </Button>
        </View>
      </Modal>}
    </View>
  )
})

const CheckBoxPickerItem = React.memo(({item, onChange, closeModal }) => {
  const [isChecked, setIsCheked] = React.useState(value);
  const toggleCheckBox = () => setIsCheked(prev => !prev)
  const {label, value} = item;
  const action = () => {
    toggleCheckBox();
    // onChange(value);
    // closeModal()
  }
  return  (
    <View style={[styles.row, styles.marginBottom_md, styles.alignItems_center, styles.justifyContent_between]}>
      <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700, styles.capitalize]}>{label}</Text>
      <Button
        style={[styles.slimBorder, styles.flexCenter, {borderColor: colors.color1, width: 25, height: 25, borderRadius: 2 }]}
        isChecked={isChecked}
        action={action}
        rippleColor={colors.color1_opacity}
      >
      <Ionicons size={25} name="ios-checkmark" color={isChecked ? colors.color1 : 'transparent' } /> 
      </Button>
    </View>
  )
})