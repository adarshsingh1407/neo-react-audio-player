import {connect} from 'react-redux';
import {
  mapDispatchToAudioPlayerProps,
  mapStateToAudioPlayerProps
} from '../../../src/util/redux'
import AudioPlayerTester from './AudioPlayerTester'

const AudioPlayerTesterContainer = connect(mapStateToAudioPlayerProps, mapDispatchToAudioPlayerProps)(AudioPlayerTester)

export default AudioPlayerTesterContainer
