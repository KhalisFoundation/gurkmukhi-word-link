import * as React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Image,
    View,
    Text,
    Linking,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Modal,
    Platform
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useSelector, useDispatch } from 'react-redux';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import HelpImg from '../../../assets/helpPage1.svg';
import IonIcons from 'react-native-vector-icons/Ionicons';

import Dimensions from '../../../util/dimensions';
import { openHelpModal } from '../../../redux/actions';
const { height, width } = Dimensions.get('window');

function Help1() {
    const dispatch = useDispatch();
    const state = useSelector((theState) => theState.theGameReducer);

    const [fontLoaded] = useFonts({
        Muli: require('../../../assets/fonts/Muli.ttf'),
    });

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'space-evenly',
            alignSelf: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
        },
        page: {
            backgroundColor: '#274C7C',
            padding: 10,
            borderRadius: 25,
            justifyContent: 'space-evenly',
            alignSelf: 'center',
            alignItems: 'center',
            width: '98%',
            height: '90%',
        },
        header: {
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: 'Muli',
            fontSize: Dimensions.size['8'],
            color: '#fff',
        },
        continue:{
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: '#ff8c00',
            borderRadius: 10,
            height: 50,
            width: width*.45,
            elevation: 5,
        },
        continueTxt: {
            textAlign: 'center',
            fontFamily: 'Muli',
            fontSize: 20,
            color: '#FFFFFF',
        },
        scrollview: {
            flex: 1,
            flexDirection: 'column',
            padding: 8,
            height: '100%'
        },
        singleLine: {
            flexDirection: 'row',
            justifyContent: 'space-between'

        },
        title: {
            fontSize: 40,
        },
        small: {
            fontSize: 11
        }
    });

    if (!fontLoaded) {
      return <AppLoading />;
    }

    return (
    <Modal
        visible={state.helpPage[0] === 3}
        animationType="none"
        transparent
        onRequestClose={() => dispatch(openHelpModal())}
      >
        <View 
            style={styles.container}>
            <Animatable.View
                animation="slideInRight"
                iterationCount={1}
                iterationDelay={100}
                style={styles.page}>
                <View style={{justifyContent: 'space-between', flexDirection: 'row', width: width}}>
                    <IonIcons name="close" size={30} color="#fff" style={{marginLeft: 10}} onPress={() => {dispatch(openHelpModal())}} />
                </View>
                <Text style={styles.header}>
                    Welcome to Akhar Jor game.
                    {'\n\n'}
                    Swipe to join Gurmukhi letters to create words from meaning.
                </Text>
                <HelpImg height={Dimensions.size["14"]*10}/>
                <TouchableOpacity
                    style={styles.continue}
                    onPress={() => {dispatch(openHelpModal(4))}}>
                    <Text style={styles.continueTxt}>
                        CONTINUE
                    </Text>
                </TouchableOpacity>
                <View style={{justifyContent: 'flex-end', flexDirection: 'row', width: width*.9}}>
                    <Text style={{...styles.header, fontSize: 20 }}>1/3</Text>
                </View>
            </Animatable.View>
        </View>
        </Modal>
    );
}

export default Help1;