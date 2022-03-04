/* eslint-disable react-native/no-inline-styles */
import { Text, View, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';

function ModalComponent({ title, onModal }) {
  const [modal, setModal] = useState(true);
  console.log('TITLE-MODAL', title);
  console.log('ON-MODAL MODAL', onModal);

  return (
    <Modal
      visible={onModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => {
        setModal(false);
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            width: '90%',
            height: '30%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: 'black',
              fontSize: 30,
              fontFamily: 'Poppins-Regular',
              fontWeight: '700',
            }}
          >
            Error
          </Text>
          <Pressable
            style={{
              backgroundColor: '#FFCD61',
              marginTop: 90,
              height: '20%',
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => {
              setModal(!modal);
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Poppins-Regular',
                color: 'black',
                fontWeight: '400',
              }}
            >
              OK
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default ModalComponent;
