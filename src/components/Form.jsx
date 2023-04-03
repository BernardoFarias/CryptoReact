import styled from "@emotion/styled"
import Error from "./Error"
import useSelectCurrency from "../hooks/useSelectCurrency"
import { currencies } from "../data/currencies"
import { useEffect, useState } from "react"

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    padding: 10px;
    color: #FFF ;
    text-transform: uppercase;
    width: 100%;
    font-weight: 700;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease ;
    margin-top: 30px ;

    &:hover{
        background-color: #7A7DFE ;
        cursor: pointer ;
    }

`



const Form = ({setCurrencies}) => {

    const [cryptos, setCryptos] = useState([])
    const [error, setError] = useState(false)

    const [ currency, SelectCurrency ] = useSelectCurrency("Select Your Currency" , currencies)
    const [ crypto, SelectCrypto ] = useSelectCurrency("Select Cryptocurrency", cryptos)

    useEffect(() => {
        const consultAPI = async () => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`
            const response = await fetch(url)
            const result = await response.json()

            const arrayCryptos = result.Data.map(crypto => {

                const object = {
                    id: crypto.CoinInfo.Name,
                    name: crypto.CoinInfo.FullName
                }
                return object
            })

            setCryptos(arrayCryptos)

        }
        consultAPI()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if([currency, crypto].includes("")){
            setError(true)
            return ;
        }
        setError(false)
        setCurrencies({
            currency,
            crypto
        })
    }

    return (
        <>
            {error && <Error>All the fields are mandatory</Error>}
            <form
                onSubmit={handleSubmit}
                >
                <SelectCurrency />
                <SelectCrypto />
                <InputSubmit 
                    type="submit" 
                    value="Search Price" 
                />
            </form>
        </>
    )
}

export default Form