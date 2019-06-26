import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import { IconButton, Colors } from 'react-native-paper';
import Styles, { COLOR } from "../../config/styles";

const Controls = ({
  paused,
  shuffleOn,
  repeatOn,
  onPressPlay,
  onPressPause,
  onBack,
  onForward,
  onPressShuffle,
  onPressRepeat,
  forwardDisabled,
}) => (
  <View style={styles.container}>
    <TouchableOpacity activeOpacity={0.0} onPress={onPressShuffle}>
      <Image style={[styles.secondaryControl, shuffleOn ? [] : styles.off]}
        source={require('../../images/player/ic_shuffle_white.png')}/>
    </TouchableOpacity>
    <View style={{width: 40}} />
    <TouchableOpacity onPress={onBack}>
      <Image source={require('../../images/player/ic_skip_previous_white_36pt.png')}/>
    </TouchableOpacity>
    <View style={{width: 20}} />
    {!paused ?
      
      <IconButton
            icon="play-circle-outline"
            color={COLOR.POST}
            size={75}
            onPress={onPressPause}
          />
       :
       <IconButton
            icon="pause-circle-outline"
            color={Colors.yellow800}
            size={75}
            onPress={onPressPause}
          />
    }
    <View style={{width: 20}} />
    <TouchableOpacity onPress={onForward}
      disabled={forwardDisabled}>
      <Image style={[forwardDisabled && {opacity: 0.3}]}
        source={require('../../images/player/ic_skip_next_white_36pt.png')}/>
    </TouchableOpacity>
    <View style={{width: 40}} />
    <TouchableOpacity activeOpacity={0.0} onPress={onPressRepeat}>
      <Image style={[styles.secondaryControl, repeatOn ? [] : styles.off]}
        source={require('../../images/player/ic_repeat_white.png')}/>
    </TouchableOpacity>
  </View>
);

export default Controls;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  playButton: {
    height: 72,
    width: 72,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 72 / 2,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    opacity: 0.50,
    
  },
  secondaryControl: {
    height: 18,
    width: 18,
  },
  off: {
    opacity: 0.30,
  }
})