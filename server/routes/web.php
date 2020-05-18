<?php

use App\Shoppinglist;

Route::get('/', 'ShoppinglistController@index');
Route::get('/shoppinglists', 'ShoppinglistController@index');
Route::get('/shoppinglists/{shoppinglist}', 'ShoppinglistController@show');
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
/*
Route::get('/', function () {
    return view('welcome');
});
*/

/*Gesamtansicht*/

/*Route::get('/', function () {
    $shoppinglists = DB::table('shoppinglists')->get();
    return view('welcome', compact('shoppinglists'));
});*/

/*Route::get('/shoppinglists', function () {
    $shoppinglists = DB::table('shoppinglists')->get();
    return view('shoppinglists.index', compact('shoppinglists'));
});*/

/*Route::get('/shoppinglists', function () {
    $shoppinglists = Shoppinglist::all();
    return view('shoppinglists.index', compact('shoppinglists'));

});*/

/*Eine bestimmte Liste anzeigen - Wildcards - Url letzte Position*/

/*Route::get('/shoppinglists/{list_id}', function ($list_id) {
    $shoppinglist = DB::table('shoppinglists')->find($list_id);
    return view ('shoppinglists.show', compact('shoppinglist'));
});*/

/*Route::get('/shoppinglists/{list_id}', function ($list_id) {
    $shoppinglist = Shoppinglist::find($list_id);
    return view ('shoppinglists.show', compact('shoppinglist'));
});*/
