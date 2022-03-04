/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Text, ScrollView, Image } from 'react-native';
// import defaultPhoto from '../assets/Images/popular-default.jpg';
import { API_URL } from '@env';

const VehiclesCars = ({ navigation, cars }) => {
  console.log('CARS', cars);
  return (
    <ScrollView>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          // borderWidth: 1,
          width: '30%',
          padding: 20,
          marginTop: 20,
        }}
        onStartShouldSetResponder={() => {
          navigation.goBack();
        }}
      >
        <Icon
          name="chevron-left"
          size={22}
          style={{ paddingEnd: 30, color: '#393939' }}
        />
        <Text
          style={{
            color: '#393939',
            fontSize: 18,
            fontFamily: 'Nunito-Regular',
            fontWeight: 'bold',
          }}
        >
          Cars
        </Text>
      </View>

      {cars.length > 0 &&
        cars.map((item, idx) => {
          // console.log('ITEM-BIKE >>> ', item);
          const photo = JSON.parse(item.photo);
          // console.log('PHOTO', API_URL + photo[0]);
          return (
            <View
              style={{
                // borderWidth: 1,
                flexDirection: 'row',
                marginTop: 30,
                padding: 20,
                alignItems: 'center',
              }}
              key={idx}
              onStartShouldSetResponder={() => {
                navigation.navigate('DetailVehicleScreen', { id: item.id });
              }}
            >
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 20,
                  // borderWidth: 1,
                  marginEnd: 30,
                  overflow: 'hidden',
                }}
              >
                <Image
                  source={{ uri: API_URL + photo[0] }}
                  style={{
                    width: undefined,
                    height: undefined,
                    flex: 1,
                    resizeMode: 'cover',
                  }}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: 'Nunito-Regular',
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: 'black',
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Nunito-Regular',
                    fontSize: 12,
                    fontWeight: 'normal',
                    color: 'black',
                  }}
                >
                  {`Max for ${item.capacity} person`}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Nunito-Regular',
                    fontSize: 12,
                    fontWeight: 'normal',
                    color: 'black',
                  }}
                >
                  {item.location}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Nunito-Regular',
                    fontSize: 13,
                    fontWeight: 'bold',
                    color: 'green',
                    marginBottom: 5,
                  }}
                >
                  {item.status}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Nunito-Regular',
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: 'black',
                  }}
                >
                  {`Rp. ${item.price} /day`}
                </Text>
              </View>
            </View>
          );
        })}
    </ScrollView>
  );
};

export default VehiclesCars;
