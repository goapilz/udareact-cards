# UdaciCards

Quiz Cards Game (Project for the UdaCity react-native course)

A simple game where the user can create decks with unlimited questions and answers.
The Quiz can be started per deck.
All data is saved in the local database (AsyncStorage) of the phone. Inside the app all data is managed by redux.


* install:
    - `npm install`
    - `(startEmu.bat to start the pre-created android simulator named 'Nexus_5X_API_23')`
    - `npm start`

* command for creating a new project:
    - `npm install -g create-react-native-app`
    - `(npm install --save babel-preset-react-native@2.1.0)`

* build:
    - `npm install -g exp`
    - `exp build:ios / exp build:android`
    - `exp build:status`