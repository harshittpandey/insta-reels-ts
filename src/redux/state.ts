import User from "model/type/User"
import {LAYOUTS} from "./constant"

export interface DEFAULT_STATE_INTERFACE {
    currentLayout: LAYOUTS
    currentUser: User | null
}

const defaultState: DEFAULT_STATE_INTERFACE = {
    currentLayout: LAYOUTS.COMMENT,
    currentUser: null
}

export default defaultState