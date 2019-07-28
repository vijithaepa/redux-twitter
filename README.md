# Tweeter Project

This repo is a code-along with the first project in the [React Nanodegree program](https://www.udacity.com/course/react-nanodegree--nd019).

Most of the commits in this repository correspond to videos in the program.

## Project Setup

* clone the Project - ``
* install the dependencies - `npm install`

## Notes:
- All middleware follows this currying pattern:
```
    const logger = (store) => (next) => (action) => {
       // ...
      }
      
    The variable logger is assigned to a function that takes the store as its 
    argument. That function returns another function, which is passed next 
    (which is the next middleware in line or the dispatch function). That other 
    function return another function which is passed an action. Once inside 
    that third function, we have access to store, next, and action.
    
    It’s important to note that the value of the next parameter will be 
    determined by the applyMiddleware function. Why? All middleware will be 
    called in the order it is listed in that function. In our case, the next 
    will be dispatch because logger is the last middleware listed in that function.

    This is the source code for the thunk middleware :
    function createThunkMiddleware(extraArgument) {
      return ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }
        return next(action);
      };
    }
````
- Connect function is looks like this:
```
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
```
- mapStateToProps and mapDispatchToProps are :
```
mapStateToProps - If this argument is specified, the new component will subscribe 
    to Redux store updates. This means that any time the store is updated, mapStateToProps 
    will be called. The results of mapStateToProps must be a plain object, which will 
    be merged into the component’s props. If you don't want to subscribe to store updates, 
    pass null or undefined in place of mapStateToProps.
mapDispatchToProps - If an object is passed, each function inside it is assumed to be a 
    Redux action creator. An object with the same function names, but with every action creator 
    wrapped into a dispatch call so they may be invoked directly, will be merged into the 
    component’s props. If a function is passed, it will be given dispatch as the first parameter. 
    It’s up to you to return an object that somehow uses dispatch to bind action creators in 
    your own way. (Tip: you may use the bindActionCreators() helper from Redux.)
```
- The important thing to notice here is that mapStateToProps accepts two arguments:

      The state of the store
      The props passed to the Tweet component
## License

MIT
