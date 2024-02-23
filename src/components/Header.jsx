import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const options = ['Pomodoro', 'Short Break', 'Long Break']
export default function Header({time, currentTime, setTime, setCurrentTime, setIsActive}){

    function handlePress(index){
        setIsActive(false)
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
        setCurrentTime(index);
        setTime(newTime * 60);
        
    }

    return(
        <View style={ styles.container}>
            {options.map((item, index)=>(
                <TouchableOpacity
                    key={index} 
                    style={[styles.itemStyle, currentTime !== index && {borderColor:'transparent'}]} 
                    onPress={()=>handlePress(index)}
                    >
                    <Text style={styles.textButon}>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>

    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemStyle:{
        flexGrow:1,
        borderWidth:3,
        borderRadius:8,
        borderColor:'#312d50'
    },
    textButon:{
        textAlign:'center',
        padding:10
    }
})