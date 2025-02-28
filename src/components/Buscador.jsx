import { InputAdornment, OutlinedInput, FormControlLabel, Checkbox } from '@mui/material'
import { MagnifyingGlassPlus, Trash } from '@phosphor-icons/react'
import React from 'react'



export default function Buscador({ pokeName, setPokename, handleErase, handleFilter, searchById, setSearchById }) {
    
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <OutlinedInput
                    placeholder={searchById ? "Buscar por ID" : "Buscar por nombre"}
                    size="small"
                    sx={{ color: "white" }}
                    onChange={(e) => setPokename(e.target.value.toLowerCase())}
                    value={pokeName}
                    type={searchById ? "number" : "text"}
                    endAdornment={
                        <InputAdornment position="start">
                            {pokeName !== "" && (
                                <Trash
                                    onClick={handleErase}
                                    className="cursor-pointer"
                                    size={20}
                                    color="orange"
                                    weight="duotone"
                                />
                            )}
                        </InputAdornment>
                    }
                />

                <MagnifyingGlassPlus
                    onClick={handleFilter}
                    size={35}
                    color="white"
                    weight="duotone"
                    className="cursor-pointer"
                />
            </div>

            <div className="flex gap-4">
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={!searchById}
                            onChange={() => setSearchById(false)}
                            color="primary"
                        />
                    }
                    label="Buscar por nombre"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={searchById}
                            onChange={() => setSearchById(true)}
                            color="primary"
                        />
                    }
                    label="Buscar por ID"
                />
            </div>
        </div>
    )
}
