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
    return AsyncStorage.getItem(DATA_STORAGE_KEY)
        .then((results) => {
            let data = JSON.parse(results)
            if (!data) {
                console.log('init with dummy data')
                data = initialDecks
                const tempJSONString = JSON.stringify(data)
                AsyncStorage.setItem(DATA_STORAGE_KEY, tempJSONString)
            }
            return data
        })
}

export function addOrUpdateDeck(deckId, deck) {
    return AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify({
        [deckId]: deck
    }))
}

export function deleteDeck(deckId) {
    return AsyncStorage.getItem(DATA_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[deckId] = undefined
            delete data[deckId]
            const tempJSONString = JSON.stringify(data)
            AsyncStorage.setItem(DATA_STORAGE_KEY, tempJSONString)
            return data
        })
}