import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, TextInput, Button, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';







const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



function ScreenBundlePersonnage({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchPersonnage" component={SearchPersonnageScreen} />
      <Stack.Screen name="ListePersonnage" component={ListePersonnageScreen} />
      <Stack.Screen name="ImagePersonnage" component={ImagePersonnageScreen} />
    </Stack.Navigator>
  );
}

function ViewedScreen({ navigation }) {

  const ALL_EPISODES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]


  return (
    <SafeAreaView>
      <FlatList
        data={ALL_EPISODES}
        renderItem={({ item }) => {
          <View>
            <TouchableOpacity>{item}</TouchableOpacity>
          </View>

        }
        }
      />
    </SafeAreaView>
  )


}

function SearchPersonnageScreen({ navigation }) {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View>
      <TextInput
        type="text" style={{ borderWidth: 1 }}
      />
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ marginTop: 15 }} onPress={toggleSwitch}>
          <Text>Uniquement les personnages morts
          </Text>
        </TouchableOpacity>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <Button title='Search' onPress={() => navigation.navigate('ListePersonnage')} />


    </View>
  )
}
function ListePersonnageScreen({ navigation }) {

  const [personnage, setPersonnage] = useState()

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character/').then((response) => {
      return response.json()
    }).then((json) => {
      setPersonnage(json)
    })
  }, [])


  return (
    <View>
      {/* doomed by the FlatList */}
      <FlatList
        data={personnage}
        renderItem={({ item }) => {

          <Text>{item.image}</Text>

        }
        }
      />
      <Button title="c'est une image" onPress={() => navigation.navigate('ImagePersonnage')} />
    </View>
  )
}


function ImagePersonnageScreen({ navigation }) {
  return (
    <View>
      <Button title="Retour a la search bar" onPress={() => navigation.navigate('SearchPersonnage')} />
    </View>
  )
}


function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Recherche':
              iconName = 'grid-outline'
              break;
            case 'Vue':
              iconName = 'person-outline'
              break;
          }
          return iconName
            ? <Ionicons name={iconName} size={size} color={color} />
            : null;
        },
      })}>
        <Tab.Screen name="Recherche" component={ScreenBundlePersonnage} options={{ headerShown: false }} />
        <Tab.Screen name="Vue" component={ViewedScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}





export default App;
