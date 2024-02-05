import * as React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import thunkMiddleware from "redux-thunk"
import { createStore, applyMiddleware } from "redux"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from "./Containers/Home/Home"
import reducers from "./store/reducers/index"
import { RecipeDetails } from "./components/RecipeDetails"

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

const container = document.getElementById("home")
const root = createRoot(container) // Create a root.

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  </Provider>
)

root.render(<App />)
