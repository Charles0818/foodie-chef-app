import React from 'react';
import { Dimensions, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Screen } from '../Wrapper';
import { styles, colors } from '../styles';
import { Button, Modal, Map, Animations} from '../../components';
import { RequestDetails } from './Components';
const { useResizableDrawUpModal } = Modal;
const { useMap } = Map;

export const OpenModalButton = ({action}) => {
  return (
    <Animations.FadeIn style={[styles.boxShadow_sm, { position: 'absolute',width: 50, height: 50, borderRadius: 25, overflow:'hidden',bottom: 15, right: 20}]}>
      <Button action={action} style={[styles.flexCenter, styles.bg_white,{ flex:1,}]}>
        <MaterialIcons name="visibility" size={30} color={colors.color1} />
      </Button>
    </Animations.FadeIn>
  )
}
const ServiceDetail = () => {
  
  const {
    Modal, collapseModal, expandModal, modalVisible, closeModal, openModal, isCollapsed, height
  } = useResizableDrawUpModal(true);
  console.log('isCollapsed', isCollapsed)
  return (
    <Screen>
      <MapInterface />
      {!modalVisible && <OpenModalButton action={openModal} />}
      <Modal>
        <RequestDetails
          modalControl={{
            collapseModal, expandModal, closeModal,
            openModal, isCollapsed, modalVisible,
          }}
        />
      </Modal>
    </Screen>
  )
}

const MapInterface = React.memo(() => {
  const { GoogleMap } = useMap();
  return (
    <Animated.View style={[serviceStyle.mapContainer, {height: Dimensions.get('window').height}]}>
      <GoogleMap />
    </Animated.View>
  )
})


const serviceStyle = StyleSheet.create({
  mapContainer: {
    width: '100%',
  }
})
export default ServiceDetail;
