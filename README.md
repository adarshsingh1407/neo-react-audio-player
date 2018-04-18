# NEO REACT AUDIO PLAYER

### Audio Player Component for React

A React component to integrate audio player in your application

### Important Points

1. It is not just a React wrapper for the html <audio> tag. It is a more comprehensive audio player with internal support for playlist management
2. Supports playing base64 string format
3. Couples with Redux provided by your application. This gives you complete freedom to have any kind(or more than one kind) of UI for the player you want.
4. Supports some overriding options for the player to alter some functionalities of the player
  
### Installation

```
yarn add neo-react-audio-player
```

### Usage Instructions

1. Import `NeoAudioPlayer` and place it inside Provider(Redux) but outside routes

```
import {NeoAudioPlayer} from 'neo-react-audio-player'
...
...
<Provider store={store}>
  ...
  <NeoAudioPlayer options={options} />
  ...
  // Routing
  ...
</Provider>
```

### Prop Options

1. NeoAudioPlayer

| S.NO. | OPTIONS | DEFAULT | DESCRIPTION
| ---: | :--- | :--- | :--- |
| 1 | refreshRate | 1000 | Time in millis when the player stats will update during playback |

### ACTIONS

#### 1. Play Track

```
this.props.play([
{
  id: '1', // Unique ID required in each track
  ...
  title: 'Hey Jude',
  artist: 'The Beatles'
  ...
}])
```

#### 2. Pause Current Track

```
this.props.pause()
```

#### 3. Stop Current Track

```
this.props.stop()
```

### Player State (for UI)

Available as `neoAudioPlayer` from store

| S.NO. | KEY | TYPE | DESCRIPTION
| ---: | :--- | :--- | :--- |
| 1 | state | ENUM['STOPPED', 'PLAYING', 'PAUSED'] | Tells the player's current state |
| 2 | elapsedTime | Number | Elapsed Time in millis(of current track) |
| 3 | totalTime | Number | Total Time in millis(of current track) |
| 4 | track | Array | Current track |
| 5 | activeTrackIndex | Number | Index of current trackItem |
