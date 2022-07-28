import {LAYOUTS} from "./constant"

export interface DEFAULT_STATE_INTERFACE {
    currentLayout: LAYOUTS
}

const defaultState: DEFAULT_STATE_INTERFACE = {
    currentLayout: LAYOUTS.COMMENT
}

export default defaultState