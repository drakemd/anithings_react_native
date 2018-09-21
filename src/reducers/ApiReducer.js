const initialState = { repos: [], loading: true }
export function apiReducer(state = initialState, action){
    switch(action.type){
        case 'GET_ANIME':
            return { ...state, loading: true }
        case 'GET_ANIME_SUCCESS':
            //console.log(action.payload.data.data)
            return { ...state, 
                loading: false, 
                repos: [...state.repos, ...action.payload.data.data] }
        case 'GET_ANIME_FAIL':
            return {
              ...state,
              loading: false,
              error: 'Error while fetching repositories'
            };
        default:
            return state;
    }
}

export function pageReducer(state = 0, action){
    switch(action.type){
        case 'NEXT_PAGE':
            return state += 1
        default:
            return state
    }
}

//action generators
export function getAnime(offset){
    return { 
        type: 'GET_ANIME',
        payload: {
            request:{
                url:`/anime?sort=popularityRank&page[limit]=15&page[offset]=${offset}`
            }
        }
    }
}

export function getNextPage(){
    return {
        type: 'NEXT_PAGE'
    }
}