import React, { useCallback, memo } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect, shallowEqual } from 'react-redux';
import { Section, Screen } from '../../../Wrapper';
import { Form , Utils, Button, FilePicker, Modal } from '../../../../components';
import { actions } from '../../../../helpers';
import { styles, colors } from '../../../styles';
const { usePermission } = FilePicker;
const { useDrawUpModal } = Modal;
const { userActions: { userPartialUpdateRequest } } = actions;
const ProfileCard = ({ avatar, name, updateAvatar }) => {
  const { image, imageBlob, pickImage, accessCamera } = usePermission({ initialImage: avatar});
  const { Modal, openModal, closeModal } = useDrawUpModal();
  const uploadAvatar = useCallback(
    updateAvatar({ avatar: imageBlob }, setAnimating, setAjaxStatus),
  [imageBlob])
  const ImageSelectOptions = memo(({closeModal}) => {
    return (
      <View style={[styles.row, styles.padding_md]}>
        <View style={[styles.marginRight_lg]}>
          <Button action={() => {
              pickImage();
              closeModal();
              uploadAvatar();
              }}
            style={[styles.alignItems_center, styles.padding_md]}>
            <MaterialIcons name="photo" color={colors.color1} size={30} style={[styles.marginBottom_sm]} />
            <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700]}>Gallery</Text>
          </Button>
        </View>
        <View style={[styles.border_r_5]}>
          <Button action={() => {
              accessCamera();
              closeModal();
              uploadAvatar();
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
    <View style={[styles.flexCenter, styles.padding_md, {backgroundColor: '#f0f0f0', height: 150}]}>
      <View style={[styles.row, styles.alignItems_center]}>
        <Button action={openModal} style={[styles.avatar, styles.marginRight_md]}>
          <Image source={image ? {uri: image} : require('../../assets/avatar.jpg')}
            style={[{width: '100%', flex: 1}]} />
        </Button>
        <View style={[styles.row, styles.alignItems_center]}>
          <View style={[styles.marginRight_lg]}>
            <Text numberOfLines={1} style={[styles.font_lg, styles.marginBottom_xsm, styles.capitalize, styles.fontWeight_700]}>cameroon cook</Text>
            <View style={[styles.row, styles.border_r_5, styles.alignItems_center, styles.padding_sm, styles.bg_color1, { width: 100 }]}>
              <FontAwesome5 name="crown" size={12} color={colors.white} style={[styles.marginRight_xsm]} />
              <Text numberOfLines={1} style={[styles.font_xsm, styles.color_white, styles.capitalize]}>VIP member</Text>
            </View>
          </View>
        </View>
      </View>
      <Modal closeOnBackdropPress={true}>
        <ImageSelectOptions closeModal={closeModal} />
      </Modal>
    </View>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateAvatar: userPartialUpdateRequest }, dispatch)

export default connect(null, mapDispatchToProps)(ProfileCard);