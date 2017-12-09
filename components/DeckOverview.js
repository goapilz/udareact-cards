import React, {Component} from 'react'
import {StyleSheet, Text, ScrollView, View, AppRegistry} from 'react-native'
import {connect} from 'react-redux'
import {reloadDecks} from '../actions'

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

    componentDidMount() {
        const {decks} = this.props
        const {reloadDecks} = this.props

        // trigger reload when no data exists - try to find a better trigger ... e.g. first run of app
        if (decks.length === 0) {
            reloadDecks()
        }
    }

    render() {
        const {decks} = this.props
        return (
            <ScrollView>
                <View style={styles.container}>
                    {decks.map((deck) => (
                        <View key={deck.id}
                              style={styles.box}><Text>{deck.title}</Text><Text>{deck.questionCount}&nbsp;
                            questions</Text></View>
                    ))}
                </View>
            </ScrollView>
        )
    }
}

function mapStateToProps(decks, props) {
    return {
        decks: Object.keys(decks).map((tempKey) => {
            const deck = decks[tempKey]
            return {
                id: tempKey,
                title: deck.title,
                questionCount: deck.questions.length
            }
        })
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reloadDecks: () => dispatch(reloadDecks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckOverview)