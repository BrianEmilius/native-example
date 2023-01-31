import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DetailsScreen from './views/DetailsScreen';
import HomeScreen from './views/HomeScreen'

const Stack = createNativeStackNavigator()

Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: "#f41e1e",
            },
            headerTintColor: "#fff",
          }} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({route}) => ({
            title: route.params.title.capitalize(),
            headerStyle: {
              backgroundColor: "#f41e1e",
            },
            headerTintColor: "#fff",
          })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
