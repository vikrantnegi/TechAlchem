import React from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import {colorCode} from '../designs/colors';
import {styles} from '../designs/styles';

export default function HeaderBox({title, value, onChangeText}) {
  return (
    <View style={inlineStyles.headerBox}>
      <View style={[styles.row, styles.btw]}>
        <Text style={inlineStyles.title}>{title}</Text>
        <View>
          <Image source={require('../assets/images/icon.png')} />
          <View style={[inlineStyles.count, styles.ctr]}>
            <Text style={inlineStyles.countText}>3</Text>
          </View>
        </View>
      </View>
      <View style={inlineStyles.searchBox}>
        <Image
          source={require('../assets/images/search.png')}
          style={inlineStyles.searchIcon}
        />
        <TextInput
          style={inlineStyles.searchText}
          value={value}
          onChangeText={onChangeText}
          placeholder="Search by Event,code, location"
          placeholderTextColor={colorCode.white}
        />
        <Image
          source={require('../assets/images/filter.png')}
          style={inlineStyles.searchIcon}
        />
      </View>
    </View>
  );
}

const inlineStyles = StyleSheet.create({
  headerBox: {
    backgroundColor: colorCode.brand,
    paddingVertical: 25,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: '#F9F6F6',
    shadowOffset: {width: 0, height: 20},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    color: colorCode.white,
    fontFamily: 'Montserrat-Bold',
  },
  count: {
    position: 'absolute',
    backgroundColor: '#F15555',
    width: 25,
    height: 25,
    padding: 5,
    borderRadius: 15,
    top: -15,
    right: -15,
  },
  countText: {
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },
  searchBox: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 50,
    marginTop: 30,
    alignSelf: 'center',
    position: 'relative',
    flexDirection: 'row',
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  searchText: {
    marginLeft: 30,
    color: colorCode.white,
    width: '80%',
    fontFamily: 'Montserrat-Light',
  },
});
