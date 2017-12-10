import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {connect} from 'react-redux'
import {deleteDeck} from '../actions'
import {gray, white, red, green} from '../constants/colors'

const styles = StyleSheet.create({
    view: {
        flex: 1,
        marginRight: 30,
        marginLeft: 30,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        height: 50,
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
        fontSize: 20
    }
})

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
                    <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start'}}>
                        <Text style={[styles.text, {marginTop: 30}]}>{deck.title} has {deck.questions.length} cards</Text>
                        <TouchableOpacity style={[styles.btn, {marginTop: 30}]} onPress={() => this.navigateAddCard(deckId)}>
                            <Text style={styles.btnText}>Add Card</Text></TouchableOpacity>
                    </View>
                    <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                        <TouchableOpacity style={[styles.btn, {height:100, backgroundColor: green}]} onPress={() => this.navigateQuiz(deckId)}>
                            <Text style={styles.btnText}>Start Quiz</Text></TouchableOpacity>
                    </View>
                    <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-end'}}>
                        <TouchableOpacity style={[styles.btn, {backgroundColor: red}]} onPress={() => this.deleteDeck(deckId)}>
                            <Text style={styles.btnText}>Delete Deck</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, {marginTop: 60}]} onPress={goBack}>
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