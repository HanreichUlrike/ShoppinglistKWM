<?php

use Illuminate\Database\Seeder;


class ShoppinglistsTableSeeder extends Seeder
{
    /*
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        /*DB::table('shoppinglists')->insert([
            'list_id' => 2,
            'seeker_id' => 1,
            'until' => new DateTime("2020-04-29"),
            'helper_id' => NULL,
            'price' => NULL,
            'comments' => "Noch eine schöne Liste",
            'created_at' => date ("Y-m-d H:i:s"),
            'updated_at' => date ("Y-m-d H:i:s")
        ]);*/
        
       $shoppinglist = new \App\Shoppinglist;
       $shoppinglist->until = new DateTime ();
       $shoppinglist->price = Null;
       $shoppinglist->comments = "Meine erste Einkaufsliste";

        /*seeker = owner/creator of the list*/
        $seeker = App\User::all()->first();
        $shoppinglist->seeker()->associate($seeker);

        $shoppinglist->save();

        $articles = App\Article::all()->pluck('id');
        $shoppinglist->articles()->sync($articles);
        $shoppinglist->save();


    }
}
