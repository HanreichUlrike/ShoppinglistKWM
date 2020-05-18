<?php

use Illuminate\Database\Seeder;

class ArticlesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $article = new \App\Article;
       $article->term = 'Brot';
       $article->save();

        $article2 = new \App\Article;
        $article2->term = 'Käse';
        $article2->save();

        $article3 = new \App\Article;
        $article3->term = 'Eier';
        $article3->save();

    }
}
