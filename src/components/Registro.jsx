import { Button, OutlinedInput, Paper, Typography } from '@mui/material'
import { ArrowCircleRight, At, LockKey, LockKeyOpen } from '@phosphor-icons/react'
import axios from 'axios'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { urlHost } from '../urlHost'

export default function Registro() {

    const navigate = useNavigate()
    const [ mostratCLave, setMostrarClave ] = useState(false)
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleClave = () => setMostrarClave(!mostratCLave)

    const handleLogin = () => {
        let data = {
            email: email,
            password: password
        }    
        console.log(data)
        const promesa = axios.post(`${urlHost}aut/crear`,data)
        toast.promise(
            promesa,
            {
                loading: 'creando usuario...',
                success: (res) => {
                    localStorage.setItem('token',res.data.token)
                    setTimeout(() => {
                        navigate('/')
                    }, 2000);
                    return <>{res.data.message}</>
                },
                error: (error) => {
                    return <>{error?.response.data.message}</>
                }
            },{style:{backgroundColor: '#CBD5E0', textTransform:'capitalize', textAlign:'center'}}
        )
    }

    return (
        <>
            <Paper 
                className='h-[50%] w-[50%] flex flex-col items-center justify-center gap-4 rounded-md p-3 bg-gray-500'
                sx={{backgroundColor: '#6B7280'}}
                elevation={4}
            >

                <Typography fontSize={20} color='white' className='uppercase'>
                    formulario de registro
                </Typography>

                <div className='w-[90%] flex flex-col items-center justify-center gap-4'>

                    <OutlinedInput
                        fullWidth
                        placeholder='Email'
                        variant='outlined'
                        size='small'
                        sx={{
                            color: 'white',
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'gray'
                            }
                        }}
                        endAdornment={<At size={32} color="white" />}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <OutlinedInput
                        fullWidth
                        type={mostratCLave ? 'text' : 'password'}
                        placeholder='Password'
                        variant='outlined'
                        size='small'
                        sx={{
                            color: 'white',
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'gray'
                            }
                        }}
                        endAdornment={
                            mostratCLave ? 
                                <LockKeyOpen className='cursor-pointer' onClick={handleClave} size={32} color="white" /> 
                                : 
                                <LockKey className='cursor-pointer' onClick={handleClave} size={32} color="white" />
                        }
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        variant='contained'
                        className='gap-2'
                        fullWidth
                        onClick={handleLogin}
                    >
                        registrarse 
                        <ArrowCircleRight size={20} weight='bold' />
                    </Button>
                </div>
            </Paper>
        <Toaster />
        </>
    )
}
