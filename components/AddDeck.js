import React from 'react'
import {View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'
import {addOrUpdateDeck} from '../actions'
import {defaultStyles as styles} from '../styles/styles'

const uuidGeneration = require('uuid/v1')

class AddDeck extends React.Component {

    state = {
        deckName: ''
    }

    addDeck() {
        // validation
        const {deckName} = this.state
        if (deckName.length === 0) {
            alert('Deck title must not be empty !')
            return false
        }

        // generate new deckId (validation is not really needed)
        const newDeckId = uuidGeneration()
        const {existingDeckIds} = this.props
        if (existingDeckIds.includes(newDeckId)) {
            alert(`deckId ${newDeckId} still exists`)
            return false
        }

        // add deck an go to deck detail view
        const {goBack, addOrUpdateDeck} = this.props
        addOrUpdateDeck(newDeckId, {
            title: deckName,
            questions: []}
        ).then(this.setState({deckName: ''})
        ).then(this.navigateDeckDetails(newDeckId))
    }

    navigateDeckDetails(deckId) {
        this.props.navigation.navigate('DeckDetails', {deckId})
    }

    render() {
        const {goBack} = this.props
        return (
            <KeyboardAvoidingView behavior="position" style={styles.view}>
                <Text style={styles.text}>Add a new Deck</Text>
                <TextInput style={[styles.input,{marginTop:60}]} onChangeText={(deckName) => this.setState({deckName})} value={this.state.deckName}/>
                <Text style={styles.textSmall}>Title</Text>
                <View style={[styles.rowView,{marginTop:60}]}>
                    <TouchableOpacity style={[styles.btn, {flex:1}]} onPress={() => this.addDeck()}>
                        <Text style={styles.btnText}>Add</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, {flex:1}]} onPress={goBack}>
                        <Text style={styles.btnText}>Back</Text></TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

function mapStateToProps(decks, props) {
    return {
        existingDeckIds: Object.keys(decks)
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        addOrUpdateDeck: (deckId, deck) => dispatch(addOrUpdateDeck(deckId, deck)),
        goBack: () => props.navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)