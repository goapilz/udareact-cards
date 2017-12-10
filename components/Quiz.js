import React from 'react'
import {View, Text, Alert, TouchableOpacity, TextInput, StyleSheet, Animated} from 'react-native'
import {connect} from 'react-redux'
import {gray, white, green, red} from '../constants/colors'

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
        showAnswer: false,
        bounceValue: new Animated.Value(1),
    }

    toggleQuestion() {
        this.setState({showAnswer: !this.state.showAnswer})
        this.animate()
    }

    animate() {
        const {bounceValue} = this.state
        Animated.sequence([
            Animated.timing(bounceValue, {duration: 200, toValue: 1.04}),
            Animated.spring(bounceValue, {toValue: 1, friction: 4})
        ]).start()
    }

    correct() {
        let {questionIndex, correctAnswers} = this.state
        questionIndex++
        correctAnswers++
        this.setState({showAnswer: false, questionIndex, correctAnswers})
        this.animate()
    }

    incorrect() {
        let {questionIndex} = this.state
        questionIndex++
        this.setState({showAnswer: false, questionIndex})
        this.animate()
    }

    render() {
        const {deck} = this.props
        const {questionIndex, correctAnswers, showAnswer, bounceValue} = this.state
        const {goBack} = this.props

        // check if quiz should be run
        let terminateQuiz = false
        if (deck.questions.length === 0) {
            terminateQuiz = true
            Alert.alert(
                'No questions', 'Add a question first.',
                [{text: 'OK', onPress: goBack}],
                {cancelable: true, onDismiss: goBack}
            )
        } else if (questionIndex >= deck.questions.length) {
            terminateQuiz = true
            Alert.alert(
                `Quiz finished`, `${correctAnswers} correct answers (${Math.round(correctAnswers / deck.questions.length * 100)}%)`,
                [{text: 'OK', onPress: goBack}],
                {cancelable: true, onDismiss: goBack}
            )
        }

        if (terminateQuiz) {
            return (<View style={styles.view}/>)
        } else {
            const question = deck.questions[questionIndex]
            return (
                <View style={styles.view}>
                    <Text style={styles.textSmall}>Card {questionIndex + 1}/{deck.questions.length}</Text>
                    <Text style={styles.textSmall}>{correctAnswers} correct answers ({Math.round(correctAnswers / deck.questions.length * 100)}%)</Text>
                    <Animated.Text
                        style={[styles.text, {marginTop: 20, transform: [{scale: bounceValue}]}]}>
                        {showAnswer ? question.answer : question.question}
                    </Animated.Text>

                    <TouchableOpacity style={[styles.btn, {height: 20}]} onPress={() => {
                        this.toggleQuestion()
                    }}><Text style={styles.btnText}>Show {showAnswer ? 'question' : 'answer'}</Text></TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.btn, {marginTop: 20, backgroundColor: green}]}
                        onPress={() => {
                            this.correct()
                        }}><Text style={styles.btnText}>Correct</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, {marginTop: 20, backgroundColor: red}]}
                        onPress={() => {
                            this.incorrect()
                        }}><Text style={styles.btnText}>Incorrect</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btn, {marginTop: 50}]}
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
        goBack: () => props.navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)