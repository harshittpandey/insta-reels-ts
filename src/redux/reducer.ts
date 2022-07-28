import { combineReducers } from 'redux'
import { LAYOUTS } from './constant'

interface ReelLayoutReducer {
    type: String
    value: LAYOUTS
}

function currentLayout (state: LAYOUTS = LAYOUTS.DEFAULT, action: ReelLayoutReducer) {
    switch (action.type) {
        case 'UPDATE_LAYOUT':
            return state = action.value
        default:
            return state
    }
}

const rootReducer = combineReducers({
    currentLayout
});

export default rootReducer;