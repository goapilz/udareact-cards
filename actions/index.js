import * as db from '/storage/localdb'

export const SET_DECKS = 'SET_DECKS'
export const ADD_OR_UPDATE_DECK = 'ADD_OR_UPDATE_DECK'
export const DELETE_DECK = 'DELETE_DECK'

export const ADD_QUESTION = 'ADD_QUESTION'

// {
//     React: {
//         title: 'React',
//             questions: [
//             {
//                 question: 'What is React?',
//                 answer: 'A library for managing user interfaces'
//             },
//             {
//                 question: 'Where do you make Ajax requests in React?',
//                 answer: 'The componentDidMount lifecycle event'
//             }
//         ]
//     },
//     JavaScript: {
//         title: 'JavaScript',
//             questions: [
//             {
//                 question: 'What is a closure?',
//                 answer: 'The combination of a function and the lexical environment within which that function was declared.'
//             }
//         ]
//     }
// }

export function setDecks(decks) {
    return {
        type: SET_DECKS,
        decks
    }
}

export function addOrUpdateDeck(deckName, deck) {
    return {
        type: ADD_OR_UPDATE_DECK,
        deckName,
        deck
    }
}

export function deleteDeck(deckName) {
    return {
        type: DELETE_DECK,
        deckName
    }
}

export function addQuestion(questionData) {
    return {
        type: ADD_QUESTION,
        questionData
    }
}

export const reloadDecks = () => dispatch => (
    db.readDecks().then((data) => {
        dispatch(setDecks({data}))
    })
)

export const addorUpdateDeck = (deckName, deck) => dispatch => (
    db.addOrUpdateDeck(deck, deckName).then((data) => {
        dispatch(addOrUpdateDeck(deckName, deck))
    })
)

export const deleteDeck = (deckName) => dispatch => (
    db.deleteDeck(deckName).then((data) => {
        dispatch(deleteDeck(deckName))
    })
)
