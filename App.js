import React from 'react'
import {View, StatusBar} from 'react-native'
import {Provider} from 'react-redux'
import {Constants} from 'expo'
import configureStore from './store/configureStore';
import {gray} from './constants/colors'
import MainNavigaton from './navigation/navigation';
import {setLocalNotification} from './utils/notification'

function CustomStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const store = configureStore()

export default class App extends React.Component {

    componentDidMount() {
        // start debugger (also available on android ?)
        debugger

        // set notification
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <CustomStatusBar backgroundColor={gray} barStyle="light-content"/>
                    <MainNavigaton/>
                </View>
            </Provider>
        )
    }
}