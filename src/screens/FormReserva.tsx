import { useReservaDatabase } from '@database/useReservaDatabase'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { useState } from 'react'
import { Alert, View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import { useReservaContext } from '@contexts/ReservaContext'
import { formatDatetimeSqlite } from '@utils/dateUtils'

export function FormReserva() {
  const {reservas, setReservas} = useReservaContext() 
  const reservaDatabase = useReservaDatabase()
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const [cliente, setCliente] = useState('')
  const [data_servico, setDataServico] = useState('')
  const [tipo_servico, setTipoServico] = useState('')
  const [duracao_min, setDuracaoMin] = useState('')

  function isDatePassed(reserveDatetime: string) : boolean{
    const datetime = new Date(reserveDatetime)
    
    if(datetime < new Date()) {
      Alert.alert("Essa data já passou")
      return true 
    }
    return false
  }

  async function IsIncompatibleSchedules (reserveDatetime: string, reserveDuration: number): Promise<boolean>{
    let incompatibleSchedules: boolean = false
    const reservedTimes = await reservaDatabase.getByDay(reserveDatetime)
    const startNewReserve = new Date(reserveDatetime)

    for(let reserve of reservedTimes){
      let startReserve = new Date(reserve.data_servico)
      let endReserve = new Date(startReserve.getTime() + (reserve.duracao_min *  60000))
      if(startNewReserve >= startReserve && startNewReserve < endReserve) incompatibleSchedules = true
      let endNewReserve = new Date(startNewReserve.getTime() + (reserveDuration *  60000))
      if (startNewReserve < startReserve && endNewReserve > startReserve) incompatibleSchedules = true
      
      if(incompatibleSchedules) {
        Alert.alert('Incompatibilidade de horários')
        return true
      }
    }
    return false
  }

  async function isDatetimeValid(reserveDatetime: string, reserveDuration: number){
    const datePassed : boolean = isDatePassed(reserveDatetime)
    reserveDuration = reserveDuration == 0 ? 30 : reserveDuration
    const incompatibleSchedules = await IsIncompatibleSchedules(reserveDatetime,reserveDuration)
    return !datePassed && !incompatibleSchedules
  }

  async function reserve(){
    const valid  = await isDatetimeValid(formatDatetimeSqlite(data_servico), Number(duracao_min))
    if(valid){
      reservaDatabase.create({
          cliente,
          data_servico: formatDatetimeSqlite(data_servico),
          tipo_servico,
          duracao_min: Number(duracao_min)
      }).then(()=>{
          Alert.alert("Reserva realizada com sucesso")
          setReservas(reservas)
          navigation.navigate('home')
      }).catch((error)=>{
          console.log(error)
          Alert.alert("Erro ao realizar a reserva :/")
      })
    }
  }

  return (
    <View style={styles.form}>
      <TextInput style={styles.input} placeholder="Nome do cliente (obrigatório)" value={cliente} onChangeText={setCliente}/>
      <TextInput style={styles.input} placeholder="Tipo de Serviço" value={tipo_servico} onChangeText={setTipoServico}/>
      <TextInput style={styles.input} placeholder="Duração em minutos (somente número)" value={duracao_min} onChangeText={setDuracaoMin}/>
      <TextInput style={styles.input} placeholder='Data e hora  (obrigatório), ex: 10/01/25 10:00' value={data_servico} onChangeText={setDataServico}/>
      <Pressable style={styles.button} onPress={reserve}>
          <Text style={styles.buttonText}>Reservar</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form : {
    marginTop: 100,
    width: '90%',
    margin: 'auto',
    height: '100%',
    gap: 10,
    backgroundColor: '#E6E6FA'
  },
  input : {
      height: 60,
      borderRadius: 6,
      backgroundColor: '#FFF0F5'
  },
  button :{
    backgroundColor: '#363636',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText : {
      color: '#fff',
      fontSize: 20
  }
})