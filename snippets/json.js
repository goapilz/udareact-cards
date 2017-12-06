const data = {
  'key1': {
    'title': 'title1',
    'data': 'data1'
  },
  'key2': {
    'title': 'title2',
    'data': 'data2'
  }
}
console.log(data)


const key3 = 'key3'
const data2 = {...data, [key3]: {'title': 'title3', 'data': 'data3'}}
console.log(data2)

const keys = Object.keys(data2)
console.log(keys)

const newData = keys.map((key) => {
  return data2[key].data
})
console.log(newData)

const emptyObject = {} // or new Object()
const newData2 = keys.reduce((mainObject, key) => {
  mainObject[key] = data2[key].data
  return mainObject
}, emptyObject)
console.log(newData2)


const data3 = {...data2}
delete data3['key3']
console.log(data3)


