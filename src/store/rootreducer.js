import { combineReducers } from 'redux' ;
import firstreducer from './reducer/firstreducer' ;
import formulaselectreducer from './reducer/formulaselectreducer';

export default combineReducers({
    firstreducer,
    formulaselectreducer
}) ;
