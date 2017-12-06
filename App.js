import React from 'react'
import {View, Text, StyleSheet, Platform, StatusBar} from 'react-native'
import styled from 'styled-components/native'
import reducers from './reducers'
import {TabNavigator} from 'react-navigation'
import AddDeck from './components/AddDeck'
import DeckOverview from './components/DeckOverview'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {purple, white} from './constants/colors'
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import {Constants} from 'expo'


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
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
        },
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
        },
    }
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white : purple,
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

export default class App extends React.Component {
    render() {
        return (
            <Provider store={createStore(reducers)}>
                <View style={{flex: 1}}>
                    <CustomStatusBar backgroundColor={purple} barStyle="light-content"/>
                    <MainNavigator/>
                </View>
            </Provider>
        )
    }
}