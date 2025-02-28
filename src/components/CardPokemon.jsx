import { CardMedia, Paper, Typography } from '@mui/material'
import React from 'react'

export default function CardPokemon({pokemon}) {

    return (
        <>
            <div
                className="w-[80%] flex flex-col items-center gap-1 bg-gray-400 rounded-md p-2 shadow-2xs"
            >
                <Typography fontSize={20} className='capitalize'>
                    {pokemon?.nombre}
                </Typography>
                
                <CardMedia
                    className="object-contain h-[100%] w-[50%]"
                    component={'img'}
                    image={pokemon?.imagen}
                    alt={pokemon?.nombre}
                    sx={{
                        width: 100,
                        height: 100,
                        objectFit: "contain"
                    }}
                />

                <div className='w-[100%]'>
                    <Typography fontSize={15} className='capitalize'>
                        ID: {pokemon?.id}
                    </Typography>
                    
                    <Typography fontSize={15} className='capitalize'>
                        tipo: {pokemon?.tipo.join(' , ')}
                    </Typography>

                    <Typography fontSize={15} className='capitalize'>
                        ataque: {pokemon?.ataque}
                    </Typography>

                    <Typography fontSize={15} className='capitalize'>
                        ataque especial: {pokemon?.ataqueEspecial}
                    </Typography>

                    <Typography fontSize={15} className='capitalize'>
                        defensa: {pokemon?.defensa}
                    </Typography>

                    <Typography fontSize={15} className='capitalize'>
                        defensa especial: {pokemon?.defensaEspecial}
                    </Typography>

                    <Typography fontSize={15} className='capitalize'>
                        velocidad: {pokemon?.velocidad}
                    </Typography>
                </div>

            </div>
        </>
    )
}
