import { ReservaDatabase, useReservaDatabase } from "@database/useReservaDatabase"
import { Pressable, Image, StyleSheet } from "react-native"
import { useReservaContext } from "./contexts/ReservaContext"


export function ReservaDelete(item: ReservaDatabase){
    const {reservas, setReservas} = useReservaContext() 
    const reservaDatabase = useReservaDatabase()
    function removeAndUpdate (item : ReservaDatabase){
        reservaDatabase.remove(item.id)
        const updateList = reservas.filter((reserva)=> reserva.id !== item.id)
        setReservas(updateList)
    }
    return (
        <Pressable onPress={() => removeAndUpdate(item)}>
            <Image source={require('@assets/delete_icon.png')} style={styles.image}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({ 
    image: {
        flex: 1,
        resizeMode: 'contain',
        marginBottom: 30
    }
  })
  