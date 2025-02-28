import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { urlHost } from '../../urlHost'


const getTodos = createAsyncThunk(
    'getTodos',
    async() => {
        const token = localStorage.getItem('token')
        const headers = { headers: { Authorization: `Bearer ${token}` } }
        try {
            let res = await axios.get(`${urlHost}pokemon`, headers)
            // console.log(res)
            return { pokemons: res.data.pokemons }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            return { pokemons: []}
        }
    }
)

const actions = { getTodos}

export default actions