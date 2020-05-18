<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticleShoppinglistTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('article_shoppinglist', function (Blueprint $table) {

            $table->integer('article_id')->unsigned()->index();
            $table->foreign('article_id')->references('id')
                ->on('articles')->onDelete('cascade');

            $table->integer('shoppinglist_id')->unsigned()->index();
            $table->foreign('shoppinglist_id')->references('id')
                ->on('shoppinglists')->onDelete('cascade');

            $table->primary(['article_id', 'shoppinglist_id']);

            $table->decimal('max_price')->nullable();
            $table->string('unit')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('article_shoppinglist');
    }
}
