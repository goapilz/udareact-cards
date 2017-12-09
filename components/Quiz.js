import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import styled from 'styled-components/native'
import {connect} from 'react-redux'
import {reloadDecks} from '../actions'

const CenterView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background: #aaa;
`

const CustomText = styled.Text`
    color: white;
    font-size: 20;
`

const CustomButton = styled.TouchableOpacity`
    width: 100px;
    height: 50px;
    background: red;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
`

class Quiz extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {deckId} = navigation.state.params
        // no way to get the title by the id because of the static method :-(
        return {
            title: `Quiz`
        }
    }

    render() {
        const {deck} = this.props
        const {goBack} = this.props
        return (
            <CenterView>
                <CustomText>{deck.title} Quiz</CustomText>
                <CustomButton onPress={goBack}><CustomText>Back</CustomText></CustomButton>
            </CenterView>
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
        reloadDecks: () => dispatch(reloadDecks()),
        goBack: () => props.navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)