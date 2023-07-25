import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseURL } from '../constants/baseURL'


export default function useRequestData(estadoInicial, path, headers) {

    const [dados, setDados] = useState(estadoInicial)
    const [erro, setErro] = useState('')

    const receberDados = () =>{
        axios.get(`${baseURL}${path}`, headers)
        .then((resposta) => {
            setDados(resposta.data)
        })
        .catch((erro) => {
            setErro(erro.response)
        })
    }
    
    useEffect(() => {
        receberDados()
    }, [path])

    return [dados, receberDados, erro]
}