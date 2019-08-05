import { saveLikeToggle, saveTweet } from "../utils/api";
import { hideLoading, showLoading } from "react-redux-loading";

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'

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

const addTweet = (tweet) => {
    return {
        type: ADD_TWEET,
        tweet
    }
}

export const handleAddTweet = (text, replyingTo) => {
    return (dispatch, getState) => {
        const {authedUser} = getState()
        dispatch(showLoading())
        return saveTweet({
            text,
            author: authedUser,
            replyingTo
        })
            .then((tweet) => dispatch(addTweet(tweet)))
            .then(() => dispatch(hideLoading()))
    }
}

