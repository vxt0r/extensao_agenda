import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FormReserva } from '@screens/FormReserva'
import { Home } from '@screens/Home'


export type AppRoutesParams = {
  home: undefined
  form: undefined
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutesParams>

const { Navigator, Screen } = createNativeStackNavigator<AppRoutesParams>()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{contentStyle: {backgroundColor : '#E6E6FA'}}}>
      <Screen 
        name="home"
        component={Home}
        options={{ title: 'Home' }}
      />
      <Screen
        name="form"
        component={FormReserva}
        options={{ title: 'Formulário de cadastro' }}
      />
    </Navigator>
  );
}
