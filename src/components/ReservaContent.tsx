import { ReservaDatabase } from "@database/useReservaDatabase"
import { formatDateTimeView, isSameWeek } from "@utils/dateUtils"
import { View, Text, StyleSheet } from "react-native"

const weekdays = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado']
export function ReservaContent (item: ReservaDatabase) {
    const datetime = new Date(item.data_servico)
    const week = isSameWeek(datetime) ? '(Essa semana)' : ''

    const cliente = item.cliente 
    const data = formatDateTimeView(item.data_servico)
    const tipoServico = item.tipo_servico !== null ? item.tipo_servico : null 
    const duracaoMin = item.duracao_min !== 0 ? ' - ' + item.duracao_min + ' min' : null 

    return (
    <View style={styles.item}>
        <Text style={styles.itemText}>{weekdays[datetime.getDay()]} {week}</Text>
        <Text style={styles.itemText}>{cliente} - {data}</Text> 
        <Text style={styles.itemText}>{tipoServico}{duracaoMin}</Text> 
    </View>
    )
}

const styles = StyleSheet.create({
    item : {
        width: '80%',
        padding: 10,
        marginBottom: 25,
        backgroundColor: '#363636',
        borderWidth: 2,
        borderColor: '#FFF0F5'
    },
    itemText : {
        fontSize: 20,
        width: 'auto',
        maxWidth: 350,
        color: '#fff'
    },
  })