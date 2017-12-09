import {ADD_OR_UPDATE_DECK, DELETE_DECK, SET_DECKS} from '../actions'

function decks(state = [], action) {
    switch (action.type) {
        case SET_DECKS :
            return {
                ...state,
                ...action.decks
            }
        case ADD_OR_UPDATE_DECK :
            return {
                ...state,
                [action.deckId]: action.deck
            }
        case DELETE_DECK : {
            const {deckId} = action
            const newState = {...state}
            newState[deckId] = undefined
            delete newState[deckId]
            return newState
        }
        default :
            return state
    }
}

export default decks