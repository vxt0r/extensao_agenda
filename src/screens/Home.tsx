import { useEffect } from 'react'
import { View, Text, FlatList, ListRenderItemInfo, StyleSheet, Pressable} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { ReservaDatabase, useReservaDatabase } from '@database/useReservaDatabase'
import { useReservaContext } from '@contexts/ReservaContext'
import { ReservaContent } from '@components/ReservaContent'
import { ReservaDelete } from '@components/ReservaDelete'


export function Home() {
  const {reservas, setReservas} = useReservaContext() 
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const reservaDatabase = useReservaDatabase()
  
  useEffect(() => {
    const list = async () => {
      try {
        const reservasDB = await reservaDatabase.listAll()
        setReservas(reservasDB);
      } catch (error) {
        console.error("Erro ao carregar registros:", error)
      }
    }
    list()
  }, [reservas])

  function renderItem({ item }: ListRenderItemInfo<ReservaDatabase>) {
      return <View style ={styles.item}>
              <ReservaContent {...item}/>
              <ReservaDelete {...item}/>
             </View>
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={()=>{navigation.navigate('form')}}>
        <Text style={styles.link}>Criar nova reserva</Text>
      </Pressable>

    <FlatList style={styles.flatlist}
        data={reservas}
        renderItem={renderItem} 
        keyExtractor={item => String(item.id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link : {
    padding: 6,
    fontSize: 22,
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: '#D8BFD8'
  },
  flatlist : {
    width: '100%',
    maxWidth: 1000,
    marginTop: 20,
    maxHeight: 700, 
  },
  item : {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
 
})
