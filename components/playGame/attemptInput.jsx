import * as React from 'react';
import {
    View, TouchableOpacity, StyleSheet, Text, ScrollView, Animated, Dimensions
} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import * as Anvaad from 'anvaad-js';
import dimensions from '../../util/dimensions';
import { setAttempt, setVisited } from '../../redux/actions';

export const AttemptInput = ({setWord}) => {
    const state = useSelector((theState) => theState.theGameReducer);
    const dispatch = useDispatch();
    // Animated gradient
    const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
    
    const styles = StyleSheet.create({
        wordAttemptView: {
          width: '80%',
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 5,
          paddingVertical: 5,
          backgroundColor: "#f8f",
          borderRadius: 20,
          elevation: 5,
        },
        wordAttempt: {
          width: '80%',
          height: "100%",
          opacity: 0.8,
          color: state.darkMode ? 'darkblue' : 'white',
          borderRadius: 100,
          justifyContent: 'center',
          textAlign: 'center',
          fontSize:  dimensions.size['12'],
        },
    });

    return (
        <AnimatedLinearGradient
        colors={state.darkMode ? ['#dca104', '#ff8a00'] : ['#274C7C', '#274C7C']}
        style={styles.wordAttemptView}
      >
        <Text style={styles.wordAttempt} placeHolder="Word">
          {Anvaad.unicode(state.attempt)}
        </Text>
        
      {(state.attempt == "") ? 
        null : 
      <TouchableOpacity
      style={{
        backgroundColor: state.darkMode ? 'black' : 'white',
        borderRadius: 25, 
        height: dimensions.size['15'], 
        width:  dimensions.size['15'], 
        }}
        onPress={() => {
          dispatch(setVisited([]));
          dispatch(setAttempt(''));
          setWord('');
        }}
      >
        <MaskedView
          style={{
            height: dimensions.size['15'],
            width: dimensions.size['15'],
          }}
          maskElement={(<IconM name="reload" style={{alignSelf: 'center', marginVertical: 5}} size={dimensions.size['10']} />
        )}
        >
          <LinearGradient
              colors={state.darkMode ? ['#ff8008', '#ffc837'] : ['#FF0076', '#590FB7']}
              style={{ flex: 1 }}
          />
        </MaskedView>
      </TouchableOpacity>}
      </AnimatedLinearGradient>
    )
};