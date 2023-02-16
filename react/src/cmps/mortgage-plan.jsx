import React, { useRef } from 'react'
import axiosClient from '../axios-client'
import { useStateContext } from '../context/ContextProvider'

export default function MortgagePlan() {

    const amountRef = useRef()
    const interestRef = useRef()
    const periodRef = useRef()
    const typeRef = useRef()

    const { setLoan } = useStateContext()

    const onSubmit = (ev) => {
        ev.preventDefault()
        if (!(amountRef.current.value > 0) ||
            !(interestRef.current.value > 0) ||
            !(periodRef.current.value > 0) ) 
        {
            setLoan(null)
            return
        }

        const postData = {
            amount: amountRef.current.value,
            interest: interestRef.current.value,
            period: periodRef.current.value,
            type: typeRef.current.value
        }

        axiosClient.post('/mortgage-plan', postData)
            .then(({ data }) => {
                console.log(data)
                setLoan(data)
            })
    }

    return (
        <section className='mortgage-plan'>
            <div className="plan-container">
                <form className='plan-edit-form' onSubmit={onSubmit}>
                    <input ref={amountRef} type="number" min="0" className="amount" placeholder='Amount ($)' />
                    <input ref={interestRef} type="number" step='0.01' min="0" max="100" className="interest" placeholder='Interest (%)' />
                    <input ref={periodRef} type="number" step='0.5' min="0" max="50" className="period" placeholder='Period (years)' />
                    <select ref={typeRef} placeholder='.. select Loan Type'>
                        <option value="spitzer">Spitzer</option>
                        <option value="balloon">Balloon</option>
                    </select>
                    <button className='btn'>Calculate</button>
                </form>
            </div>
        </section >
    )
}
