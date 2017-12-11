import {StyleSheet} from 'react-native'
import {gray, orange, white, lightGray} from '../constants/colors'

export const deckStyles = StyleSheet.create({
    deckOverview: {
        flex: 1,
        margin: 0,
        backgroundColor: white
    },
    deck: {
        height: 90,
        marginLeft: 8,
        marginRight: 8,
        marginTop: 8,
        backgroundColor: lightGray,
        borderColor: gray,
        borderWidth: 1
    },
    deckText: {
        fontSize: 30,
        marginLeft: 8,
        color: white,
        textShadowOffset: {width: 2, height: 2}
    },
    questionCountText: {
        fontSize: 20,
        margin: 8,
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
    viewTop: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    viewCenter: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    viewBottom: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-end'
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    input: {
        height: 40,
        width: '100%',
        fontSize: 20,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        height: 40,
        backgroundColor: gray,
        borderRadius: 5
    },
    btnText: {
        fontSize: 20,
        color: white
    },
    text: {
        fontSize: 30,
        textAlign: 'center'
    },
    textSmall: {
        fontSize: 12,
        marginLeft: 4,
        marginRight: 4,
    }
})