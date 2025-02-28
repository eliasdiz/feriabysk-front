import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

const { getTodos } = actions


const intialState = {
    pokemons: []
}

const reducer = createReducer(
    intialState,
    (builder) => builder
        .addCase(
            getTodos.fulfilled,
            (state,action) => {
                let newState = {
                    ...state,
                    pokemons: action.payload.pokemons
                }
                return newState
            }
        )
)

export default reducer