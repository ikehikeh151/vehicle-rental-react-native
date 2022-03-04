import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import bgLogin from '../assets/Images/bg-login.png';
import Button from '../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from '../redux/actions/auth';
// import ModalComponent from '../components/Modal';

const { height } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [body, setBody] = useState({
    email: '',
    password: '',
  });

  const goRegister = () => {
    dispatch(loginAction(body)).catch(err => {
      console.log(err.message);
    });
  };

  const getUsername = text => {
    setBody({
      ...body,
      email: text,
    });
  };

  const getPassword = text => {
    setBody({
      ...body,
      password: text,
    });
  };

  console.log(auth);

  useEffect(() => {
    if (auth.isFulfilled) {
      return navigation.replace('TabStack');
    }
  }, [auth, navigation]);

  return (
    <ScrollView>
      <ImageBackground
        source={bgLogin}
        resizeMode="cover"
        style={styles.container}
      >
        <View style={styles.wrapperTitle}>
          <Text style={styles.text}>LET’S EXPLORE THE WORLD</Text>
        </View>

        <View style={styles.wrapperInput}>
          <TextInput
            placeholder="Username"
            placeholderTextColor="#393939"
            style={styles.input}
            onChangeText={getUsername}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#393939"
            style={styles.input}
            onChangeText={getPassword}
          />
        </View>
        <Text
          style={styles.forgot}
          onPress={() => {
            navigation.navigate('Forgot');
          }}
        >
          Forgot Password ?
        </Text>
        <View style={styles.wrapperBtn}>
          <Button title="Login" link={goRegister} />
        </View>

        <View style={styles.wrapperTextSignUp}>
          <Text style={styles.noAccount}>Don’t have account? </Text>
          <Text
            style={styles.signUp}
            onPress={() => {
              navigation.navigate('Register');
            }}
          >
            Sign up now
          </Text>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: null,
    resizeMode: 'cover',
    // borderWidth: 1,
    // marginBottom: 40,
  },
  wrapperTitle: {
    width: 300,
    marginTop: 120,
    marginStart: 20,
  },
  text: {
    fontSize: 36,
    fontFamily: 'Roboto-Regular',
    fontWeight: '900',
    lineHeight: 42,
    letterSpacing: -0.2,
  },
  wrapperInput: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 240,
    marginBottom: 15,
  },
  input: {
    width: '90%',
    borderRadius: 10,
    marginTop: 25,
    padding: 14,
    opacity: 0.8,
    backgroundColor: '#DFDEDE',
    color: '#393939',
    fontFamily: 'Nunito-Regular',
    fontWeight: 'bold',
  },
  forgot: {
    paddingStart: 22,
    fontFamily: 'Nunito-Regular',
    textDecorationLine: 'underline',
    color: '#fff',
    fontWeight: 'bold',
  },
  wrapperBtn: {
    marginTop: 40,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  wrapperTextSignUp: {
    flexDirection: 'row',
    // paddingStart: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccount: { fontFamily: 'Nunito-Reglar', fontSize: 14, color: '#fff' },
  signUp: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: '#fff',
  },
});