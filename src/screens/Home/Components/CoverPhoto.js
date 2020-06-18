import React, { useCallback, useEffect } from 'react';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { View, Text, Dimensions, ImageBackground } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect, useSelector, shallowEqual } from 'react-redux';
import { Button, Modal, FilePicker, Spinners } from '../../../components';
import { actions, ajax } from '../../../helpers';
import { styles, colors } from '../../styles';
const { useDrawUpModal } = Modal;
const { useAjaxStatus } = ajax;
const { useOverlaySpinner } = Spinners;
const { chefInfoActions: { chefInfoPartialUpdateRequest } } = actions;
const CoverPhoto = React.memo(({ coverPhoto, updateCoverPhoto }) => {
  const { image, imageBlob, parseFileForUpload, pickImage, accessCamera } = FilePicker.usePermission({initialImage: coverPhoto});
  console.log('this is the new image', image)
  const { Modal, openModal, closeModal } = useDrawUpModal();
  const { AjaxStatus, setAjaxStatus } = useAjaxStatus();
  const { animating, setAnimating, OverlaySpinner } = useOverlaySpinner()
  const uploadImage = image =>
    updateCoverPhoto({ banner_avatar: parseFileForUpload(image) }, setAnimating, setAjaxStatus)

  console.log('imageBlob =>', imageBlob)
  const ImageSelectOptions = React.memo(({closeModal}) => {
    return (
      <View style={[styles.row, styles.padding_md]}>
        <View style={[]}>
          <Button action={() => {
              pickImage("Image", uploadImage);
              closeModal();
              }}
            style={[styles.alignItems_center, styles.padding_md]}>
            <MaterialIcons name="photo" color={colors.color1} size={30} style={[styles.marginBottom_sm]} />
            <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700]}>Gallery</Text>
          </Button>
        </View>
        <View style={[styles.border_r_5]}>
          <Button action={() => {
              accessCamera("Image", uploadImage);
              closeModal();
            }}
            style={[styles.alignItems_center, styles.padding_md]}>
            <FontAwesome5 name="camera-retro" color={colors.color1} size={30} style={[styles.marginBottom_sm]} />
            <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700]}>Camera</Text>
          </Button>
        </View>
      </View>
    )
  })

  return (
    <View style={[styles.overflow_h, {width: Dimensions.get('window').width, height: 300}]}>
      <Button style={[{flex: 1}]} action={openModal}>
        <ImageBackground source={image ? {uri: image} : require('../../../assets/chef.jpg')}
         defaultSource={require('../../../assets/chef.jpg')} style={{width: '100%', flex: 1}} resizeMethod="scale">
          <Modal closeOnBackdropPress={true}>
            <ImageSelectOptions closeModal={closeModal} />
          </Modal>
        </ImageBackground>
      </Button>
      <AjaxStatus />
      <OverlaySpinner />
    </View>
  )
})

const mapBannerToProps = state => {
  return { coverPhoto: state.chefInfoReducer.banner_avatar }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateCoverPhoto: chefInfoPartialUpdateRequest }, dispatch)

export default connect(mapBannerToProps, mapDispatchToProps)(CoverPhoto);