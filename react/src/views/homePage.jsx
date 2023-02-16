import React, { useEffect } from 'react'
import Header from '../cmps/header.jsx'
import LoanList from '../cmps/loan-list.jsx'
import MortgagePlan from '../cmps/mortgage-plan.jsx'
import { useStateContext } from '../context/ContextProvider.jsx'

export default function HomePage() {
  
  const { setLoan } = useStateContext()
  
  useEffect(() => {
    setLoan(null)
  }, [])

  return (
    <div className='homepage main-layout'>
        <Header/>
        <MortgagePlan/>
        <LoanList/>
    </div>
  )
}
