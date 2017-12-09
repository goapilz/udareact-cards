import React from 'react'
import {View, Text, StyleSheet, Platform, StatusBar} from 'react-native'
import styled from 'styled-components/native'
import {TabNavigator} from 'react-navigation'
import AddDeck from './components/AddDeck'
import DeckOverview from './components/DeckOverview'
import {Provider} from 'react-redux'
import {purple, gray, white} from './constants/colors'
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import {Constants} from 'expo'
import configureStore from './store/configureStore';

function CustomStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const MainNavigator = TabNavigator({
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
                    <MainNavigator/>
                </View>
            </Provider>
        )
    }
}