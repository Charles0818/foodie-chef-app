import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from "react-native";
import Modal from 'react-native-modal';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
const DrawUpModal = ({children: Children, close, backdropOpacity, closeOnBackdropPress, isVisible, enableSwipe, ...rest}) => {

  const swipeProps = {
    onSwipeComplete: close,
    swipeDirection: ['down','up']
  }
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeOnBackdropPress ? close : null}
      { ...enableSwipe ? swipeProps : null }
      onBackButtonPress={close}
      backdropOpacity={backdropOpacity}
      style={{justifyContent: 'flex-end', margin: 0,}}
      {...rest}>
      <View style={[styles.borderTop_r_35, { backgroundColor: 'white', width: '100%', paddingBottom: 10,}]}>
        {Children}
      </View>
    </Modal>
  );
};

const ResizableDrawUpModal = ({children: Children, close, isVisible, height, expandModal, collapseModal}) => {
  console.log('height', height);
  const config = {
    velocityThreshold: 0.6,
    directionalOffsetThreshold: 80,
    
  };
  return isVisible && (
    <GestureRecognizer
      config={config}
      onSwipeUp={expandModal}
      onSwipeDown={collapseModal}>
      <View isVisible={isVisible}
        style={[{ flex: 1, position: 'absolute', bottom: 0}]}
        backdropOpacity={0.1}
        onBackButtonPress={close}>
      
        <Animated.View
          style={[
            styles.borderTop_r_35, {flex:1, backgroundColor: 'white', width: '100%',
            maxHeight: height,
          }]}>
          {Children}
        </Animated.View>
      </View>
    </GestureRecognizer>
  )
}

export const useDrawUpModal = (value = false) => {
  const [modalVisible, setModalVisible] = useState(value);
  const openModal = () => {
    setModalVisible(true)
  }
  const closeModal=() => {
    setModalVisible(false)
  }
  const Modal = ({children, enableSwipe = true, backdropOpacity = 0.5, closeOnBackdropPress = true }) => {
    return <DrawUpModal children={children} backdropOpacity={backdropOpacity}
      enableSwipe={enableSwipe} close={closeModal}
       closeOnBackdropPress={closeOnBackdropPress} isVisible={modalVisible}
    />
  }
  return { Modal, openModal, closeModal, modalVisible }
}

const CenterModal = ({children: Children, close, backdropOpacity, closeOnBackdropPress, isVisible, enableSwipe, ...rest}) => {
  const swipeProps = {
    onSwipeComplete: close,
    swipeDirection: ['down','up']
  }
  return (
      <Modal
        isVisible={isVisible}
        onBackdropPress={closeOnBackdropPress ? close : null}
        { ...enableSwipe ? swipeProps : null }
        onBackButtonPress={close}
        backdropOpacity={backdropOpacity}
        {...rest}>
        <View style={{ backgroundColor: 'white',  paddingBottom: 20, padding: 10,  borderRadius: 10 }}>
          {Children}
        </View>
      </Modal>
  )
}

export const useCenterModal = (value = false) => {
  const [modalVisible, setModalVisible] = useState(value);
  const openModal = () => setModalVisible(true);
  const closeModal=() => setModalVisible(false);
  const Modal = ({children, enableSwipe = true, backdropOpacity = 0.5, closeOnBackdropPress = true }) =>
    <CenterModal children={children} backdropOpacity={backdropOpacity}
      enableSwipe={enableSwipe} close={closeModal}
      isVisible={modalVisible} closeOnBackdropPress={closeOnBackdropPress}
    />
  return { Modal, openModal, closeModal, modalVisible }
}
export const useResizableDrawUpModal = (value = false) => {
  const maxHeight = Dimensions.get('window').height * 0.90;
  const minHeight = maxHeight * 0.4;
  const initialState = {
    modalVisible: value, isCollapsed: false
  }
  const [state, setState] = useState(initialState);
  const y = useRef( new Animated.Value(maxHeight)).current;
  const alterAnimationValue = (value, isCollapsed) => {
    Animated.timing(y, {
      toValue: value,
      duration: 500,
    }).start(({ finished }) => {
      value <= 0 ? setState({modalVisible: false, isCollapsed}) : null
    });
  }
 
  const expandModal = () => {
    alterAnimationValue(maxHeight, false);
  }
  const collapseModal = () => {
    alterAnimationValue(minHeight, true);
  }
  const openModal = () => {
    setState(initialState);
    alterAnimationValue(minHeight);
  }
  const closeModal=() => {
    alterAnimationValue(-20);
  }
  const { modalVisible, isCollapsed } = state;
  const Modal = ({children}) =>
    <ResizableDrawUpModal
      children={children} close={closeModal} isVisible={modalVisible} height={y} expandModal={expandModal} collapseModal={collapseModal}
    />
  return { Modal, openModal, closeModal, modalVisible, expandModal, isCollapsed, collapseModal, height: y }
}

const styles = StyleSheet.create({
  borderTop_r_35: {
    borderTopRightRadius: 35,
    borderTopLeftRadius:35,
  },
})