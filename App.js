import { StatusBar } from 'expo-status-bar';
import { Button, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import {Audio} from 'expo-av';
const colors = ['#F7DC6F', '#A2D9CE', '#D7BDE2'];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState('POMO'|'SHORT'|'BREAK');
  const [isActive, setIsActive] = useState(false);

  useEffect(()=>{
    let interval = null;
    if(isActive){
      interval = setInterval(()=>{
        setTime(time-1)
      },1000)
    }else{
      clearInterval(interval);
    }
    if(time === 0){
      setIsActive(false)
      setIsWorking(prev => !prev)
      setTime(isWorking ? 300:1500)
    }
    return () =>clearInterval(interval)
  }, [isActive, time])

  function handleStartStop(){
    playSound();
    setIsActive(!isActive)
  }
  async function playSound(){
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/clic.mp3")
    )
    await sound.playAsync();
  }
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors[currentTime]}]}>
      <View style={{ paddingTop: Platform.OS === "android" && 25 }}>
        <Text style={styles.text}>Pomodoro</Text>
        {/* <StatusBar style='auto'/> cambiar los colores del la barra*/}
        <Header
          currentTime={currentTime} 
          time={time}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
          setIsActive={setIsActive}
        />
        <Timer time={time}/>
        <TouchableOpacity style={styles.buton} onPress={handleStartStop}>
          <Text style={styles.textButon}>{isActive ? "STOP":"START"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10
  },
  text:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#312d50'
  },
  buton:{
    backgroundColor:'#312d50',
    padding:10,
    borderRadius:8,
    marginTop:10
  },
  textButon:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:18,
    textAlign:'center'
  }
});
