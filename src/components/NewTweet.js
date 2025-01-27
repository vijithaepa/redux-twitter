import React, { Component } from 'react'
import { connect } from "react-redux";
import { handleAddTweet } from "../actions/tweets";
import {Redirect} from 'react-router-dom'

class NewTweet extends Component {

    state = {
        text: '',
        toHome: false
    }

    handleChange = (e) => {
        const text = e.target.value
        this.setState(() => ({
            text
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {text} = this.state
        const {dispatch, id} = this.props
        dispatch(handleAddTweet(text, id))

        this.setState(() => ({
            text: '',
            toHome: id ? false: true
        }))

    }

    render() {
        const {text, toHome} = this.state
        const tweetLeft = 280 - text.length

        //TODO: Redirect to the Home view, if submitted
        if(toHome) {
            return <Redirect to='/'/>
        }


        return (
            <div>
                <h3 className='center'> Compose a new Tweet</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <textarea placeholder='Whats happening'
                              value={text}
                              onChange={this.handleChange}
                              className='textarea'
                              maxLength={280}
                    />
                    {tweetLeft <= 100 && (
                        <div className='tweet-length'>
                            {tweetLeft} Characters left
                        </div>
                    )}
                    <button className='btn'
                            type='submit'
                            disabled={text === ''}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

// passing state as 1st parameter
// Passing parameter to store is the 2nd parameter


export default connect()(NewTweet)
