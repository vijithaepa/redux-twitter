import { saveLikeToggle } from "../utils/api";

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'

export const receiveTweets = (tweets) => {
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
}

// Action creator
const toggleTweet = ({id, authedUser, hasLiked}) => {
    return {
        type: TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked
    }
}

// asynchronous action creator
export const handleToggleTweet = (info) => {
    return (dispatch) => {
        dispatch(toggleTweet(info))

        return saveLikeToggle(info)
            .catch((e) => {
                console.warn("Error in handle toggle tweet")
                dispatch(toggleTweet(info))
                alert('There was an error toggle tweet, try again')
            })
    }
}

