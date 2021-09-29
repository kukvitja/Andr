/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  Linking,
  SafeAreaView,
  StyleSheet,
  Button,
  ImageBackground,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  Image,
} from 'react-native';

import { PermissionsAndroid } from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Voice from '@react-native-community/voice';
import Tts from 'react-native-tts';
import Axios from "axios";

import {createOpenLink} from 'react-native-open-maps';
import RNCalendarEvents from "react-native-calendar-events";
import AlarmClock from "react-native-alarm-clock";




import call from 'react-native-phone-call';
import Contacts from 'react-native-contacts';
const img = require('./start.png')



const App: () => React$Node = () => {
  const [text, setText] = useState();
  const [answerText, setAnswerText] = useState();
  // const [contact, setContact] = useState();
  const [searchLink, setSearchLink] = useState();
  // const [stop, setStop] = useState('none')

  const [appState, setAppState] = useState('Привет');
  const [contactCall, setContactCall] = useState();

  const [isSearchIn, setIsSearchIn] = useState(true);
  const [searchPlaces, setSearchPlaces] = useState();
  const [endRoute, setEndRoute] = useState();
  const [allEvents, setAllEvents] = useState();
  const [searchEvents, setSearchEvents] = useState();
  const [addAlarm, setAddAlarm] = useState();

  useEffect(() =>{
    if (searchPlaces){
      const _searchPlaces = createOpenLink({query: searchPlaces, zoom: 100 })
      _searchPlaces()
      setSearchPlaces()
    }

  },[searchPlaces])



  // const start = 'SOHO, New York City, NY';
  // const end = endRoute;
  // const travelType1 = 'drive'
  // const _goToYosemite = createOpenLink({travelType1, end })




  useEffect(() =>{
      if (endRoute){
        const _endRoute = createOpenLink({travelType: 'drive', end: endRoute })
        _endRoute()
        setEndRoute()
    }
  },[endRoute])

  useEffect(() =>{
    let d = new Date()
    // let title = "";
    // let startDateAddEvents = d.toISOString()
    // let endDataAddEvents = new Date(d.setHours(d.getHours()+1)).toISOString()
    //

    const _addAlarmClock = ()=>{

      let date = new Date();
      // dayAlarm = addAlarm['dey']
      // hourAlarm = addAlarm['hour']
      date.setDate(date.getDate() + 1);
      date.setHours(13, 55);

      AlarmClock.createAlarm(date.toISOString(), 'My Custom Alarm');
    }


    const _searshEvent = ()=>{
      searchEvents.forEach(function(item, i) {
        console.log(i)
        console.log(item)
        })
    }

  if(searchEvents != undefined){
    _searshEvent()
  }


  //
  //   const _addEventCalendar = (title, startDateAddEvents=startDateAddEvents, endDataAddEvents=endDataAddEvents)=>{
  //     RNCalendarEvents.saveEvent(title, {
  //       calendarId: '6',
  //       startDate: startDateAddEvents,
  //       endDate: endDataAddEvents,
  //       }).then(
  //           (result) => {
  //             console.log(
  //                 'сохраньоноє собитія',
  //                 result
  //
  //             );
  //           },
  //           (result) => {
  //             console.error(result);
  //           },
  //       );
  //
  //     }
  //
  //   const _removeEventCalendar = (idEvent)=>{
  //     RNCalendarEvents.removeEvent(idEvent).then(
  //         (result) => {
  //           console.log(
  //               'Удалить собитія',
  //               result
  //
  //           );
  //         },
  //         (result) => {
  //           console.error(result);
  //         },
  //     );
  //   }
  //
  },[searchEvents])




  useEffect( () => {
    // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
    //   'title': "Contacts",
    //   'message': "This app would like to view your contacts."
    // }).then(async ()=>await Contacts.getAll())
    //     .then(contacts => {
    //       // console.log(contacts)
    //       setContact(contacts)
    //     })

    const onSpeechStart = (e) => {
      console.log('onSpeechStart: ', e);
    };

    const onSpeechError = (e) => {
      setText('');
      console.log("ERROR!!!!", e);
    }

    const onSpeechEnd = (e) => {
      // setText('')
      console.log("END", e)
    }

    const onSpeechResultsHandler = (e) =>{
      setAppState(e.value[0])
      setText(e.value[0])
      // console.log("rezult", e.value[0])
    }

    const onSpeechPartialResultsHandler = (e) =>{
      setText(e.value[0])
    }

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResultsHandler
    Voice.onSpeechPartialResults = onSpeechPartialResultsHandler;
    Voice.onSpeechEnd = onSpeechEnd;


    Tts.setDefaultLanguage('ru-RU');
    Tts.setDefaultVoice('ru-ru-x-rue-local');


    let d = new Date()
    let startDate = new Date(1990).toISOString()
    let endDate = d.toISOString()
    RNCalendarEvents.fetchAllEvents(startDate, endDate).then(
        (result) => {
          setAllEvents(result)
          let searchEventsObj = []
            result.forEach(function(item, i) {
                  searchEventsObj[i]={'date': item['startDate'], 'event': item['title']}
                  let k = i-1
                  if(k>=0){
                    if (searchEventsObj[k]['event'] == item['title']){
                      delete searchEventsObj[k]
                    }
                  }
            })
          setSearchEvents(searchEventsObj)
          // console.log(searchEvents)
        },

        (result) => {
          console.error(result);
        },
    );




    //  ru-ru-x-dfc#female_3-local , ru-ru-x-rue-network, ru-RU-language, ru-ru-x-rue-local, ru-ru-x-ruc-network, ru-ru-x-dfc-network
  // ru-ru-x-dfc#female_1-local, ru-ru-x-dfc#female_2-local, ru-ru-x-ruc-local, ru-ru-x-dfc-local
    //  ru-ru-x-rud-local

  //  uk-ua-x-hfd-local

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  },[]);



  useEffect(() => {
    // console.log(contact)
    const apiUrl = 'https://kukvitja2021.pythonanywhere.com/text';
    Axios({
      method: "post",
      url: apiUrl,
      data: {
        words: appState,
      },
      headers:{
        Accept: 'application/json',
        "Content-Type":"application/json"
      }
    })
        .then(function (response) {
          console.log(response.data)
          if (typeof(response.data[0]) == "object"){
            if (response.data[0]["link"]){
              setSearchLink(response.data[0]["link"])
              setIsSearchIn(false)
              Tts.speak('вот что я нашла')

            }
            else if(response.data[0]["calendar"]){
              // let searchEventsObj = {}
              // allEvents.forEach(function(item, i) {
              //   searchEventsObj[i]={'date': item['startDate'], 'event': item['title']}
              //   let k = i-1
              //   if(k>=0){
              //     if (searchEventsObj[k]['event'] == item['title']){
              //         delete searchEventsObj[k]
              //       }
              //
              //   }


              // })
              // setSearchEvents(searchEventsObj)
              console.log(searchEvents)

            }
            else if(response.data[0]["map"]){
              if(response.data[0]["map"]["search"]){
                setSearchPlaces(response.data[0]["map"]["search"])
                Tts.speak('')
              }
              if (response.data[0]["map"]["endRoute"]){
                setEndRoute(response.data[0]["map"]["endRoute"])
                Tts.speak('')
              }

            }
            else {
              setAnswerText(response.data[0][0])
              response.data[0].forEach(function(item, i) {
                Tts.speak(item);
              })
            }
          }else{
            setAnswerText(response.data[0])
            Tts.speak(response.data[0]);
          }


            //   if (response.data[1] != undefined) {
            //       if (response.data[1] == "_call") {
            //         console.log(response.data[1])
            //       }
            //   }
        })
          .catch(function (error) {
            console.log(error)
            // Tts.speak("ошибка сети");
            // setText(error)
          })


  }, [appState]);


  const _startRecognizing = async () => {
    setIsSearchIn(true)
    setAnswerText('')
    // Voice.getSpeechRecognitionServices().then((a) => console.log(a))
    setText('Говорите...');
    try {
      await Voice.start('ru-RU');
    } catch (e) {
      console.error(e);
    }
  }

  const _stopSound = async () => {
    setText('');
    try {
      await Tts.stop();
    } catch (e) {
      console.error(e);
    }
  }



  const _call = (number) => {
      // numberPhone
      const args = {
          number: number,
      }
      call(args).catch(console.error)

  }


  function WraitInfo(props) {
    const isSearchIn = props.isSearchIn;
    const dataSearch = props.dataSearch;

    if (isSearchIn) {
      return (
          <Text
            style={styles.sectionText}
          >
         {answerText}
        </Text>
      )
    }
    else {
      const template = Object.keys(dataSearch).map(item => <Button key={item} onPress={ ()=>{ Linking.openURL(dataSearch[item])}}  title={item} disabled/>)
      return (
          <ScrollView
              style={styles.sectionText}
          >
            {template}
          </ScrollView>
      );
    }

  }




  return (
    <View style={styles.container}>
      <StatusBar
          animated={true}
          backgroundColor='rgba(52, 52, 52, 0.9)'
          // translucent={true}
          // barStyle={statusBarStyle}
          // showHideTransition={statusBarTransition}
          hidden={false}
      />
      <ImageBackground source={img} style={styles.image}>

      {/*  <Text style={styles.text}>Inside</Text>*/}

      <Text
          style={styles.sectionTitle}
      >
        {text}
      </Text>
        {/*{endRoute?<Button color={'#bdc3c7'} onPress={_goToYosemite} title="Відкрити карту 🗺" />: null}*/}


      <TouchableHighlight
          onPress={_startRecognizing}
          style={styles.play}>
        <Image
            style={styles.button_play}
            source={{
              uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png',
            }}
        />

      </TouchableHighlight>
      <TouchableHighlight
          onPress={_stopSound}
          style={styles.stop}>
        <Image
            style={styles.button_stop}
            source={{
              uri:'https://cdn3.iconfinder.com/data/icons/dev-basic/512/stop-512.png',
            }}
        />

      </TouchableHighlight>

          <WraitInfo isSearchIn={isSearchIn} dataSearch={searchLink}/>

      </ImageBackground>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"

  },
  image: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center"
  },
  play: {
    position: 'relative',
    backgroundColor: 'rgba(52, 52, 52, 0.0)',
    width:95,
    height:95,
    bottom: "-10%",
    right:'-75%',
    borderRadius: 95,
  },
  stop: {
    position: 'relative',
    // backgroundColor: 'rgba(52, 52, 52, 0.0)',
    width:60,
    height:60,
    bottom: "-35%",
    right:'-79%',
    borderRadius: 60,
  },
  button_play: {
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    borderRadius: 75,
    right: 10,
    bottom:10,
    width: 75,
    height: 75,
  },
  button_stop: {
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    borderRadius: 40,
    right: 10,
    bottom:10,
    width: 40,
    height: 40,
  },
  sectionTitle: {
    position: 'absolute',
    right: '0%',
    top: '0%',
    width: '100%',
    height: 55,
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
    borderBottomWidth:1,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    borderBottomColor: '#000',
    padding: 10,
    paddingTop: 15,

  },

  sectionText: {
    position: 'absolute',
    left: '0%',
    bottom: '0%',
    width: '70%',
    height: '50%',
    fontSize: 12,
    fontWeight: '400',
    color: "#d0d0d0",
    borderBottomWidth:1,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    borderBottomColor: '#000',
    padding: 10,
    paddingTop: 3,

  },
  // sectionHref:{
  //   // color:"#730700",
  //   // borderBottomWidth:5,
  //   borderBottomColor:'#111',
  //   // marginBottom:1,
  //   // paddingBottom:1,
  //   // fontSize:10
  //
  //
  // }


});

export default App;
