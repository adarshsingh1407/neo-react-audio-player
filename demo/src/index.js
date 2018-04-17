import React, {Component} from 'react'
import {render} from 'react-dom'

import {Welcome, AudioPlayer} from '../../src'

class Demo extends Component {
  render() {
    return <div>
      <h1>neo-react-audio-player Demo</h1>
      <Welcome/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
