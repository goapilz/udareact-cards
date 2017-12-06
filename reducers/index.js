import {ADD_OR_UPDATE_DECK, DELETE_DECK, SET_DECKS} from '../actions'


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

function decks(state = {}, action) {
    switch (action.type) {
        case SET_DECKS :
            return {
                ...state,
                ...action.decks,
            }
        case ADD_OR_UPDATE_DECK :
            return {
                ...state,
                [action.deckName]: action.deck
            }
        case DELETE_DECK : {
            const {deckName} = action
            const newState = {...state}
            newState[deckName] = undefined
            delete newState[deckName]
            return newState
        }
        default :
            return state
    }
}

export default decks