import React, {Component} from 'react'
import {StyleSheet, Text, TouchableOpacity, ScrollView, View} from 'react-native'
import {connect} from 'react-redux'
import {reloadDecks} from '../actions'
import {gray, white, orange, lightGray} from '../constants/colors'

const styles = StyleSheet.create({
    deckOverview: {
        flex: 1,
        backgroundColor: white,
        margin: 0
    },
    deck: {
        borderWidth: 1,
        borderColor: gray,
        backgroundColor: lightGray,
        height: 100,
        margin: '2%'
    },
    deckText: {
        fontSize: 30,
        textShadowOffset: {width: 2, height: 2},
        paddingTop: 0,
        padding: 10,
        color: white
    },
    questionCountText: {
        fontSize: 20,
        textShadowOffset: {width: 2, height: 2},
        padding: 10,
        color: orange
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
                <View style={styles.deckOverview}>
                    {decks.map((deck) => (
                        <TouchableOpacity key={deck.id} style={styles.deck} onPress={() => this.props.navigation.navigate('DeckDetails', {deckId: deck.id})}>
                            <Text style={styles.deckText}>{deck.title}</Text>
                            <Text style={styles.questionCountText}>{deck.questionCount}&nbsp;{deck.questionCount === 1 ? 'Card' : 'Cards'}</Text>
                        </TouchableOpacity>
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

function mapDispatchToProps(dispatch, props) {
    return {
        reloadDecks: () => dispatch(reloadDecks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckOverview)