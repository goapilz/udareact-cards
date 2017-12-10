import React from 'react'
import {View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'
import {addOrUpdateDeck} from '../actions'
import {gray, white} from '../constants/colors'

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
        marginTop: 30,
        width: '100%',
        fontSize: 20
    },
    text: {
        marginRight: 10,
        marginLeft: 10,
        fontSize: 30
    },
    textSmall: {
        marginRight: 10,
        marginLeft: 10,
        fontSize: 10,
        marginBottom: 20
    }
})

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
        const {goBack, deckId, deck, addOrUpdateDeck} = this.props
        const {question, answer} = this.state
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
                <View style={{flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center'}}>
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