import React from 'react';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { View, Text, Dimensions, ImageBackground } from 'react-native';
import { Button, Modal, FilePicker } from '../../../components';
import { styles, colors } from '../../styles';
const { useDrawUpModal } = Modal;

const CoverPhoto = ({navigation}) => {
  const { image, pickImage, accessCamera } = FilePicker.usePermission();
  const { Modal, openModal, closeModal } = useDrawUpModal();
  const ImageSelectOptions = ({closeModal}) => {
    return (
      <View style={[styles.row, styles.padding_md]}>
        <View style={[styles.marginRight_lg]}>
          <Button action={() => {
              pickImage();
              closeModal()
              }}
            style={[styles.alignItems_center, styles.padding_md]}>
            <MaterialIcons name="photo" color={colors.color1} size={30} style={[styles.marginBottom_sm]} />
            <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700]}>Gallery</Text>
          </Button>
        </View>
        <View style={[styles.border_r_5]}>
          <Button action={() => {
              accessCamera();
              closeModal()
            }}
            style={[styles.alignItems_center, styles.padding_md]}>
            <FontAwesome5 name="camera-retro" color={colors.color1} size={30} style={[styles.marginBottom_sm]} />
            <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700]}>Camera</Text>
          </Button>
        </View>
      </View>
    )
  }

  return (
    <View style={{width: Dimensions.get('window').width, height: 300}}>
      <Button style={[{flex: 1}]} action={openModal}>
        <ImageBackground source={image ? {uri: image} : require('../../../assets/chef.jpg')} style={{flex: 1}} resizeMethod="scale">
          <Modal closeOnBackdropPress={true}>
            <ImageSelectOptions closeModal={closeModal} />
          </Modal>
        </ImageBackground>
      </Button>
    </View>
  )
}

export default CoverPhoto;