import * as React from 'react';
import { View, Text } from 'react-native';
import { useCenterModal } from '../Modal';
import { Button } from '../Buttons';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { styles, colors } from '../styles';
export default usePicker = (labels = []) => {
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
})
