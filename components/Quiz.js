import React from 'react'
import {View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
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
        marginTop: 30,
        width: '100%',
        fontSize: 20
    },
    text: {
        marginRight: 10,
        marginLeft: 10,
        fontSize: 30
    },
})

class Quiz extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {deckId} = navigation.state.params
        // no way to get the title by the id because of the static method :-(
        return {
            title: `Quiz`
        }
    }

    state = {
        questionIndex: 0,
        correctAnswers: 0,
        showAnswerPressed: false
    }

    showAnswer() {
        this.setState({showAnswerPressed: true})
    }

    correct() {
        let {questionIndex, correctAnswers} = this.state
        questionIndex++
        correctAnswers++
        this.setState({showAnswerPressed: false, questionIndex, correctAnswers})
    }

    incorrect() {
        let {questionIndex} = this.state
        questionIndex++
        this.setState({showAnswerPressed: false, questionIndex})
    }

    render() {
        const {deck} = this.props
        const {questionIndex, correctAnswers, showAnswerPressed} = this.state
        const {goBack} = this.props

        // check if quiz should be run
        let terminateQuiz = false
        if (deck.questions.length === 0) {
            terminateQuiz = true
            alert('no questions')
        } else if (questionIndex >= deck.questions.length) {
            terminateQuiz = true
            alert('quiz finished')
        }

        if (terminateQuiz) {
            return (
                <View style={styles.view}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={goBack}><Text style={styles.btnText}>Back</Text></TouchableOpacity>
                </View>
            )
        } else {
            const question = deck.questions[questionIndex]
            return (
                <View style={styles.view}>
                    <Text style={styles.textSmall}>Card {questionIndex + 1}/{deck.questions.length}</Text>
                    <Text style={styles.textSmall}>{Math.round(correctAnswers / deck.questions.length * 100)}% correct
                        answers</Text>
                    <Text style={[styles.text, {marginTop: 20}]}>Question:</Text>
                    <Text style={styles.text}>{question.question}</Text>
                    {showAnswerPressed ? (<Text style={styles.text}>{question.answer}</Text>) : (<TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            this.showAnswer()
                        }}><Text style={styles.btnText}>Show answer</Text></TouchableOpacity>)}
                    <Text style={styles.textSmall}>Answer:</Text>
                    <Text style={styles.textSmall}>{question.answer}</Text>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            this.correct()
                        }}><Text style={styles.btnText}>Correct</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            this.incorrect()
                        }}><Text style={styles.btnText}>Incorrect</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={goBack}><Text style={styles.btnText}>Back</Text></TouchableOpacity>
                </View>
            )
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
        reloadDecks: () => dispatch(reloadDecks()),
        goBack: () => props.navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)