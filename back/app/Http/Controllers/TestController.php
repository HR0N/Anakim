<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    function index(){
        return view('welcome');
    }
    public function index2(){
        return 'Это значит что я могу передавать данные из Laravel в React по защищенным каналам! o.O)__,,!.';
    }
    public function test1(){
        return 'Test 0.1';
    }
    public function test2(){
        return 'Test 0.2';
    }
}
