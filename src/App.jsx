import { useEffect, useState } from 'react'
import styled from "@emotion/styled"
import ImageCrypto from "./imagen-criptos.png"
import Form from './components/Form'
import Result from './components/Result'
import Spinner from './components/Spinner'


const Container = styled.div`
  max-width: 900px ;
  margin: 0 auto ;
  width: 90% ;
  @media (min-width: 992px) {
    display: grid ;
    grid-template-columns: repeat(2, 1fr) ;
    column-gap: 2rem ;
  }
  `

const Image = styled.img`
  max-width: 400px ;
  margin: 100px auto 0 auto ;
  width: 80% ;
  display: block ;
  ` 

const Heading = styled.h1`
  font-family : "Lato", sans-serif ;
  color: white ;
  text-align: center;
  font-weight: 700;
  margin-bottom: 50px;
  margin-top: 80px;
  font-size: 34px;

  &::after{
    content: "" ;
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
  `

function App() {

  const [currencies, setCurrencies] = useState({})
  const [ result, setResult ] = useState({}) 
  const [ loading, setLoading ] = useState(false) 

  useEffect(() => {
    if(Object.keys(currencies).length > 0){
      const askPrice = async () => {
        setLoading(true)
        setResult({})
        const { currency , crypto } = currencies
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${currency}`
        const response = await fetch(url)
        const result = await response.json()

        setResult(result.DISPLAY[crypto][currency])
        setLoading(false)
      }
        askPrice()
    }
  }, [currencies])

  return (
    <Container>
      <Image 
      src={ImageCrypto} 
      alt="image cryptocurrencies" 
      />
      <div>
      <Heading>Live Cryptocurrency Prices</Heading>
      <Form 
        setCurrencies={setCurrencies}
      />

      {loading && <Spinner/>}
      { result.PRICE && <Result result={result}/>}
      
      </div>
      
    </Container>
    
  )
}

export default App
