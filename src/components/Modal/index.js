import React, { Component, useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Animated,
  PanResponder,
  ViewComponent,
  Dimensions
} from "react-native";
import Modal from 'react-native-modal';
const DrawUpModal = ({children: Children, close, isVisible, ...rest}) => {
  return (
    <Modal isVisible={isVisible}
      onBackdropPress={close}
      onSwipeComplete={close}
      swipeDirection={['down','up']}
      style={{justifyContent: 'flex-end', margin: 0,}}
      {...rest}>
      <View style={{ backgroundColor: 'white', width: '100%', paddingBottom: 40, padding: 10,  borderRadius: 10 }}>
        {Children}
      </View>
    </Modal>
  );
};

const ResizableDrawUpModal = ({children: Children, close, isVisible, height}) => {
  return (
    <Modal isVisible={isVisible}
      style={{justifyContent: 'flex-end', margin: 0,}}
      swipeToClose={true}
      swipeArea={20} // The height in pixels of the swipeable area, window height by default
      swipeThreshold={50} // The threshold to reach in pixels to close the modal
      backdropOpacity={0.1}
      
    >
     <Animated.View style={{ backgroundColor: 'white', width: '100%', height, paddingBottom: 40, padding: 10,  borderRadius: 10 }}>
        {Children}
      </Animated.View>
    </Modal>
  )
}

export const useDrawUpModal = (children) => {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal=() => setModalVisible(false);
  const Modal = <DrawUpModal children={children} close={closeModal} isVisible={modalVisible} />
  return { Modal, openModal, closeModal }
}

export const useResizableDrawUpModal = ({children: Children, value = false, ...rest}) => {
  const maxValue = Dimensions.get('window').height * 0.8;
  const minValue = maxValue * 0.4;
  const [modalVisible, setModalVisible] = useState(value);
  const [isCollapsed, setIsCollapse] = useState(true)
  const [y] = useState( new Animated.Value(minValue));
  const panResponder = PanResponder.create({
    
    onPanResponderMove: (evt, gestureState) => {
      // The most recent move distance is gestureState.move{X,Y}
      // The accumulated gesture distance since becoming responder is
      // gestureState.d{x,y}
      y < maxValue ? alterAnimationValue(y + gestureState.dy) : null
      // gestureHandler.setValue({
      //   y: gestureState.dy
      // });
      console.log("onPanResponder: ", gestureState);
    },
  
  });
  const alterAnimationValue = (value) => {
    Animated.spring(y, {
      toValue: value,
      duration: 500,
    }).start();
  }
  const expandModal = () => {
    alterAnimationValue(maxValue);
    setIsCollapse(false)
  }
  const collapseModal = () => {
    alterAnimationValue(minValue);
    setIsCollapse(true);
  }
  const openModal = () => setModalVisible(true);
  const closeModal=() => setModalVisible(false);
  const Modal =
  <ResizableDrawUpModal
    children={<Children modalControl={{
      collapseModal, expandModal, modalVisible, closeModal, openModal, isCollapsed, panResponder}}
      {...rest} />
    }
    close={closeModal} isVisible={modalVisible} height={y}
  />
  return { Modal, openModal, closeModal, expandModal, collapseModal }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});