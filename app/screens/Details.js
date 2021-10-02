/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Linking,
  Dimensions,
  Platform,
  Button,
  StyleSheet,
} from 'react-native';
import Animated from 'react-native-reanimated';
import LaunchNavigator from 'react-native-launch-navigator';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {ScrollView} from 'react-native-gesture-handler';
import {colorCode} from '../designs/colors';
import {styles} from '../designs/styles';
import {apiConfig} from '../utils/constants';
import BottomSheet from '@gorhom/bottom-sheet';

const slideWidth = 340;
const BANNER_H = 400;
const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth;

export default function Details({route, navigation}) {
  const CarouselRef = useRef(null);
  const sheetRef = useRef(null);
  const {itemId, sport} = route.params;
  const [eventDetails, setEventDetails] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const scrollA = useRef(new Animated.Value(0)).current;
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 15,
        height: 500,
      }}>
      <View style={[styles.row, styles.btw, styles.ph]}>
        <Text style={[styles.paraText, {color: '#120936'}]}>Purchased </Text>
        <Image source={require('../assets/images/cancel.png')} />
      </View>
      <View style={styles.ctr}>
        <Image source={require('../assets/images/thanks.png')} />
        <Text style={[styles.bigTitle, {fontSize: 40}]}>Thank you!</Text>
        <Text style={styles.paraText}>
          Your your payment was made successfully!
        </Text>
        <View style={styles.borderBottom} />
        <Text style={styles.paraText}>Your booking ID</Text>
        <Text style={[styles.bigTitle, {fontSize: 30, color: '#02D9E7'}]}>
          #33475490
        </Text>
        <View style={styles.borderBottom} />
        <Text style={[styles.paraText, {textAlign: 'center', width: 300}]}>
          You will need this booking ID to enter inside the event. You can view
          this code inside your profile / booked events
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={[styles.btnRound, {backgroundColor: '#936EFE'}]}>
          <Text style={styles.btnText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  useEffect(() => {
    fetchEventDetails();
  }, []);

  const fetchEventDetails = () => {
    setLoading(true);
    fetch(`${apiConfig.appURL}/eventDetails`, {
      headers: {
        Authorization: `Bearer ${apiConfig.token}`,
      },
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setEventDetails(json.eventDetails);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  const renderItem = ({item}) => (
    <View style={styles.verticalCard} key={item.id}>
      <View style={styles.horizontalCard}>
        <ImageBackground
          source={{uri: item.mainImage}}
          style={[styles.bg, {height: 175}]}>
          <View style={styles.abs}>
            <View style={styles.row}>
              {item.isPartnered && (
                <View
                  style={[
                    styles.tag,
                    {backgroundColor: '#02D9E7', borderWidth: 0},
                  ]}>
                  <Text style={styles.tagText}>Partnered</Text>
                </View>
              )}
              {item.sport && (
                <View
                  style={[
                    styles.tag,
                    {
                      backgroundColor: colorCode.white,
                      borderWidth: 0,
                    },
                  ]}>
                  <Text
                    style={{
                      color: colorCode.black,
                      fontFamily: 'Montserrat-Bold',
                      paddingHorizontal: 5,
                    }}>
                    {item.sport}
                  </Text>
                </View>
              )}
            </View>
            <Text style={[styles.bigTitle, styles.white]}>{item.name}</Text>
            <View style={styles.row}>
              <Image source={require('../assets/images/time.png')} />
              <Text style={[styles.bold, styles.white, styles.ph]}>
                {moment(item.dateTime).format('ddd, DD MMM YYYY, HH:mm')}
              </Text>
            </View>
            <View
              style={[
                styles.tag,
                {
                  backgroundColor: '#02D9E7',
                  position: 'absolute',
                  borderWidth: 0,
                  bottom: 30,
                  right: -30,
                  paddingRight: 50,
                },
              ]}>
              <Text style={styles.tagText}> £11.98</Text>
            </View>
          </View>
        </ImageBackground>
        <View
          style={{
            backgroundColor: '#fff',
            padding: 20,
            height: 180,
          }}>
          <View style={[styles.row, styles.btw]}>
            <Text style={[styles.subTitle, styles.grey, {paddingVertical: 5}]}>
              Total Prize: £ {item.price}
            </Text>
            <View style={[styles.row, styles.btw]}>
              <TouchableOpacity>
                <Image
                  style={{marginRight: 30}}
                  source={require('../assets/images/upload.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../assets/images/heart.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.row}>
            <Image source={require('../assets/images/clock.png')} />
            <Text
              style={[
                styles.subTitle,
                styles.ph,
                {paddingVertical: 10, color: '#0FC6C0'},
              ]}>
              Time left to book: 3 Hours
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Image source={require('../assets/images/ticket_pan.png')} />
            <Text
              style={[
                styles.subTitle,
                styles.ph,
                {
                  paddingVertical: 10,
                  color: colorCode.accent,
                  textDecorationLine: 'underline',
                },
              ]}>
              {item.ticketsSold}/{item.maxTickets} attending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Image source={require('../assets/images/location.png')} />
            <Text
              style={[
                styles.subTitle,
                styles.grey,
                styles.ph,
                {paddingVertical: 10},
              ]}>
              {item.location}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const pagination = () => {
    return (
      <Pagination
        dotsLength={sameSportData.length}
        activeDotIndex={index}
        containerStyle={{height: 70}}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 5,
          marginHorizontal: -15,
          backgroundColor: '#000',
        }}
        inactiveDotOpacity={0.1}
        inactiveDotScale={0.8}
      />
    );
  };

  const detailsData = eventDetails.filter(item => item.id === itemId);
  const callUsNow = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = 'telprompt:' + '+1 991-681-0200';
    } else {
      number = 'tel:' + '+1 991-681-0200';
    }
    Linking.openURL(number);
  };

  const navigateToAddress = it =>
    LaunchNavigator.navigate(it)
      .then(() => console.log('Launched navigator'))
      .catch(err => console.error('Error launching navigator: ' + err));

  const filterSameSport = eventDetails
    .filter(it => it.sport === sport)
    .sort((a, b) => (a.dateTime > b.dateTime ? 1 : -1));

  const sameSportData = filterSameSport.slice(0, 5);

  return (
    <View style={[styles.container, {backgroundColor: colorCode.white}]}>
      <StatusBar hidden />
      <Animated.ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollA}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingBottom: 200,
        }}>
        {detailsData &&
          detailsData.map(item => (
            <View key={item.id}>
              <Animated.View style={inlineStyles.imageCard(scrollA)}>
                <ImageBackground
                  source={{uri: item.mainImage}}
                  style={styles.bg}>
                  <View
                    style={[
                      styles.abs,
                      {bottom: 0, justifyContent: 'flex-end'},
                    ]}>
                    <View style={styles.row}>
                      {item.isPartnered && (
                        <View
                          style={[
                            styles.tag,
                            {backgroundColor: '#02D9E7', borderWidth: 0},
                          ]}>
                          <Text style={styles.tagText}>Partnered</Text>
                        </View>
                      )}
                      {item.sport && (
                        <View
                          style={[
                            styles.tag,
                            {
                              backgroundColor: colorCode.white,
                              borderWidth: 0,
                            },
                          ]}>
                          <Text
                            style={{
                              color: colorCode.black,
                              fontFamily: 'Montserrat-Bold',
                              paddingHorizontal: 5,
                            }}>
                            {item.sport}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.bigTitle,
                        styles.white,
                        styles.pv,
                        {fontSize: 24, width: 350},
                      ]}>
                      {item.name}
                    </Text>
                    <View style={[styles.row, styles.pv]}>
                      <Image source={require('../assets/images/time.png')} />
                      <Text style={[styles.bold, styles.white, styles.ph]}>
                        {moment(item.dateTime).format(
                          'ddd, DD MMM YYYY, HH:mm',
                        )}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.tag,
                        styles.ctr,
                        {
                          backgroundColor: '#02D9E7',
                          position: 'absolute',
                          borderWidth: 0,
                          bottom: 30,
                          right: -30,
                          height: 35,
                          paddingRight: 50,
                        },
                      ]}>
                      <Text style={styles.tagText}> £ {item.price}</Text>
                    </View>
                  </View>
                </ImageBackground>
              </Animated.View>
              <View style={[styles.ph, styles.pv]}>
                <View style={styles.ph}>
                  <View style={[styles.row, styles.btw]}>
                    <Text
                      style={[
                        styles.subTitle,
                        styles.grey,
                        {paddingVertical: 5},
                      ]}>
                      Total prize:
                      <Text style={{fontWeight: 'bold'}}>
                        {' '}
                        £ {item.totalPrize}
                      </Text>
                    </Text>
                    <View style={styles.row}>
                      <Image
                        style={{marginRight: 20}}
                        source={require('../assets/images/share.png')}
                      />
                      <TouchableOpacity onPress={() => setToggle(!toggle)}>
                        {toggle ? (
                          <Image
                            source={require('../assets/images/heart-red.png')}
                            style={{
                              width: 20,
                              height: 20,
                              resizeMode: 'contain',
                            }}
                          />
                        ) : (
                          <Image
                            source={require('../assets/images/heart.png')}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity style={[styles.row, styles.pv]}>
                    <Image
                      source={require('../assets/images/ticket_pan.png')}
                    />
                    <Text
                      style={[
                        styles.subTitle,
                        styles.ph,
                        {
                          color: colorCode.accent,
                          textDecorationLine: 'underline',
                        },
                      ]}>
                      {item.ticketsSold}/{item.maxTickets} attending
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.row, styles.pv]}>
                  {JSON.parse(item.tags).map(it => {
                    return (
                      <View
                        key={it}
                        style={[styles.tag, {backgroundColor: '#FDF7F8'}]}>
                        <Text style={[styles.paraText, {color: '#D29489'}]}>
                          #{it}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                <Text style={styles.sectionTitle}>ABOUT :</Text>
                <Text style={styles.paraText}>{item.description}</Text>
                <View style={styles.borderBottom} />
                <Text style={styles.sectionTitle}>VENUE INFORMATION :</Text>
                <Text style={styles.paraText}>{item.venueInformation}</Text>
                <View style={styles.borderBottom} />
                <Text style={styles.sectionTitle}>EVENT CREATED BY :</Text>
                <View style={[styles.row, styles.ph]}>
                  <Image source={require('../assets/images/createdBy.png')} />
                  <Text style={styles.paraText}>John Smith</Text>
                </View>
                <View style={styles.borderBottom} />
                <Text style={styles.sectionTitle}>LOCATION :</Text>
                <View style={[styles.row, styles.btw]}>
                  <View
                    style={[
                      styles.row,
                      styles.ph,
                      {alignItems: 'flex-start', width: '50%'},
                    ]}>
                    <Image source={require('../assets/images/location.png')} />
                    <Text style={[styles.paraText, {lineHeight: 16}]}>
                      {item.location}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigateToAddress(item.location)}
                    style={{
                      borderWidth: 1,
                      borderColor: '#6658D3',
                      width: '35%',
                      borderRadius: 30,
                      padding: 5,
                    }}>
                    <Text
                      style={[
                        styles.paraText,
                        {color: '#6658D3', textAlign: 'center'},
                      ]}>
                      Take me there
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.borderBottom} />
                <Text style={styles.sectionTitle}>CONTACT :</Text>
                <Text style={styles.paraText}>
                  Send us an email at
                  <TouchableOpacity
                    style={{paddingHorizontal: 5, lineHeight: 20}}
                    onPress={() => callUsNow()}>
                    <Text style={[styles.paraText, {color: '#6658D3'}]}>
                      contact@techalchemy.co
                    </Text>
                  </TouchableOpacity>
                  or call us at
                  <TouchableOpacity>
                    <Text style={styles.paraText}>+1 991-681-0200</Text>
                  </TouchableOpacity>
                </Text>
                <View style={styles.borderBottom} />
                <Text style={styles.sectionTitle}>TEAM INFORMATION:</Text>
                <Text style={styles.paraText}>{item.teamInformation}</Text>
                <View style={styles.borderBottom} />
                <Text style={styles.sectionTitle}>SIMILAR EVENTS:</Text>
                <View>
                  <Carousel
                    ref={CarouselRef}
                    data={sameSportData}
                    renderItem={it => renderItem(it)}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    onSnapToItem={id => setIndex(id)}
                    activeSlideAlignment="start"
                  />
                  {pagination()}
                </View>
              </View>
            </View>
          ))}
        <View style={[styles.row, styles.btw, styles.ph, styles.pv]}>
          <View style={[styles.row, styles.ph]}>
            <Image source={require('../assets/images/left.png')} />
            <Text style={[styles.paraText, {color: '#120936'}]}>Purchase </Text>
          </View>
          <Image source={require('../assets/images/cancel.png')} />
        </View>
        <Button
          title="Open Bottom Sheet"
          onPress={() => bottomSheetRef.current.snapToPosition('75%')}
        />
        <View style={styles.purchaseCard}>
          <View style={[styles.row, styles.btw]}>
            <Text
              style={[
                styles.bigTitle,
                styles.pv,
                styles.white,
                {fontSize: 18, width: '75%'},
              ]}>
              Clubbing football event
            </Text>
            <View
              style={{
                borderRadius: 4,
                backgroundColor: '#FF3FD5',
                width: 75,
                padding: 4,
              }}>
              <Text
                style={[
                  styles.bold,
                  styles.white,
                  {
                    fontSize: 12,
                    textAlign: 'center',
                  },
                ]}>
                Private
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <Image source={require('../assets/images/clock-white.png')} />
            <Text
              style={[
                styles.subTitle,
                styles.white,
                styles.ph,
                {paddingVertical: 10},
              ]}>
              location
            </Text>
          </View>
          <View style={styles.row}>
            <Image source={require('../assets/images/location-white.png')} />
            <Text
              style={[
                styles.subTitle,
                styles.white,
                styles.ph,
                {paddingVertical: 10},
              ]}>
              location
            </Text>
          </View>
          <View style={styles.leftCircle} />
          <View style={styles.absLine}>
            <Image source={require('../assets/images/line.png')} />
          </View>
          <View style={styles.rightCircle} />
          <View style={[styles.row, styles.btw, styles.pv, {marginTop: 30}]}>
            <Text style={[styles.paraText, styles.white, {fontSize: 20}]}>
              Total price
            </Text>
            <Text style={[styles.bigTitle, styles.white]}>£11.98</Text>
          </View>
          <Text style={[styles.paraText, styles.white, {textAlign: 'right'}]}>
            (including 10% booking fee)
          </Text>
        </View>
        <View style={styles.ph}>
          <Text style={[styles.paraText, styles.pv]}>
            Choose your payment method
          </Text>
          <View style={[styles.row, styles.ctr]}>
            <View style={[styles.pay, styles.ctr]}>
              <Image source={require('../assets/images/img_visa.png')} />
              <View style={{marginTop: 15}}>
                <Image source={require('../assets/images/tick.png')} />
              </View>
            </View>
            <View style={[styles.pay, styles.ctr, {opacity: 0.4}]}>
              <Image source={require('../assets/images/img_master.png')} />
              <View style={{marginTop: 15}}>
                <Image source={require('../assets/images/tick.png')} />
              </View>
            </View>
            <View style={[styles.pay, styles.ctr, {opacity: 0.4}]}>
              <Image source={require('../assets/images/paypal.png')} />
              <View style={{marginTop: 15}}>
                <Image source={require('../assets/images/tick.png')} />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            shadowColor: '#E5E5E5',
            shadowOffset: {width: 0, height: 10},
            shadowOpacity: 1,
            shadowRadius: 10,
            elevation: 10,
            backgroundColor: colorCode.white,
            marginVertical: 20,
          }}>
          <TouchableOpacity style={styles.btnRound}>
            <Text style={styles.btnText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
        {renderContent()}
      </Animated.ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enableContentPanningGesture
        enableOverDrag
        enablePanDownToClose
        enableHandlePanningGesture
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </View>
  );
}

const inlineStyles = StyleSheet.create({
  imageCard: scrollA => ({
    height: BANNER_H,
    width: '200%',
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.75, BANNER_H * 0.75],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [2, 1, 0.5, 0.5],
        }),
      },
    ],
  }),
});
