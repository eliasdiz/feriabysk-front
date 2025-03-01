import { CardMedia, Typography } from '@mui/material'
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
import MostratBusqueda from './MostrarBusqueda'
import poke404 from '../assets/sticker-png-pikachu-crying-pokemon-pikachu-thumbnail.png'

const { getTodos } = pokemonActions



export default function DashBoard() {

    const dispatch = useDispatch()
    const pokemonsGuardados = useSelector(store => store.pokemons.pokemons)
    const [pokeName, setPokename] = useState('')
    const [searchById, setSearchById] = useState(false)
    const [ open, setOpen ] = useState(false)
    const [ pokemon, setPokemon ] = useState(null)
    const [ filtrados, setFiltrados ] = useState([])


    console.log(filtrados)

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
                    dispatch(getTodos())
                    setPokemon(res.data.pokemon)
                    setOpen(true)
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

    const filtroGuardados = (busqueda, pokemons) => {
        busqueda = busqueda.toLowerCase();
        let filtro = pokemons.filter(pokemon => 
            pokemon.nombre.toLowerCase().includes(busqueda) || 
            pokemon.id.toString().includes(busqueda) 
        );
    
        setFiltrados(filtro);
    };

    const handleErase = () => {
        setPokename('')
        setFiltrados([])
    }

    useEffect(
        () => {
            filtroGuardados(pokeName,pokemonsGuardados)
        },
        [pokeName,pokemonsGuardados]
    )

    useEffect(() => {
        dispatch(getTodos())
    }, [dispatch])

    return (
        <div className='h-[100vh] w-[100vw] flex flex-col gap-4 items-center justify-center'>

            <Typography className='uppercase font-black text-center' fontSize={30} color='white'>
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
                        pokemonsGuardados.length > 0 && pokeName === '' ?
                            pokemonsGuardados?.map(pokemon => (
                                <div key={pokemon.id} className='p-2'>
                                    <CardPokemon pokemon={pokemon} />
                                </div>
                            ))
                            :
                            filtrados?.length > 0 && pokeName !== '' ?
                                filtrados.map(pokemon => (
                                    <div key={pokemon.id} className='p-2'>
                                        <CardPokemon pokemon={pokemon} />
                                    </div>
                                ))
                            :
                            <>
                                <div className='flex flex-col items-center justify-center text-center'>
                                    <CardMedia
                                        className="object-contain h-[100%] w-[50%]"
                                        component={'img'}
                                        image={poke404}
                                        alt={pokemon?.nombre}
                                        sx={{
                                            width: 300,
                                            height: 150,
                                            objectFit: "contain",
                                            backgroundColor: 'transparent'
                                        }}
                                    />
                                        <Typography color='white' fontSize={20}>
                                            lo siento no encontramos tu pokemon
                                        </Typography>
                                </div>
                            </>
                    }
                </Slider>
            </div>
            <MostratBusqueda pokemon={pokemon} open={open} setOpen={setOpen} />
            <Toaster />
        </div>
    )
}
