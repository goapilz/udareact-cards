import React from 'react'
import {Platform} from 'react-native'
import {TabNavigator, StackNavigator} from 'react-navigation'
import AddDeck from '../components/AddDeck'
import DeckDetails from '../components/DeckDetails'
import AddCard from '../components/AddCard'
import Quiz from '../components/Quiz'
import DeckOverview from '../components/DeckOverview'
import {purple, gray, white} from '../constants/colors'
import {FontAwesome} from '@expo/vector-icons'

const SubTabNavigaton = TabNavigator({
    DeckOverview: {
        screen: DeckOverview,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({tintColor}) => <FontAwesome name='list' size={30} color={tintColor}/>
        },
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({tintColor}) => <FontAwesome name='plus' size={30} color={tintColor}/>
        },
    }
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        showIcon: true,
        style: {
            height: 60,
            backgroundColor: Platform.OS === 'ios' ? white : gray,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
})

const MainNavigaton = StackNavigator({
    Home: {
        screen: SubTabNavigaton
    },
    DeckDetails: {
        screen: DeckDetails,
        navigationOptions: {
            headerTintColor: Platform.OS === 'ios' ? purple : white,
            headerStyle: {
                backgroundColor: Platform.OS === 'ios' ? white : gray,
            }
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            headerTintColor: Platform.OS === 'ios' ? purple : white,
            headerStyle: {
                backgroundColor: Platform.OS === 'ios' ? white : gray,
            }
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            headerTintColor: Platform.OS === 'ios' ? purple : white,
            headerStyle: {
                backgroundColor: Platform.OS === 'ios' ? white : gray,
            }
        }
    }
})

export default MainNavigaton