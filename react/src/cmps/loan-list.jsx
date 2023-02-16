import React from 'react'
import { useStateContext } from '../context/ContextProvider'


export default function LoanList() {

  const { loan, setLoan } = useStateContext()

  if (!loan) {
    return (
      <div className='message'> Please specify a loan to display </div>
    )
  }
  return (
    <div className='loan-list'>
      <table className='loan-specs'>
        <thead>
          <tr>
            <td>Loan</td>
            <td>Months</td>
            <td>Monthly Payment</td>
            <td>Future Value</td>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>{loan[0]?.loan_amount}</td>
            <td>{loan[0]?.period}</td>
            <td>{loan[0]?.monthly_payment.toFixed(2)}</td>
            <td>{loan[0]?.future_value.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <table className='payment-table'>
        <thead>
          <tr>
            <td>Month</td>
            <td>Payment</td>
            <td>Interest</td>
            <td>Principal</td>
            <td>Balance</td>
          </tr>
        </thead>
        <tbody>
          {loan[0]?.table_data?.map(row =>
            <tr key={row.month}>
              <td>{row.month}</td>
              <td>{row.payment.toFixed(2)}</td>
              <td>{row.interest.toFixed(2)}</td>
              <td>{row.principal.toFixed(2)}</td>
              <td>{row.balance.toFixed(2)}</td>
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}


