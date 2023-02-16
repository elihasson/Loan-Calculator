<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Basic;

Route::post('/mortgage-plan', [Basic::class, 'calculateMortgagePlan']);

