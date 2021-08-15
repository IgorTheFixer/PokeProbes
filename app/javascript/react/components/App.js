import React from 'react'
import { BrowserRouter, Route, Switch} from "react-router-dom"

import PokemonIndex from "./PokemonIndex"
import PokemonShow from "./PokemonShow"

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/animals/:id" component={PokemonShow}/>
        <Route path="/" component={PokemonIndex}/>
      </Switch>
    </BrowserRouter>
  )
}
export default App
