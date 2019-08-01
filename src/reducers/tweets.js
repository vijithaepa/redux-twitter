import { RECEIVE_TWEETS, TOGGLE_TWEET } from "../actions/tweets";


const tweets = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_TWEETS:
            return {
                ...state,
                ...action.tweets
            }
        case TOGGLE_TWEET:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    likes: action.hasLiked === true
                        ? state[action.id].likes.concat(action.authedUser)
                        : state[action.id].likes.filter((uid) => uid !== action.authedUser)
                },

            }
        default:
            return state
    }
}

// const tweets = {
//     1: {id:'A', name:'B'},
//     2: {id:'C', name:'D'}
// }
//
// const tweet = {
//     2: {id:'C', name:'E'}
// }
//
// console.log('Tweets ', {...tweets, ...tweet })

export default tweets
