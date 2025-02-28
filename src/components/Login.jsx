import React, { useState } from 'react'
import { Button, OutlinedInput, Paper, Typography } from '@mui/material'
import { ArrowCircleRight, At, LockKey, LockKeyOpen } from '@phosphor-icons/react' 
import {urlHost} from '../urlHost.js'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

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
        // console.log(data)
        const promesa = axios.post(`${urlHost}aut/login`,data)
        toast.promise(
            promesa,
            {
                loading: 'iniciando sesion...',
                success: (res) => {
                    localStorage.setItem('token',res.data.token)
                    setTimeout(() => {
                        navigate('/dashboard')
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
                className='h-[50%] w-[40%] flex flex-col items-center justify-center gap-3 rounded-md p-3 bg-gray-500'
                sx={{backgroundColor: '#6B7280'}}
                elevation={4}
            >
                <di className='w-[90%] flex flex-col items-center justify-center gap-3'>

                    <Typography fontSize={25} color='white' className='uppercase'>
                        inicio de sesion
                    </Typography>

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
                        entrar 
                        <ArrowCircleRight size={20} weight='bold' />
                    </Button>

                </di>

                <Typography fontSize={15}>
                    Si no te has registrado haz click 
                    <Link to="/registro" className="font-bold"> Aqui</Link> 👈
                </Typography>
            </Paper>
            <Toaster />
        </>
    )
}
