import styled from "@emotion/styled"
import { useState } from "react"

const Label = styled.label`
    color: #Fff ;
    display: block ;
    font-family: "Lato", sans-serif ;
    font-size: 24px ;
    font-weight: 700 ;
    margin: 15px 0 ;
`

const Select = styled.select`
    font-size: 18px;
    width: 100% ;
    padding: 14px  ;
    border-radius: 10px ;
`


const useSelectCurrency = (label , options) => {

    const [ state, setState] = useState("")

    const SelectCurrency = () => (
        <>
            <Label> {label}</Label>
            <Select
                value={state}
                onChange={ e => setState(e.target.value)}
                >
                <option value="">Select Currency</option>

                { options.map( option => (
                    <option
                        key={option.id}
                        value={option.id}
                    >
                        {option.name}
                    </option>
                ))}
            </Select>
        </>
    )

    return [ state ,SelectCurrency ]
}

export default useSelectCurrency