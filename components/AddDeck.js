import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import styled from 'styled-components/native'

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

export default class AddDeck extends React.Component {
    render() {
        return (
            <CenterView>
                <CustomText>Welcome</CustomText>
                <CustomButton onPress={() => (alert('adding deck'))}><CustomText>Add Deck</CustomText></CustomButton>
            </CenterView>
        )
    }
}