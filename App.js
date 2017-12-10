import React from 'react'
import {View, Platform, StatusBar} from 'react-native'
import {TabNavigator, StackNavigator} from 'react-navigation'
import AddDeck from './components/AddDeck'
import DeckDetails from './components/DeckDetails'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import DeckOverview from './components/DeckOverview'
import {Provider} from 'react-redux'
import {purple, gray, white} from './constants/colors'
import {FontAwesome} from '@expo/vector-icons'
import {Constants} from 'expo'
import configureStore from './store/configureStore';

function CustomStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const MainTabNavigator = TabNavigator({
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

const ActivityNavigator = StackNavigator({
    Home: {
        screen: MainTabNavigator
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

const store = configureStore()

export default class App extends React.Component {

    componentDidMount() {
        console.log('before')
        debugger
        console.log('after')
        // TODO setLocalNotification()
    }

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <CustomStatusBar backgroundColor={gray} barStyle="light-content"/>
                    <ActivityNavigator/>
                </View>
            </Provider>
        )
    }
}