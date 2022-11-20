import React, { useState } from 'react';
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
import Auth from '../services/Auth';

import { commonStyles } from '../utils/styles';
import { COLORS, SIZES } from '../utils/theme';

export default function IntroScreen({ navigation }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slider = React.useRef(null);

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

    const SliderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <Image
                    resizeMode={'contain'}
                    style={styles.image}
                    source={item.image}
                />
            </View>
        );
    };

    const completeAppIntro = async () => {
        console.log("Entering the completeAppIntro: ")
        Auth.setIntro('true')
            .then(() => {
                console.log("Successfully saved data of intro screen: ")
                navigation.navigate('RegisterLoginScreen');
                // navigation.navigate('RazorpayCheckout');
            })
            .catch((error) => {
                console.log("Error in saving intro screen data: ", error);
            })
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
        if (index > 2) {
            completeAppIntro();
        }
    };

    const itemWidth = SIZES.width;

    function renderDots() {
        return (
            <View style={{ alignItems: 'center' }}>
                <View style={styles.dotsContainer}>
                    {sliders.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    const actualIndex =
                                        currentIndex > 0 ? currentIndex - 1 : currentIndex;
                                    changeSliderIndex(actualIndex);
                                }}
                                key={`dot-${index}`}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 16,
                                    height: 16,
                                    marginHorizontal: 5,
                                    borderWidth: currentIndex === index ? 1 : 0,
                                    borderColor: COLORS.pink,
                                    borderRadius: 100,
                                }}>
                                <Animated.View
                                    style={[
                                        styles.dot,
                                        { width: 9, height: 9, backgroundColor: COLORS.pink },
                                    ]}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        );
    }

    const renderSkipAndNextBtn = () => {
        return (
            <View style={{ ...commonStyles.centerStyles, width: '100%' }}>
                <TouchableOpacity onPress={completeAppIntro}>
                    <Text style={styles.skipBtnText}>{'Skip'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.nextBtn}
                    onPress={() => {
                        const actualIndex = currentIndex + 1;
                        changeSliderIndex(actualIndex);
                    }}>
                    <Image
                        source={require("../assets/img/c-next.png")}
                        style={{ width: 25, height: 25 }}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View
                style={{
                    paddingTop: '18%',
                    justifyContent: 'space-between',
                    height: '100%',
                    alignItems: 'center',
                    backgroundColor: "#fff"
                }}>
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
                    scrollEnabled={false}
                    decelerationRate="fast"
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        left: 10,
                        right: 10,
                        bottom: "4%",
                        ...commonStyles.centerStyles,
                        backgroundColor: "#fff"
                    }}>
                    <View style={{ ...styles.introDetailStyle }}>
                        {renderDots()}
                        {renderTextAndInfo(currentIndex)}
                        {renderSkipAndNextBtn()}
                    </View>
                </View>
            </View>
        </>
    );
}

const renderTextAndInfo = currentIndex => {
    if (currentIndex === 0) {
        return (
            <View style={{}}>
                <Text style={styles.title}>Lorem Ipsum 1</Text>
                <View style={{ marginVertical: 8 }}>
                    <Text style={styles.description}>
                        Thousand of people are using vacyss \n' + 'for great look
                    </Text>
                </View>
            </View>
        );
    } else if (currentIndex === 1) {
        return (
            <View style={{}}>
                <Text style={styles.title}>Lorem Ipsum 2</Text>
                <View style={{ marginVertical: 8 }}>
                    <Text style={styles.description}>
                        Thousand of people are using vacyss for creating bodyShape
                    </Text>
                </View>
            </View>
        );
    } else if (currentIndex === 2) {
        return (
            <View style={{}}>
                <Text style={styles.title}>Lorem Ipsum 3</Text>
                <View style={{ marginVertical: 8 }}>
                    <Text style={styles.description}>
                        Thousand of people are using vacyss for share looks
                    </Text>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    card: {
        width: SIZES.width,
        height: '65%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 250,
        height: 350,
        alignSelf: "center",
        tintColor: COLORS.pink
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
        width: 40,
        height: 40,
        backgroundColor: COLORS.pink,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
});
