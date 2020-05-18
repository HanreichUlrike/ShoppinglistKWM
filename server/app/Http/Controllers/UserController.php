<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{

    public function index(){

        $users = User::get();
        return $users;
    }


    public function findByID(string $id):User{
        $user = User::where('id', intval($id))->first();
        return $user;
    }
}


