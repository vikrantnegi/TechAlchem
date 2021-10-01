/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import HeaderBox from '../components/HeaderBox';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {styles} from '../designs/styles';
import {apiConfig} from '../utils/constants';
import moment from 'moment';
import {colorCode} from '../designs/colors';
import {Fragment} from 'react/cjs/react.production.min';

const slideWidth = 340;
const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth;

const Home = ({navigation}) => {
  const [allEventsData, setAllEventsData] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const CarouselRef = useRef(null);

  useEffect(() => {
    fetchAllEventsData();
  }, []);

  const fetchAllEventsData = () => {
    setLoading(true);
    fetch(`${apiConfig.appURL}/allEvents`, {
      headers: {
        Authorization: `Bearer ${apiConfig.token}`,
      },
    })
      .then(res => res.json())
      .then(json => {
        setAllEventsData(json.allEvents);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  const renderItem = ({item}) => {
    return (
      <View style={{height: 200}}>
        <View style={styles.horizontalCard}>
          <ImageBackground source={{uri: item.mainImage}} style={styles.bg}>
            <View style={styles.abs}>
              <View style={styles.row}>
                <Image source={require('../assets/images/time.png')} />
                <Text style={[styles.bold, styles.white, styles.ph]}>
                  {moment(item.dateTime).format('ddd, DD MMM YYYY, HH:mm')}
                </Text>
              </View>
              <Text style={[styles.bigTitle, styles.white, styles.pv]}>
                {item.name}
              </Text>
              <View style={styles.row}>
                <View style={styles.tag}>
                  <Image source={require('../assets/images/ticket-1.png')} />
                  <Text style={styles.tagText}>
                    {item.ticketsSold}/{item.maxTickets}
                  </Text>
                </View>
                <View style={styles.tag}>
                  <Image source={require('../assets/images/img_avatar.png')} />
                  <Text style={styles.tagText}>
                    +{item.friendsAttending} Friends
                  </Text>
                </View>
                <View
                  style={[
                    styles.tag,
                    {backgroundColor: '#02D9E7', borderWidth: 0},
                  ]}>
                  <Text style={styles.tagText}>£ {item.price}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={recommendedEvents.length}
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

  const recommendedEvents = allEventsData.filter(item => item.isRecommended);

  return (
    <Fragment>
      <SafeAreaView style={{backgroundColor: colorCode.brand}} />
      <SafeAreaView style={styles.container}>
        <HeaderBox title="Welcome" />
        {loading ? (
          <View style={[styles.container, styles.ctr]}>
            <ActivityIndicator
              size={'small'}
              animation={loading}
              color={colorCode.brand}
            />
          </View>
        ) : (
          <ScrollView>
            <View style={styles.sectionPadding}>
              <View style={[styles.row, styles.btw, styles.pv]}>
                <Text style={styles.sectionTitle}>Recommended Events</Text>
                <TouchableOpacity>
                  <Text
                    style={[
                      styles.sectionTitle,
                      {color: '#E77460', textDecorationLine: 'underline'},
                    ]}>
                    View All
                  </Text>
                </TouchableOpacity>
              </View>
              <Carousel
                ref={CarouselRef}
                data={recommendedEvents}
                renderItem={item => renderItem(item)}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                onSnapToItem={id => setIndex(id)}
                activeSlideAlignment="start"
              />
              {pagination()}
            </View>

            <View style={[styles.ph]}>
              <Text style={styles.sectionTitle}>All events</Text>
              {allEventsData.map(item => {
                return (
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
                          <Text style={[styles.bigTitle, styles.white]}>
                            {item.name}
                          </Text>
                          <View style={styles.row}>
                            <Image
                              source={require('../assets/images/time.png')}
                            />
                            <Text
                              style={[styles.bold, styles.white, styles.ph]}>
                              {moment(item.dateTime).format(
                                'ddd, DD MMM YYYY, HH:mm',
                              )}
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
                          <Text
                            style={[
                              styles.subTitle,
                              styles.grey,
                              {paddingVertical: 5},
                            ]}>
                            Total Price: £ {item.price}
                          </Text>
                          <View style={[styles.row, styles.btw]}>
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate('Details', {
                                  itemId: item.id,
                                  sport: item.sport,
                                })
                              }>
                              <Image
                                style={{marginRight: 30}}
                                source={require('../assets/images/upload.png')}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity>
                              <Image
                                source={require('../assets/images/heart.png')}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                        <TouchableOpacity style={styles.row}>
                          <Image
                            source={require('../assets/images/clock.png')}
                          />
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
                          <Image
                            source={require('../assets/images/ticket_pan.png')}
                          />
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
                          <Image
                            source={require('../assets/images/location.png')}
                          />
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
              })}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </Fragment>
  );
};

export default Home;
