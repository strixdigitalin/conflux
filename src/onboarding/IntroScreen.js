import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {TouchableHighlight} from 'react-native';
import {
  Animated,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/reducer/user';
import Auth from '../services/Auth';

import {commonStyles} from '../utils/styles';
import {COLORS, SIZES} from '../utils/theme';

export default function IntroScreen({navigation}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slider = React.useRef(null);
  const dispatch = useDispatch();
  const onFocus = useIsFocused();
  const [sliders, ,] = useState([
    {
      image: require('../assets/img/slider-1.png'),
    },
    {
      image: require('../assets/img/slider-2.png'),
    },
    {
      image: require('../assets/img/slider-3.png'),
    },
    {
      image: require('../assets/img/slider-4.png'),
    },
  ]);

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('USER_DETAIL');
      console.log(data, '<<<<\n\n\n user data in login screen ');
      if (data != null) {
        dispatch(setUser(JSON.parse(data)));
        // setUser(data);
        navigation.navigate('HomeScreen');
      }
    })();
  }, [onFocus]);
  const SliderItem = ({item}) => {
    return (
      <View style={styles.card}>
        <Image resizeMode="stretch" style={styles.image} source={item.image} />
      </View>
    );
  };

  const completeAppIntro = async () => {
    Auth.setIntro('true')
      .then(() => {
        navigation.navigate('GoToLoginPageScreen');
      })
      .catch(error => {
        console.log('Error in saving intro screen data: ', error);
      });
  };

  const changeSliderIndex = index => {
    const sliderLength = sliders?.length - 1;
    if (sliderLength >= index) {
      setCurrentIndex(index);
      slider.current.scrollToIndex({
        index: index,
        animated: true,
      });
    }
    if (index > 3) {
      completeAppIntro();
    }
  };

  const itemWidth = SIZES.width;

  const renderSkipAndNextBtn = () => {
    if (currentIndex === 3) {
      return <></>;
    } else {
      return (
        <View style={{position: 'absolute', bottom: 34, right: 22}}>
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => {
              const actualIndex = currentIndex + 1;
              changeSliderIndex(actualIndex);
            }}>
            <Image
              source={require('../assets/img/c-next.png')}
              style={{width: 22, height: 22, tintColor: '#256EFA'}}
            />
          </TouchableOpacity>
        </View>
      );
    }
  };

  const renderSkipAndPrevBtn = () => {
    if (currentIndex === 0 || currentIndex === 3) {
      return <></>;
    } else {
      return (
        <View style={{position: 'absolute', bottom: 34, left: 22}}>
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => {
              const actualIndex = currentIndex - 1;
              changeSliderIndex(actualIndex);
            }}>
            <Image
              source={require('../assets/img/c-back.png')}
              style={{width: 22, height: 22, tintColor: '#256EFA'}}
            />
          </TouchableOpacity>
        </View>
      );
    }
  };

  const renderGetStartedBtn = () => {
    if (currentIndex === 3) {
      return (
        <View style={{position: 'absolute', bottom: 34, alignSelf: 'center'}}>
          <TouchableHighlight
            style={{
              width: SIZES.width / 1.3,
              height: 48,
              backgroundColor: '#256EFA',
              borderRadius: 50,
              ...commonStyles.centerStyles,
            }}
            onPress={() => {
              completeAppIntro();
            }}>
            <Text style={{...commonStyles.fs18_500, color: '#fff'}}>
              Get Started
            </Text>
          </TouchableHighlight>
        </View>
      );
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={{height: SIZES.height}}>
        <FlatList
          ref={slider}
          getItemLayout={(data, index) => ({
            length: itemWidth,
            offset: itemWidth * index,
            index,
          })}
          snapToInterval={itemWidth}
          horizontal={true}
          data={sliders}
          renderItem={SliderItem}
          scrollEnabled={true}
          decelerationRate="fast"
          bounces={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          disableIntervalMomentum
        />
        {renderSkipAndNextBtn()}
        {renderSkipAndPrevBtn()}
        {renderGetStartedBtn()}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: SIZES.width,
    height: SIZES.height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: SIZES.width,
    height: SIZES.height,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    color: '#202020',
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: '#333333',
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: 'blue',
    marginHorizontal: SIZES.radius / 2,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZES.padding,
    position: 'absolute',
    bottom: 20,
  },
  introDetailStyle: {
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 15,
    height: 220,
    width: SIZES.width - 20,
    justifyContent: 'space-between',
  },
  skipBtnText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#700CB3',
  },
  nextBtn: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
});
