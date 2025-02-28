import React, { useState } from 'react'
import { Button, OutlinedInput, Paper, Typography } from '@mui/material'
import { ArrowCircleRight, At, LockKey, LockKeyOpen } from '@phosphor-icons/react' 

export default function Login() {

    const [ mostratCLave, setMostrarClave ] = useState(false)

    const handleClave = () => setMostrarClave(!mostratCLave)

    console.log(mostratCLave)

    return (
        <>
            <Paper 
                className='flex flex-col items-center justify-center gap-3 rounded-md p-3 bg-gray-500'
                sx={{backgroundColor: '#6B7280'}}
                elevation={4}
            >
                <Typography fontSize={20} color='white' className='uppercase'>
                    inicio de sesion
                </Typography>

                <OutlinedInput
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
                />

                <OutlinedInput
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
                />

                <Button
                    variant='contained'
                    className='gap-2'
                    fullWidth
                >
                    entrar 
                    <ArrowCircleRight size={20} weight='bold' />
                </Button>
            </Paper>
        </>
    )
}
