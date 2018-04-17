import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from "../../src/reducers"

const middlewares = [];

if (process.env.NODE_ENV !== `production`) {
  const {logger} = require(`redux-logger`);
  middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer);

export {
  store
}
