import { CardMedia, Typography } from '@mui/material'
import React from 'react'

export default function CardPokemon({pokemon}) {

    return (
        <>
            <div
                className="w-full  flex flex-col justify-center items-center gap-1 bg-gray-400 rounded-md p-2 shadow-2xs"
            >
                <Typography fontSize={20} className='capitalize text-center'>
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
                        ID: <b>{pokemon?.id}</b>
                    </Typography>
                    
                    <Typography fontSize={15} className='capitalize'>
                        tipo: <b>{pokemon?.tipo?.join(' , ')}</b>
                    </Typography>

                    <Typography fontSize={15} className='capitalize'>
                        ataque: <b>{pokemon?.ataque}</b>
                    </Typography>

                    <Typography fontSize={15} className='capitalize'>
                        ataque especial: <b>{pokemon?.ataqueEspecial}</b>
                    </Typography>

                    <Typography fontSize={15} className='capitalize'>
                        defensa: <b>{pokemon?.defensa}</b>
                    </Typography>

                    <Typography fontSize={15} className='capitalize'>
                        defensa especial: <b>{pokemon?.defensaEspecial}</b>
                    </Typography>

                    <Typography fontSize={15} className='capitalize'>
                        velocidad: <b>{pokemon?.velocidad}</b>
                    </Typography>
                </div>

            </div>
        </>
    )
}
