import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import styled from 'styled-components/native'
import {connect} from 'react-redux'
import {reloadDecks} from '../actions'
import {addOrUpdateDeck} from "../store/localdb";

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

class AddDeck extends React.Component {
    render() {
        // use for validation
        const {existingDeckIds} = this.props
        const {goBack} = this.props
        return (
            <CenterView>
                <CustomText>Add Deck</CustomText>
                <Text>Existing Id's</Text>
                {existingDeckIds.map((deckId) => (
                    <Text key={deckId}>{deckId}</Text>
                ))}
                <CustomButton onPress={goBack}><CustomText>Back</CustomText></CustomButton>
            </CenterView>
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
        addOrUpdateDeck: () => dispatch(addOrUpdateDeck()),
        goBack: () => props.navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)