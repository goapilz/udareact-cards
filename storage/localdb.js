import {AsyncStorage} from 'react-native'

export const DATA_STORAGE_KEY = 'UdaciCards:data'

const initialDecks = {
    React: {
        title: 'React',
            questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
            questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}

export function readDecks() {
    return AsyncStorage.getItem(DATA_STORAGE_KEY).then((data) => {
        if (!data) {
            data = initialDecks
            AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data))
        }
        return data
    })
}

export function addOrUpdateDeck(deckName, deck) {
    return AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify({
        [deckName]: deck
    }))
}

export function deleteDeck(deckName) {
    return AsyncStorage.getItem(DATA_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[deckName] = undefined
            delete data[deckName]
            AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data))
        })
}