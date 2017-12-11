import React from 'react'
import {View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'
import {addOrUpdateDeck} from '../actions'
import {defaultStyles as styles} from '../styles/styles'

class AddCard extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {deckId} = navigation.state.params
        // no way to get the title by the id because of the static method :-(
        return {
            title: 'Add Card'
        }
    }

    state = {
        question: '',
        answer: ''
    }

    addCard() {
        // validation
        const {question, answer} = this.state
        if (question.length === 0) {
            alert('Question must not be empty !')
        } else if (answer.length === 0) {
            alert('Answer must not be empty !')
        }

        // add question and go to previous screen
        const {goBack, deckId, deck, addOrUpdateDeck} = this.props
        deck.questions.push({question, answer})
        addOrUpdateDeck(deckId, deck).then(
            this.setState({question: '', answer: ''})
        ).then(goBack)
    }

    render() {
        const {deck} = this.props
        const {goBack} = this.props
        return (
            <KeyboardAvoidingView behavior="position" style={styles.view}>
                <Text style={styles.text}>Add a new Question to {deck.title}</Text>
                <TextInput style={styles.input} onChangeText={(question) => this.setState({question})} value={this.state.question}/>
                <Text style={styles.textSmall}>Question:</Text>
                <TextInput style={styles.input} onChangeText={(answer) => this.setState({answer})} value={this.state.answer}/>
                <Text style={styles.textSmall}>Answer:</Text>
                <View style={styles.rowView}>
                    <TouchableOpacity style={styles.btn} onPress={() => this.addCard()}>
                        <Text style={styles.btnText}>Add</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={goBack}>
                        <Text style={styles.btnText}>Back</Text></TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
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
        addOrUpdateDeck: (deckId, deck) => dispatch(addOrUpdateDeck(deckId, deck)),
        goBack: () => {props.navigation.goBack(); props.navigation.state.params.doForceUpdate();}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)