import User from 'model/type/User'
import { combineReducers } from 'redux'
import { LAYOUTS } from './constant'

interface ReelLayoutReducer {
    type: String
    value: LAYOUTS
}

interface CurrentUserReducer {
    type: String
    value: User
}

function currentLayout (state: LAYOUTS = LAYOUTS.DEFAULT, action: ReelLayoutReducer) {
    switch (action.type) {
        case 'UPDATE_LAYOUT':
            return state = action.value
        default:
            return state
    }
}

function currentUser (state: User | null = null, action: CurrentUserReducer) {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return state = action.value
        default:
            return state
    }
}

const rootReducer = combineReducers({
    currentLayout,
    currentUser
});

export default rootReducer;