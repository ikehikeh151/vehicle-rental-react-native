/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import { API_URL } from '@env';
import Loading from '../components/Loading';
import { Picker } from '@react-native-picker/picker';
import { getVehicleByIdApi } from '../utils/vehicles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import defaultPhoto from '../assets/Images/popular-default.jpg';
import { editVehicleApi, deleteVehicleAPi } from '../utils/vehicles';

const width = Dimensions.get('window').width;

const DetailVehicle = ({ navigation, route }) => {
  const auth = useSelector(state => state.auth);
  const role = auth.authUser.role;
  const token = auth.authUser.token;
  const { id } = route.params;
  const [vehicle, setVehicle] = useState([]);
  const [counter, setCounter] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [statusStock, setStatusStock] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const { photo } = vehicle;
  const photoView =
    Object.keys(vehicle).length > 0 ? JSON.parse(photo)[0] : null;

  const numberToRupiah = bilangan => {
    let separator = '';
    let number_string = bilangan;
    if (typeof bilangan === 'number') {
      number_string = bilangan.toString();
    }
    let sisa = number_string.length % 3,
      rupiah = number_string.substr(0, sisa),
      ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
    return rupiah;
  };

  const handlerUpdateItemAdmin = () => {
    console.log('UPDATE!!!');
    const body = {
      stock: counter,
      status: statusStock,
    };

    editVehicleApi(token, body, id)
      .then(res => {
        if (res.status === 200) {
          setModalVisible(true);
          // console.log(res);
          setMessage(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handlerDeleteVehicleAdmin = () => {
    deleteVehicleAPi(id)
      .then(res => {
        if (res.status === 200) {
          setModalVisible(true);
          // console.log(res);
          setMessage(res.data.message);
          console.log('Delete Berhasil ^_^');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getVehicleByIdApi(id)
      .then(res => {
        setVehicle(res.data.result[0]);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
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
                    margin: 20,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 35,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                  }}
                >
                  <Text
                    style={{
                      marginBottom: 15,
                      textAlign: 'center',
                      color: 'black',
                      fontSize: 25,
                      fontFamily: 'Poppins-Regular',
                      fontWeight: '700',
                    }}
                  >
                    {message}
                  </Text>
                  <Pressable
                    style={{
                      backgroundColor: '#FFCD61',
                      borderRadius: 10,
                      width: 100,
                      padding: 15,
                      elevation: 2,
                    }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setEditMode(false);
                      navigation.navigate('HomeScreen');
                    }}
                  >
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        elevation: 2,
                      }}
                    >
                      Ok
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>

          <ImageBackground
            style={{ height: 300, width: width }}
            source={
              Object.keys(vehicle).length > 0
                ? { uri: API_URL + photoView }
                : defaultPhoto
            }
          >
            <View
              style={{
                // borderWidth: 5,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 30,
              }}
            >
              <Icon
                name="chevron-left"
                size={30}
                style={{ color: '#fff' }}
                onPress={() => {
                  navigation.goBack();
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: 70,
                  // borderWidth: 1,
                  backgroundColor: '#F8A170',
                  padding: 5,
                  borderRadius: 40,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Nunito-Regular',
                    fontSize: 12,
                    fontWeight: '800',
                    color: 'white',
                  }}
                >
                  4.5
                </Text>
                <Icon name="star" size={14} style={{ color: '#fff' }} />
              </View>
            </View>
          </ImageBackground>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <View style={{ width: '90%' }}>
              <View
                style={{
                  flex: 1,
                  // borderWidth: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Nunito-Regular',
                    fontWeight: '700',
                    color: 'black',
                    fontSize: 28,
                  }}
                >
                  {vehicle.name}
                </Text>

                <TouchableOpacity
                  style={{
                    // borderWidth: 1,
                    width: 40,
                    height: 40,
                    padding: 10,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFCD61',
                    display: editMode ? 'flex' : 'none',
                  }}
                  onPress={handlerDeleteVehicleAdmin}
                >
                  <Icon2
                    name="trash-o"
                    style={{ color: 'black', fontSize: 18, fontWeight: '700' }}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontFamily: 'Nunito-Regular',
                  fontWeight: '700',
                  color: 'black',
                  fontSize: 28,
                  marginBottom: 10,
                }}
              >
                {`Rp. ${numberToRupiah(parseInt(vehicle.price))} /day`}
              </Text>
              <Text
                style={{
                  fontFamily: 'Nunito-Regular',
                  fontWeight: '400',
                  color: 'black',
                  fontSize: 16,
                }}
              >
                {`Max for ${vehicle.capacity} person`}
              </Text>
              <Text
                style={{
                  fontFamily: 'Nunito-Regular',
                  fontWeight: '400',
                  color: 'black',
                  fontSize: 16,
                  marginBottom: 10,
                }}
              >
                No Prepayment
              </Text>
              <Text
                style={{
                  fontFamily: 'Nunito-Regular',
                  fontWeight: '700',
                  color: 'green',
                  fontSize: 16,
                }}
              >
                {vehicle.status}
              </Text>

              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  // justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    // borderWidth: 1,
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFC7A7',
                    marginRight: 40,
                  }}
                >
                  <Icon
                    name="map-marker-alt"
                    style={{ color: '#F8A170', fontSize: 18 }}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: 'Nunito-Regular',
                    fontWeight: '600',
                    fontSize: 16,
                    color: 'grey',
                  }}
                >
                  {vehicle.location}
                </Text>
              </View>

              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  // justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    // borderWidth: 1,
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFC7A7',
                    marginRight: 40,
                  }}
                >
                  <Icon
                    name="running"
                    style={{ color: '#F8A170', fontSize: 18 }}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: 'Nunito-Regular',
                    fontWeight: '600',
                    fontSize: 16,
                    color: 'grey',
                  }}
                >
                  3.2 miles from your location
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontWeight: '700',
                    fontSize: 18,
                    color: '#393939',
                  }}
                >
                  Stock
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    width: 140,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 30 / 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#FFCD61',
                    }}
                    onPress={() => {
                      setCounter(counter > 0 ? counter - 1 : 0);
                    }}
                  >
                    <Icon name="minus" style={{ color: 'black' }} />
                  </TouchableOpacity>

                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Poppins-Regular',
                      fontWeight: 'bold',
                      fontSize: 15,
                    }}
                  >
                    {!editMode ? vehicle.stock : counter}
                  </Text>

                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 30 / 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#FFCD61',
                    }}
                    onPress={() => {
                      setCounter(counter + 1);
                    }}
                  >
                    <Icon name="plus" style={{ color: 'black' }} />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  width: '100%',
                  marginBottom: 5,
                  marginTop: 20,
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: '#393939',
                  opacity: 0.8,
                  color: 'black',
                  display: editMode ? 'flex' : 'none',
                }}
              >
                <Picker
                  dropdownIconColor="white"
                  selectedValue={statusStock}
                  style={{
                    height: 50,
                    width: '100%',
                    color: '#fff',
                  }}
                  onValueChange={itemValue => setStatusStock(itemValue)}
                >
                  <Picker.Item label="Available" value="1" />
                  <Picker.Item label="Full Booked" value="2" />
                </Picker>
              </View>

              {role === '2' ? (
                editMode ? (
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      height: 70,
                      backgroundColor: '#FFCD61',
                      marginTop: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      handlerUpdateItemAdmin();
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'Nunito-Regular',
                        fontSize: 24,
                        fontWeight: '800',
                        color: '#393939',
                      }}
                    >
                      Update Item
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      height: 70,
                      backgroundColor: '#FFCD61',
                      marginTop: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      editMode ? setEditMode(false) : setEditMode(true);
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'Nunito-Regular',
                        fontSize: 24,
                        fontWeight: '800',
                        color: '#393939',
                      }}
                    >
                      Edit Item
                    </Text>
                  </TouchableOpacity>
                )
              ) : (
                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: 70,
                    backgroundColor: '#FFCD61',
                    marginTop: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Nunito-Regular',
                      fontSize: 24,
                      fontWeight: '800',
                      color: '#393939',
                    }}
                  >
                    Reservation
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default DetailVehicle;
