import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import TweetPage from "./TweetPage";

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <div>
                <LoadingBar/>
                {this.props.loading === true
                    ? null
                    : <TweetPage match={{params: {id: '6h5ims9iks66d4m7kqizmv'}}}/>}
            </div>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        loading: authedUser === null
    }
}

export default connect(mapStateToProps)(App)
