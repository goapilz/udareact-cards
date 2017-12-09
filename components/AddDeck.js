import React from 'react'
import {View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native'
import styled from 'styled-components/native'
import {connect} from 'react-redux'
import {addOrUpdateDeck} from '../actions'
import {gray, white, orange, lightGray} from '../constants/colors'

const styles = StyleSheet.create({
    view: {
        flex: 1,
        marginRight: 30,
        marginLeft: 30,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        backgroundColor: gray,
        borderRadius: 5
    },
    btnText: {
        color: white,
        fontSize: 20
    },
    input: {
        height: 40,
        margin: 10,
        marginTop: 40,
        marginBottom: 20,
        width: '100%',
        fontSize: 20
    },
    text: {
        marginRight: 10,
        marginLeft: 10,
        fontSize: 30
    }
})

const uuidGeneration = require('uuid/v1')

class AddDeck extends React.Component {

    state = {
        deckName: ''
    }

    addDeck() {
        // use for validation
        const {existingDeckIds} = this.props
        const {goBack, addOrUpdateDeck} = this.props
        const {deckName} = this.state
        const newDeckId = uuidGeneration()
        if (existingDeckIds.includes(newDeckId)) {
            alert(`deckId ${newDeckId} still exists`)
        }
        addOrUpdateDeck(newDeckId, {
            title: deckName,
            questions: []
        }).then(
            this.setState({deckName: ''})
        ).then(goBack)
    }


    render() {
        const {goBack} = this.props
        return (
            <KeyboardAvoidingView behavior="position" style={styles.view}>
                <Text style={styles.text}>Add a new Deck</Text>
                <TextInput style={styles.input}
                           onChangeText={(deckName) => this.setState({deckName})}
                           value={this.state.deckName}/>
                <View style={{flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center'}}><TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.addDeck()}><Text style={styles.btnText}>Add</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={goBack}><Text style={styles.btnText}>Back</Text></TouchableOpacity></View>
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