<?php
namespace App\Http\Controllers;
define("SPITZER", "spitzer");

use Illuminate\Http\Request;

class Basic extends Controller
{
    
    function calculateMortgagePlan(Request $request)
    {
        $principal = $request->amount; // initial investment amount
        $interest_rate = $request->interest / 100; // interest rate as decimal
        $years = $request->period; // investment period in years
        $loan_type = $request->type; // spitzer or balloon

        $json_table = $this->generateLoanTableByType($principal, $years, $interest_rate, $loan_type);

        return response()->json([
            $json_table
        ]);
    }

    function generateLoanTableByType($loan_amount, $years, $interest_rate, $loan_type)
    {
        $table_data = array();

        $months = $years * 12;
        $monthly_interest_rate = $interest_rate / 12;
        $balance = $loan_amount;
        $monthly_payment = $this->getMonthlyPaymentByType($loan_type, $loan_amount,$monthly_interest_rate, $months, $balance);
        $future_value = $this->getFutureValueByType($loan_type, $monthly_payment, $months, $balance);

        for ($i = 1; $i <= $months; $i++) {
            $interest = $balance * $monthly_interest_rate;

            if ($loan_type == SPITZER) {
                $principal_payment = $monthly_payment - $interest;
            } else { 
                //balloon - all principal is in the last payment
                $principal_payment = ($i == $months) ? $balance : 0;
                $monthly_payment = $monthly_payment + $principal_payment;
            }

            $balance = $balance - $principal_payment;

            $table_data[] = array(
                'month' => $i,
                'payment' => $monthly_payment,
                'interest' => $interest,
                'principal' => $principal_payment,
                'balance' => $balance
            );
        }

        $json_object = array(
            'loan_amount' => $loan_amount,
            'monthly_payment' => $monthly_payment,
            'period' => $months,
            'future_value' => $future_value,
            'table_data' => $table_data
        );

        return $json_object;
    }

    function getMonthlyPaymentByType ($loan_type, $loan_amount,$monthly_interest_rate, $months, $balance) {
        if ($loan_type == SPITZER) {
            return ($loan_amount * $monthly_interest_rate) / (1 - pow(1 + $monthly_interest_rate, -$months));
        } else { 
            //balloon
            return $balance * $monthly_interest_rate;
        }       
    }

    function getFutureValueByType($loan_type, $monthly_payment, $months, $balance) {
        if ($loan_type == SPITZER) {
            return $monthly_payment * $months;
        } else { 
            //balloon
            return $monthly_payment * $months + $balance;
        }       

    }
}