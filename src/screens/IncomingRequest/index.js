import React, { memo } from 'react';
import { View, Dimensions} from 'react-native';
import { Screen } from '../Wrapper';
import { styles, colors } from '../styles';
import { Modal, Map} from '../../components'
import { OpenModalButton } from '../ServiceRequest';
import { RequestDetails, SubmitRejectionReasons, ConfirmRejection } from './Components';

const { useDrawUpModal, useCenterModal } = Modal;
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

export default memo(IncomingRequest);