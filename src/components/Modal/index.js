import React, { Component, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  Button,
  View
} from "react-native";
import Modal from 'react-native-modal';
const DrawUpModal = ({children: Children, close, isVisible}) => {
  return (
      <Modal isVisible={isVisible}
        onBackdropPress={close}
        onSwipeComplete={close}
        swipeDirection={['left', 'right', 'down']}
        style={{justifyContent: 'flex-end', margin: 0,}}>
        <View style={{ backgroundColor: 'white', width: '100%', paddingBottom: 40, padding: 10,  borderRadius: 10 }}>
          {Children}
        </View>
      </Modal>
  );
};

export const useDrawUpModal = (children) => {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal=() => setModalVisible(false);
  const Modal = <DrawUpModal children={children} close={closeModal} isVisible={modalVisible} />
  return { Modal, openModal, closeModal }
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