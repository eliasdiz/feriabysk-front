import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CardPokemon from './CardPokemon'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Buscador from './Buscador'
import { useDispatch, useSelector } from 'react-redux'
import pokemonActions from '../Store/Pokemons/actions'
import axios from 'axios'
import { urlHost } from '../urlHost'
import toast, { Toaster } from 'react-hot-toast'

const { getTodos } = pokemonActions



export default function DashBoard() {

    const dispatch = useDispatch()
    const pokemonsGuardados = useSelector(store => store.pokemons.pokemons)

    const [pokeName, setPokename] = useState('')
    const [searchById, setSearchById] = useState(false)


    const handleFilter = () => {
        const token = localStorage.getItem('token')
        const headers = { headers: { Authorization: `Bearer ${token}` } }
        const isNumber = !isNaN(pokeName) && pokeName.trim() !== ''
        const endPoint = searchById || isNumber ? `${urlHost}pokemon/${pokeName}` : `${urlHost}pokemon/nombre?nombre=${pokeName}`
        
        const promesa = axios.get(endPoint,headers)
        toast.promise(
            promesa,
            {
                loading: 'buscando pokemon',
                success: (res) => {
                    return <>{res.data.message}</>
                },
                error: (error) => {
                    if(error.status === 401){
                        return <>no tienes permisos para esta operacion</>
                    }else{
                        return <>{error.response.data.message}</>
                    }
                }
            },{style:{backgroundColor: '#CBD5E0', textTransform:'capitalize', textAlign:'center'}}
        )
    }

    const handleErase = () => {
        setPokename('')
    }

    useEffect(() => {
        dispatch(getTodos())
    }, [dispatch])

    return (
        <div className='h-[100vh] w-[100vw] flex flex-col gap-4 items-center justify-center'>

            <Typography className='uppercase font-black text-center' fontSize={30}>
                debo atraparlos a todos!!!
            </Typography>

            <Buscador 
                pokeName={pokeName}
                setPokename={setPokename}
                handleFilter={handleFilter}
                handleErase={handleErase}
                searchById={searchById}
                setSearchById={setSearchById}
            />
            
            <div className='w-[80%]'>
                <Slider 
                    dots={false}
                    infinite={false}
                    slidesToShow={4}
                    speed={500}
                >
                    {
                        pokemonsGuardados.length > 0 &&
                            pokemonsGuardados.map(pokemon => (
                                <div key={pokemon.id} className='p-2'>
                                    <CardPokemon pokemon={pokemon} />
                                </div>
                            ))
                    }
                </Slider>
            </div>
            <Toaster />
        </div>
    )
}
