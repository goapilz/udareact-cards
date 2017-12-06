import React, {Component} from 'react'
import {StyleSheet, Text, ScrollView, View, AppRegistry} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        backgroundColor: '#444',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },
    box: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        width: '31%',
        height: 120,
        backgroundColor: '#aaa',
        margin: '1%',
    }
})

class DeckOverview extends Component {

    render() {
        const items = []
        for(let i = 0; i < 50; i++){
            items.push(<View key={i} style={styles.box}/>)
        }
        return (
            <ScrollView>
                <View style={styles.container}>
                    {items}
                </View>
            </ScrollView>
        )
    }
}

export default DeckOverview