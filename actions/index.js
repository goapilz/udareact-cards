import * as db from '../store/localdb'

export const SET_DECKS = 'SET_DECKS'
export const ADD_OR_UPDATE_DECK = 'ADD_OR_UPDATE_DECK'
export const DELETE_DECK = 'DELETE_DECK'

export function _setDecks(decks) {
    return {
        type: SET_DECKS,
        decks
    }
}

export function _addOrUpdateDeck(deckId, deck) {
    return {
        type: ADD_OR_UPDATE_DECK,
        deckId,
        deck
    }
}

export function _deleteDeck(deckId) {
    return {
        type: DELETE_DECK,
        deckId
    }
}

export const reloadDecks = () => dispatch => (
    db.readDecks().then((data) => {
        dispatch(_setDecks(data))
    })
)

export const addOrUpdateDeck = (deckId, deck) => dispatch => (
    db.addOrUpdateDeck(deckId, deck).then((data) => {
        dispatch(_addOrUpdateDeck(deckId, deck))
    })
)

export const deleteDeck = (deckId) => dispatch => (
    db.deleteDeck(deckId).then((data) => {
        dispatch(_deleteDeck(deckId))
    })
)
