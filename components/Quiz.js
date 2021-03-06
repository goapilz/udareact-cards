import React from 'react'
import {View, Text, Alert, TouchableOpacity, StyleSheet, Animated} from 'react-native'
import {connect} from 'react-redux'
import {clearLocalNotification, setLocalNotification} from '../utils/notification'
import {green, red} from '../constants/colors'
import {defaultStyles as styles} from '../styles/styles'

class Quiz extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {deckId} = navigation.state.params
        // no way to get the title by the id because of the static method :-(
        return {
            title: 'Quiz'
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

    updateNotification() {
        clearLocalNotification()
            .then(setLocalNotification)
    }

    restart() {
        this.setState({questionIndex: 0,correctAnswers: 0,showAnswer: false})
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
            // 'move' notification to next day when at least one quiz was finished
            this.updateNotification()
            Alert.alert(
                'Quiz finished', `${correctAnswers} correct answers (${Math.round(correctAnswers / deck.questions.length * 100)}%)`,
                [{text: 'OK', onPress: goBack},
                 {text: 'Restart', onPress: () => {this.restart()}}],
                {cancelable: true, onDismiss: goBack}
            )
        }

        if (terminateQuiz) {
            return (<View style={styles.view}/>)
        } else {
            const question = deck.questions[questionIndex]
            return (
                <View style={styles.view}>
                    <View style={[styles.rowView, {marginTop: 10}]}>
                        <Text style={styles.textSmall}>Card {questionIndex + 1}/{deck.questions.length}</Text>
                        <Text style={styles.textSmall}>{correctAnswers} correct answers ({Math.round(correctAnswers / deck.questions.length * 100)}%)</Text>
                    </View>
                    <View style={styles.viewCenter}>
                        <Animated.Text style={[styles.text, {transform: [{scale: bounceValue}]}]}>
                            {showAnswer ? question.answer : question.question}</Animated.Text>
                        </View>
                    <View style={styles.viewBottom}>
                        <TouchableOpacity style={[styles.btn,{marginBottom: 60}]} onPress={() => {this.toggleQuestion()}}>
                            <Text style={styles.btnText}>Show {showAnswer ? 'question' : 'answer'}</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, {marginBottom: 10, backgroundColor: green}]} onPress={() => {this.correct()}}>
                            <Text style={styles.btnText}>Correct</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, {marginBottom: 60, backgroundColor: red}]} onPress={() => {this.incorrect()}}>
                            <Text style={styles.btnText}>Incorrect</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, {marginBottom: 30}]} onPress={goBack}>
                            <Text style={styles.btnText}>Back</Text></TouchableOpacity>
                    </View>
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