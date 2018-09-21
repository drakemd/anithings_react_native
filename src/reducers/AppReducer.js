import { combineReducers } from 'redux'
import { navigationReducer as nav } from './NavigationReducer'
import { apiReducer as api, pageReducer as page } from './ApiReducer';
import { animeDetailReducer as anime } from './AnimeDetailReducer';

const AppReducer = combineReducers({
    nav,
    api,
    page,
    anime
});
  
export default AppReducer;