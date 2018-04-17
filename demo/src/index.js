import React, {Component} from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import {store} from './store'
import {Welcome, AudioPlayer} from '../../src'
import AudioPlayerContainer from '../../src/components/AudioPlayerContainer'
import AudioPlayerTesterContainer from './components/AudioPlayerTesterContainer'

class Demo extends Component {
  render() {
    return (<Provider store={store}>
      <div>
        <h1>React Audio Player</h1>
        <Welcome/>
        <AudioPlayerContainer />
        <AudioPlayerTesterContainer />
      </div>
    </Provider>)
  }
}

render(<Demo/>, document.querySelector('#demo'))
