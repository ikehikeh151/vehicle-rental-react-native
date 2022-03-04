/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React, { useState, useEffect } from 'react';
// import { API_URL } from '@env';
import { getVehicleByIdApi } from '../utils/vehicles';
import defaultPhoto from '../assets/Images/popular-default.jpg';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Loading from '../components/Loading';

const width = Dimensions.get('window').width;

const DetailVehicle = ({ navigation, route }) => {
  const { id } = route.params;
  const [vehicle, setVehicle] = useState([]);
  // const [photo, setPhoto] = useState({});
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  // setPhoto(
  //   vehicle.length > 0 && { uri: API_URL + JSON.parse(vehicle.photo)[0] },
  // );
  // console.log('VEHICLE', parseInt(stock));

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <ImageBackground
            style={{ height: 300, width: width }}
            source={defaultPhoto}
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
              <Text
                style={{
                  fontFamily: 'Nunito-Regular',
                  fontWeight: '700',
                  color: 'black',
                  fontSize: 28,
                  marginBottom: 10,
                }}
              >
                {`Rp ${vehicle.price}  /day`}
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
                    color: '#9999',
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
                    color: '#9999',
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
                    {counter}
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
                  Edit Item
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default DetailVehicle;
