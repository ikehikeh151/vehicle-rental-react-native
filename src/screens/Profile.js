/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NotLogin from './NotLogin';
import { logoutAction } from '../redux/actions/auth';

const Profile = ({ navigation }) => {
  const auth = useSelector(state => state.auth);
  const token = auth.authUser.token;
  const [isLogin, setIsLogin] = useState(false);

  console.log('TOKEN', token);

  useEffect(() => {
    if (token) {
      return setIsLogin(true);
    }
    if (!token) {
      return setIsLogin(false);
    }
  }, [auth, navigation, token]);

  const ProfileLogin = () => {
    const config = {
      headers: {
        'x-access-token': token,
      },
    };
    const dispatch = useDispatch();

    const handlerLogout = () => {
      dispatch(logoutAction(config)).then(res => {
        if (res.action.payload.status === 200) {
          navigation.navigate('TabStack');
        }
      });
      alert('LOGOUT');
    };
    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          onPress={handlerLogout}
          style={{
            width: '90%',
            backgroundColor: 'red',
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'black', fontSize: 50, fontWeight: '700' }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      {!isLogin ? <NotLogin navigation={navigation} /> : <ProfileLogin />}
    </View>
  );
};

export default Profile;
