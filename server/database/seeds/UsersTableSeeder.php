<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new App\User;
        $user->id = 1;
        $user->firstname = 'Susi';
        $user->lastname = 'Hilfe';
        $user->email = 'test@gmail.com';
        $user->password = bcrypt('secret');
        $user->address = " ";
        $user->role = 0;

        $user->save();

        $user2 = new App\User;
        $user2->id = 2;
        $user2->firstname = 'Hansi';
        $user2->lastname = 'Freiwillig';
        $user2->email = 'test2@gmail.com';
        $user2->password = bcrypt('secret2');
        $user2->address = " ";
        $user2->role = 1;

        $user2->save();
    }
}
