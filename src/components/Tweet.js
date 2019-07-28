import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate, formatTweet } from "../utils/helpers";
import { TiArrowBackOutline, TiHeartFullOutline, TiHeartOutline } from 'react-icons/ti'

class Tweet extends Component {

    handleLike = (e) => {
        e.preventDefault()
    }

    toParent = (e, id) => {
        e.preventDefault()
        // Redirect to parent tweet
    }

    render() {
        const {tweet} = this.props
        if (tweet === null)
            return <p> This tweet doesn't exists</p>

        const {
            name, avatar, timestamp, text, hasLiked, likes, replies, parent
        } = tweet

        return (
            <div className='tweet'>
                <img
                    src={avatar}
                    alt={`Avatar of ${avatar}`}
                    className='avatar'/>
                <div className='tweet-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button className='reploying-to' onClick={(e) => this.toParent(e, parent.id)}>
                                Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>
                    <div className='tweet-icons'>
                        <TiArrowBackOutline className='tweet-icon'/>
                        <span>{replies !== 0 && replies}</span>
                        <button className='heart-button' onClick={(e) => this.handleLike}>
                            {hasLiked === true
                                ? <TiHeartFullOutline color='#e0245e' className='tweet-icon'/>
                                : <TiHeartOutline className='tweet-icon'/>}
                        </button>
                        <span>{likes !== 0 && likes}</span>
                    </div>
                </div>
            </div>
        )
    }
}

// passing state as 1st parameter
// Passing parameter to store is the 2nd parameter
function mapStateToProps({tweets, users, authedUser}, {id}) {
    const tweet = tweets[id]
    const prentTweet = tweet ? tweets[tweet.replyingTo] : null
    return {
        authedUser,
        tweet: tweet
            ? formatTweet(tweet, users[tweet.author], authedUser, prentTweet)
            : null
    }
}

export default connect(mapStateToProps)(Tweet)
