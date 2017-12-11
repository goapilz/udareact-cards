import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {connect} from 'react-redux'
import {deleteDeck} from '../actions'
import {red, green} from '../constants/colors'
import {defaultStyles as styles} from '../styles/styles'

class DeckDetails extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {deckId} = navigation.state.params
        // no way to get the title by the id because of the static method :-(
        return {
            title: 'Details'
        }
    }

    navigateQuiz(deckId) {
        this.props.navigation.navigate('Quiz', {deckId})
    }

    navigateAddCard(deckId) {
        // hack to update this view when coming back from Add Card
        this.props.navigation.navigate('AddCard', {
            deckId, doForceUpdate: () => {
                this.forceUpdate()
            }
        })
    }

    deleteDeck(deckId) {
        const {deck, goBack, deleteDeck} = this.props
        Alert.alert(
            `Delete Deck ${deck.title} ?`, '',
            [{text: 'Cancel', onPress: () => {}, style: 'cancel'},
             {text: 'OK', onPress: () => deleteDeck(deckId).then(goBack)}],
            {cancelable: true, onDismiss: () => {}}
        )
    }

    render() {
        const {deck, deckId} = this.props
        const {goBack} = this.props
        if (deck) {
            return (
                <View style={styles.view}>
                    <View style={styles.viewTop}>
                        <Text style={[styles.text, {marginTop: 30}]}>{deck.title} has {deck.questions.length} cards</Text>
                        <TouchableOpacity style={[styles.btn, {marginTop: 30}]} onPress={() => this.navigateAddCard(deckId)}>
                            <Text style={styles.btnText}>Add Card</Text></TouchableOpacity>
                    </View>
                    <View style={styles.viewCenter}>
                        <TouchableOpacity style={[styles.btn, {height:100, backgroundColor: green}]} onPress={() => this.navigateQuiz(deckId)}>
                            <Text style={styles.btnText}>Start Quiz</Text></TouchableOpacity>
                    </View>
                    <View style={[styles.viewBottom,{marginBottom:40}]}>
                        <TouchableOpacity style={[styles.btn, {backgroundColor: red}]} onPress={() => this.deleteDeck(deckId)}>
                            <Text style={styles.btnText}>Delete Deck</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, {marginTop: 40}]} onPress={goBack}>
                            <Text style={styles.btnText}>Back</Text></TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return (<View style={styles.view}/>)
        }
    }
}

function mapStateToProps(decks, props) {
    const {deckId} = props.navigation.state.params
    return {
        deckId,
        deck: decks[deckId]
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        deleteDeck: (deckId) => dispatch(deleteDeck(deckId)),
        goBack: () => props.navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails)