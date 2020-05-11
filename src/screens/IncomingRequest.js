import React, { memo } from 'react';
import { View, Text, Image, ImageBackground, ScrollView, Dimensions, StyleSheet, Animated } from 'react-native';
import { FontAwesome5, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Screen, Section } from './Wrapper';
import { styles, colors } from './styles';
import { Button, Utils, Modal, Carousels, Form, Map} from '../components'
import { OpenModalButton } from './ServiceRequest';
import { useNavigation } from '@react-navigation/core';
const { useDrawUpModal, useCenterModal } = Modal;
const { formatting: { timeFormat_12hr, quantifier }, dataConstants: { declineRequestReasons } } = Utils;
const { useCheckBox } = Form;
const { useMap } = Map
const IncomingRequest = () => {
  
  const { Modal: RequestDetailsModal, openModal, closeModal: closeRequestModal, modalVisible } = useDrawUpModal(true);
  const { Modal: DeclineRequestModal, openModal: openDeclineRequestModal, closeModal: closeDeclineRequestModal } = useCenterModal();
  const { Modal: DeclineReasonsModal, openModal: openDeclineReasonsModal, closeModal: closeDeclineReasonsModal } = useCenterModal();
  return (
    <Screen>
      <MapInterface />
      {!modalVisible && <OpenModalButton action={openModal} />}
      <RequestDetailsModal enableSwipe={false} backdropOpacity={0} closeOnBackdropPress={false}>
        <RequestDetails declineRequest={openDeclineRequestModal} closeModal={closeRequestModal} />
      </RequestDetailsModal>
      <DeclineRequestModal enableSwipe={false} closeOnBackdropPress={false}>
        <ConfirmRejection goBack={closeDeclineRequestModal}
          proceed={() => { openDeclineReasonsModal(); closeDeclineRequestModal()}}
        />
      </DeclineRequestModal>
      <DeclineReasonsModal enableSwipe={false} closeOnBackdropPress={false}>
        <SubmitRejectionReasons goBack={ closeDeclineReasonsModal } />
      </DeclineReasonsModal>
    </Screen>
  )
}

const MapInterface = () => {
  const { GoogleMap } = useMap()
  return (
    <View style={[styles.bg_color1, {width: '100%', height: Dimensions.get('window').height}]}>
      <GoogleMap />
    </View>
  )
}

const RequestDetails = ({declineRequest, closeModal}) => {
  const { navigate } = useNavigation();
  const accept = () => {
    closeModal();
    navigate('ServiceRequest')
  }
  return (
    <Section style={[styles.paddingHorizontal_md]}>
      <View style={[styles.flexCenter]}>
        <View style={[styles.avatar, styles.marginRight_sm, {overflow: 'hidden', borderStyle: 'dashed', transform: [{translateY: -styles.avatar.height / 2}]} ]}>
          <Image source={require('../assets/avatar.jpg')} style={{width: '100%', overflow: 'hidden', flex: 1 }} />
        </View>
      </View>
      <View style={[styles.paddingBottom_sm, styles.slimBorderBottom]}>
        <View style={[styles.row, styles.justifyContent_between, styles.alignItems_center]}>
          <Text numberOfLines={1} style={[styles.font_xsm, styles.color_gray, styles.fontWeight_700]}>Deliver by {timeFormat_12hr()}</Text>
          <Text numberOfLines={1} style={[styles.font_xsm, styles.color_gray, styles.fontWeight_700]}>{quantifier(4, 'item')}</Text>
        </View>
        <View style={[styles.row, styles.justifyContent_between, styles.alignItems_center]}>
          <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700]}>Monicas' Trattoria</Text>
          <Text numberOfLines={1} style={[styles.font_xsm, styles.color_gray, styles.fontWeight_700]}>{'5.3 mi total'}</Text>
        </View>
      </View>
      <View style={[styles.paddingVertical_sm, styles.flexCenter]}>
        <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700, styles.marginBottom_sm]}>$7.22</Text>
        <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700, styles.marginBottom_sm]}>Guaranteed including tips</Text>
      </View>
      <View style={[styles.row]}>
        <View style={[styles.marginRight_sm, {flex: 1, height: 50}]}>
          <Button action={accept}
            style={[styles.flexCenter, styles.bg_color3, styles.border_r_5, {flex: 1}]}>
            <Text numberOfLines={1} style={[styles.font_md, styles.color_white, styles.uppercase]}>accept</Text>
          </Button>
        </View>
        <View style={[{flex: 1, height: 50}]}>
          <Button action={declineRequest} style={[styles.flexCenter, styles.bg_danger, styles.border_r_5, {flex: 1}]}>
            <Text numberOfLines={1} style={[styles.font_md, styles.color_white, styles.uppercase]}>decline</Text>
          </Button>
        </View>
      </View>
    </Section>
  )
}

const ConfirmRejection = ({goBack, proceed}) => {
  return (
    <Section style={[]}>
      <View style={[styles.flexCenter]}>
        <Text style={[styles.font_lg, styles.fontWeight_700, styles.marginBottom_md]}>Are you sure?</Text>
        {/* <Text style={[styles.font_md, styles.marginBottom_xsm]}>You're the best FooDoorer for this order!</Text> */}
        <Text style={[styles.font_md, styles.marginBottom_md, styles.text_center]}>You're the best FooDoorer for this order! Your acceptance rate will drop to:</Text>
        <Text style={[styles.font_xxlg, styles.color1, styles.marginBottom_md]}>48%</Text>
        <Text style={[styles.font_md, styles.text_center, styles.marginBottom_md, {lineHeight: 22}]}>Consistently accept delivery opportunities to rise you Acceptance</Text>
      </View>
      <View style={[styles.row]}>
        <View style={[styles.marginRight_sm, {flex: 1, height: 50}]}>
          <Button rippleColor={colors.color3_opacity} action={goBack}
            style={[styles.flexCenter, styles.border_r_5, styles.slimBorder, {flex: 1, borderColor: colors.color3}]}>
            <Text numberOfLines={1} style={[styles.font_md, styles.color3, styles.capitalize]}>Go Back</Text>
          </Button>
        </View>
        <View style={[{flex: 1, height: 50}]}>
          <Button rippleColor={colors.danger_opacity} action={proceed}
            style={[styles.flexCenter, styles.border_r_5, styles.slimBorder, {flex: 1, borderColor: colors.danger}]}>
            <Text numberOfLines={1} style={[styles.font_md, styles.color_danger, styles.capitalize]}>decline</Text>
          </Button>
        </View>
      </View>
    </Section>
  )
}

const SubmitRejectionReasons = ({goBack}) => {
  const options = declineRequestReasons.map(reason => {
    return { text: reason, checked: false }
  })
  const Option = ({option, index}) => {
    const { text } = option
    const { isChecked, CustomCheckBox, toggleCheckBox } = useCheckBox(option.checked);
    options[index].checked = isChecked;
    // console.log(options);
    return (
      <View onPress={toggleCheckBox}
        style={[styles.row, styles.alignItems_center, styles.justifyContent_between, styles.marginBottom_md,]}>
        <Text numberOfLines={1} style={[styles.font_md, styles.color_dark, {lineHeight: 25}]}>
          {text}
        </Text>
        <CustomCheckBox />
      </View>
    )
  }
  return (
    <Section style={[styles.paddingVertical_sm]}>
      <Text numberOfLines={1} style={[styles.font_lg, styles.fontWeight_700, styles.text_center, styles.capitalize, styles.marginBottom_md]}>tell us why</Text>
      {options.map((option, index) => <Option option={option} key={index} index={index} />)}
      <View style={[styles.row, styles.paddingTop_sm]}>
        <View style={[styles.marginRight_sm, {flex: 1, height: 50}]}>
          <Button action={goBack} rippleColor={colors.color3_opacity}
            style={[styles.flexCenter, styles.border_r_5, styles.slimBorder, {flex: 1, borderColor: colors.color3}]}>
            <Text numberOfLines={1} style={[styles.font_md, styles.fontWeight_700, styles.color3, styles.capitalize]}>Go Back</Text>
          </Button>
        </View>
        <View style={[{flex: 1, height: 50}]}>
          <Button
            style={[styles.flexCenter, styles.border_r_5, styles.bg_danger, {flex: 1}]}>
            <Text numberOfLines={1} style={[styles.font_md, styles.color_white, styles.capitalize]}>submit</Text>
          </Button>
        </View>
      </View>
    </Section>
  )
}


export default memo(IncomingRequest);