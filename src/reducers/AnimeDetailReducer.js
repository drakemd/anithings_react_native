const initialState = { current: null }
export function animeDetailReducer(state = initialState, action){
    //console.log(action.detail)
    switch(action.type){
        case 'SET_CURRENT_ANIME':
            return {...state, current: action.current}
        default:
            return state
    }
}

export function setCurrentAnime(current){
    return {
        type: 'SET_CURRENT_ANIME',
        current: current
    }
}