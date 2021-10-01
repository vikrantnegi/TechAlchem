import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import {colorCode} from './app/designs/colors';
import Routes from './app/navigation/Routes';

export default function App() {
  return (
    <Fragment>
      <StatusBar backgroundColor={colorCode.black} />
      <Routes />
    </Fragment>
  );
}
