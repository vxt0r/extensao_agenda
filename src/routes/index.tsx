import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './app.routes'
import ReservaProvider from '@components/contexts/ReservaContext'

export function Routes() {
  return (
    <View style={{ flex: 1}}>
      <NavigationContainer>
        <ReservaProvider>
        <AppRoutes />
        </ReservaProvider>
      </NavigationContainer>
    </View>
  )
}
