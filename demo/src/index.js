import React, {Component} from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import {store} from './store'
import {Welcome, AudioPlayer} from '../../src'
import AudioPlayerContainer from './components/AudioPlayerContainer'
import AudioPlayerTesterContainer from './components/AudioPlayerTesterContainer'

class Demo extends Component {
  render() {
    console.log('store', store);
    return (<Provider store={store}>
      <div>
        <h1>neo-react-audio-player Demo</h1>
        <Welcome/>
        <AudioPlayerContainer />
        <AudioPlayerTesterContainer />
      </div>
    </Provider>)
  }
}

render(<Demo/>, document.querySelector('#demo'))
