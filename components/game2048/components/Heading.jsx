import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
}  from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react'
import { NumText } from './NumText'	
import Dimensions from '../utils/dimensions'
const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  headingTitle:{
    fontSize:Dimensions.size["12"],
    color: '#776E65',
  },
  back: {
    backgroundColor: '#035',
    padding: Dimensions.size["4"],
    borderRadius: 50,
    marginTop: 15,
  },
  help: {
    backgroundColor: '#035',
    padding: Dimensions.size["4"],
    borderRadius: 50,
    marginTop: 15,
  },
  upBox: {
    backgroundColor: '#035',
    padding: Dimensions.size["4"],
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  upText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Muli',
  }
})

const Heading = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((theState) => theState.theGameReducer);
  return (
      <View
        style={{justifyContent: 'space-between', flexDirection: 'row', width: width*.9}}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => props.nav.goBack()}
      >
      <MaskedView
          style={{ width: 35, height: 35 }}
          maskElement={(
            <View
              style={{
                backgroundColor: 'transparent',
                alignItems: 'center',
              }}
            >
              <IonIcons name="arrow-back" size={35} color={'#464646'} style={styles.shadow} />
            </View>
        )}
        >
          <LinearGradient
            colors={['#ff8008', '#ffc837']}
            style={{ flex: 1 }}
          />
        </MaskedView>
      </TouchableOpacity>
      <View
          style={styles.upBox}
        >
          <Text style={styles.upText}>
            Best
            {': '}
            {props.best}
          </Text>
      </View>
      <View
          style={styles.upBox}
        >
          <Text style={styles.upText}>
            Score
            {': '}
            {props.score}
          </Text>
      </View>
      <TouchableOpacity
        style={styles.help}
        onPress={() => props.nav.navigate('help')}
      >
      <MaskedView
          style={{ width: 35, height: 35 }}
          maskElement={(
            <View
              style={{
                backgroundColor: 'transparent',
                alignItems: 'center',
              }}
            >
              <IonIcons name="help" size={35} color={'#464646'} style={styles.shadow} />
            </View>
        )}
        >
          <LinearGradient
            colors={['#ff8008', '#ffc837']}
            style={{ flex: 1 }}
          />
        </MaskedView>
      </TouchableOpacity>
    </View>
  )
}

export default Heading