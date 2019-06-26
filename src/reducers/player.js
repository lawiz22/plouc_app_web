import * as typeP from "../config/action-types/player";

const initialState_A = {
  isAudioBufferSuccess : false,
  requestingAudioBuffer: false,
  audioBuffer: null,
  audioContext: "",
  audioBufferError : "",
  showWaveform : false,
};

export default function player_state(state = initialState_A, action = {}) {
  switch (action.type) {
    case typeP.LOAD_AUDIO_BUFFER_REQUEST: 
      return { 
        ...state,
        requestingAudioBuffer: true,
        audioBufferError: ""
      };
    case typeP.LOAD_AUDIO_BUFFER_SUCCESS: 
      return { 
        ...state,
        isAudioBufferSuccess: true,
        audioBuffer: action.data.audioBuffer,
        requestingAudioBuffer: false,
      };

      case typeP.FLUSH_AUDIO_BUFFER_SUCCESS: 
      return { 
        ...state,
        isAudioBufferSuccess: false,
        audioBuffer: null,
        requestingAudioBuffer: false,
      };  

      case typeP.LOAD_AUDIO_CONTEXT_SUCCESS: 
      return { 
        ...state,
    
        audioContext: action.data.audioContext,
    
      };  
      case typeP.SHOW_AUDIO_WAVEFORM_SUCCESS: // When a Login success action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        showWaveform: action.data.showWaveform,
        
      };   
    case typeP.LOAD_AUDIO_BUFFER_FAILED: 
      return { 
        ...state,
        requestingAudioBuffer: false,
        audioBufferError: action.data.error
      };
    default:
      return state;
  }
}
