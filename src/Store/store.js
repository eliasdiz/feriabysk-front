import { configureStore } from "@reduxjs/toolkit";
import pokemons from './Pokemons/reducer'


export const store = configureStore({
    reducer: {
        pokemons: pokemons
    }
})