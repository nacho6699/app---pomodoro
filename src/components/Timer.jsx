import {Text, View, StyleSheet} from 'react-native'
 export default function Timer({time}){
    const formattedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, '0')}:${(time % 60)
        .toString()
        .padStart(2, '0')}`;// aumentar un 0 en caso de ser un solo número
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{formattedTime}</Text>
        </View>
    )
 }

 const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        marginTop:10,
        height:'50%',
        borderRadius:8,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:80,
        fontWeight:'bold',
        color:'#312d50'
    }
 })