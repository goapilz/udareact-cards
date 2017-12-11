import {StyleSheet} from 'react-native'
import {gray, orange, white} from '../constants/colors'

export const deckStyles = StyleSheet.create({
    deckOverview: {
        flex: 1,
        margin: 0,
        backgroundColor: white
    },
    deck: {
        height: 100,
        margin: '2%',
        backgroundColor: lightGray,
        borderColor: gray,
        borderWidth: 1
    },
    deckText: {
        fontSize: 30,
        padding: 10,
        paddingTop: 0,
        color: white,
        textShadowOffset: {width: 2, height: 2}
    },
    questionCountText: {
        fontSize: 20,
        padding: 10,
        color: orange,
        textShadowOffset: {width: 2, height: 2}
    }
})

export const defaultStyles = StyleSheet.create({
    view: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    rowView: {
        flexDirection: 'row', 
        alignItems: 'stretch', 
        justifyContent: 'center'
    },
    input: {
        height: 40,
        width: '100%',
        margin: 10,
        marginTop: 40,
        fontSize: 20
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        backgroundColor: gray,
        borderRadius: 5
    },
    btnDetailedViewAndQuizView: {
        // no flex !
        height: 50,
    },
    btnText: {
        fontSize: 20,
        color: white
    },
    text: {
        fontSize: 30,
        margin: 10
    },
    textSmall: {
        fontSize: 12,
        margin: 10
    }
})