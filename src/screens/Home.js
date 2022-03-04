/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import { API_URL } from '@env';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Loading from '../components/Loading';
import imgBanner from '../assets/Images/banner-home.png';
// import imgProduct from '../assets/Images/category_car.png';
import {
  getVehiclesCarsApi,
  getVehiclesMotorBikeApi,
  getVeihcleBikeApi,
} from '../utils/vehicles';

const Home = ({ navigation }) => {
  const auth = useSelector(state => state.auth);
  const role = auth.authUser.role;
  const [cars, setCars] = useState([]);
  const [motorBike, setMotorBike] = useState([]);
  const [bike, setBike] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getVehiclesCarsApi()
      .then(res => {
        setCars(res.data.result);
        setIsLoading(false);
      })
      .catch(err => {
        console.log('ERROR VEHICLE CAR API', err);
        alert('Server error occurred ...');
      });

    getVehiclesMotorBikeApi()
      .then(res => {
        setMotorBike(res.data.result);
      })
      .catch(err => {
        console.log('ERROR VEHICLE MOTORBIKE API', err);
        alert('Server error occurred ...');
      });

    getVeihcleBikeApi()
      .then(res => {
        setBike(res.data.result);
      })
      .catch(err => {
        console.log('ERROR VEHICLE BIKE API', err);
        alert('Server error occurred ...');
      });
  }, []);

  // console.log(motorBike);
  // console.log(API_URL);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <View
            style={{
              position: 'relative',
              alignItems: 'center',
            }}
          >
            <Image source={imgBanner} style={{ width: '100%' }} />
            <TextInput
              placeholder="Search Vehicles"
              placeholderTextColor="#fff"
              style={{
                position: 'absolute',
                width: '90%',
                borderWidth: 1,
                backgroundColor: 'black',
                opacity: 0.5,
                fontFamily: 'Nunito-Regular',
                fontWeight: 'bold',
                borderRadius: 10,
                marginTop: 70,
                color: 'white',
                paddingStart: 20,
              }}
            />

            <View style={{ position: 'absolute', width: '90%' }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddItemScreen');
                }}
                style={
                  role === 2
                    ? {
                        backgroundColor: '#FFCD61',
                        height: 54,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 140,
                        borderRadius: 10,
                      }
                    : {
                        backgroundColor: '#FFCD61',
                        height: 54,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 140,
                        borderRadius: 10,
                        display: 'none',
                      }
                }
              >
                <Text
                  style={{
                    fontFamily: 'Nunito-Regular',
                    fontWeight: 'bold',
                    color: '#393939',
                  }}
                >
                  Add New Item
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* CARS */}
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',

                marginTop: 20,
                width: '90%',
              }}
            >
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Nunito-Regular',
                  fontWeight: 'bold',
                  fontSize: 22,
                }}
              >
                Cars
              </Text>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: 80,
                  flexDirection: 'row',
                }}
                onStartShouldSetResponder={() =>
                  navigation.navigate('CategoryVehicle', {
                    category: 'cars',
                    cars: cars,
                  })
                }
              >
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Nunito-Regular',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}
                >
                  View More
                </Text>
                <Icon
                  name="chevron-right"
                  style={{ color: 'black', fontSize: 15 }}
                />
              </View>
            </View>

            <ScrollView horizontal style={{ padding: 20 }}>
              {cars.length > 0 &&
                cars.map((item, idx) => {
                  // console.log('ITEM-CARS >>>>', item);
                  const photo = JSON.parse(item.photo);

                  return (
                    <View
                      style={{
                        width: 265,
                        height: 168,
                        borderRadius: 15,
                        marginRight: 20,
                        overflow: 'hidden',
                      }}
                      key={idx}
                      onTouchEnd={() => {
                        navigation.navigate('DetailVehicleScreen', {
                          id: item.id,
                        });
                      }}
                    >
                      <Image
                        source={{ uri: API_URL + photo[0] }}
                        style={{
                          width: undefined,
                          height: undefined,
                          resizeMode: 'cover',
                          flex: 1,
                        }}
                      />
                    </View>
                  );
                })}
            </ScrollView>
          </View>

          {/* MOTORBIKE */}
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',

                marginTop: 20,
                width: '90%',
              }}
            >
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Nunito-Regular',
                  fontWeight: 'bold',
                  fontSize: 22,
                }}
              >
                Motor Bike
              </Text>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: 80,
                  flexDirection: 'row',
                }}
                onStartShouldSetResponder={() =>
                  navigation.navigate('CategoryVehicle', {
                    category: 'motorbike',
                    motorbike: motorBike,
                  })
                }
              >
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Nunito-Regular',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}
                >
                  View More
                </Text>
                <Icon
                  name="chevron-right"
                  style={{ color: 'black', fontSize: 15 }}
                />
              </View>
            </View>

            <ScrollView horizontal style={{ padding: 20 }}>
              {motorBike.length > 0 &&
                motorBike.map((item, idx) => {
                  // console.log('ITEM-MOTORBIKE >>>>', item);
                  const photo = JSON.parse(item.photo);

                  return (
                    <View
                      style={{
                        width: 265,
                        height: 168,
                        borderRadius: 15,
                        marginRight: 20,
                        overflow: 'hidden',
                      }}
                      key={idx}
                      onTouchEnd={() => {
                        navigation.navigate('DetailVehicleScreen', {
                          id: item.id,
                        });
                      }}
                    >
                      <Image
                        source={{ uri: API_URL + photo[0] }}
                        style={{
                          width: undefined,
                          height: undefined,
                          resizeMode: 'cover',
                          flex: 1,
                        }}
                      />
                    </View>
                  );
                })}
            </ScrollView>
          </View>

          {/* BIKE */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',

                marginTop: 20,
                width: '90%',
              }}
            >
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Nunito-Regular',
                  fontWeight: 'bold',
                  fontSize: 22,
                }}
              >
                Bike
              </Text>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: 80,
                  flexDirection: 'row',
                }}
                onStartShouldSetResponder={() =>
                  navigation.navigate('CategoryVehicle', {
                    bike: bike,
                    category: 'bike',
                  })
                }
              >
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Nunito-Regular',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}
                >
                  View More
                </Text>
                <Icon
                  name="chevron-right"
                  style={{ color: 'black', fontSize: 15 }}
                />
              </View>
            </View>

            <ScrollView horizontal style={{ padding: 20 }}>
              {bike.length > 0 &&
                bike.map((item, idx) => {
                  // console.log('ITEM-BIKE >>>>', item);
                  const photo = JSON.parse(item.photo);

                  return (
                    <View
                      style={{
                        width: 265,
                        height: 168,
                        borderRadius: 15,
                        marginRight: 20,
                        overflow: 'hidden',
                      }}
                      key={idx}
                      onTouchEnd={() => {
                        navigation.navigate('DetailVehicleScreen', {
                          id: item.id,
                        });
                      }}
                    >
                      <Image
                        source={{ uri: API_URL + photo[0] }}
                        style={{
                          width: undefined,
                          height: undefined,
                          resizeMode: 'cover',
                          flex: 1,
                        }}
                      />
                    </View>
                  );
                })}
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default Home;
