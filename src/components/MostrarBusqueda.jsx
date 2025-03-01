import { Dialog } from '@mui/material'
import React from 'react'
import CardPokemon from './CardPokemon'

export default function MostratBusqueda({pokemon,open,setOpen}) {


    const handleOpen = () => setOpen(!open)

    return (
        <>
            <Dialog  
                open={open} 
                onClose={handleOpen} 
                fullWidth
                maxWidth="xs"
            >
                <CardPokemon pokemon={pokemon} />

            </Dialog>
        </>
    )
}
