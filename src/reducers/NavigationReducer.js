import { NavigationActions } from 'react-navigation'
import { RootNavigator } from './../components/NavigatorComponent'

const defaultAction = RootNavigator.router.getActionForPathAndParams('Home')
const defaultNavState = RootNavigator.router.getStateForAction(defaultAction)

//reducer
export function navigationReducer(state = defaultNavState, action){
    let nextState
    switch(action.type) {
        case 'Home':
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Home' }),
                state
            );
        break;
        case 'Detail':
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Detail', params: { title: 'hahaha' } }),
                state
            );
        break;
        default:
            nextState = RootNavigator.router.getStateForAction(
                action,
                state
            )
        break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}

export function pushDetailScreen(){
    return { type: 'Detail' }
}