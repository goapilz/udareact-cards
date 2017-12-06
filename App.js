import React from 'react'
import {View,Text, StyleSheet, Platform, StatusBar} from 'react-native'
import styled from 'styled-components/native'
import reducer from './reducers'
import {TabNavigator} from 'react-navigation'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

const CenterView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background: #aaa;
`

const WelcomeText = styled.Text`
    color: white;
    font-size: 20;
`

const WelcomeBtn = styled.TouchableOpacity`
    width: 100px;
    height: 50px;
    background: red;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
`

function StatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const Tabs = TabNavigator({
    History: {
        screen: History,
        navigationOptions: {
            tabBarLabel: 'History',
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
        },
    },
    AddEntry: {
        screen: AddEntry,
        navigationOptions: {
            tabBarLabel: 'Add Entry',
            tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
        },
    },
    Live: {
        screen: Live,
        navigationOptions: {
            tabBarLabel: 'Live',
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-speedometer' size={30} color={tintColor}/>
        }
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
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <UdaciStatusBar backgroundColor={purple} barStyle="light-content"/>
                    <MainNavigator/>
                </View>
            </Provider>
        )
    }
}