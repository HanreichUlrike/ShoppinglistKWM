<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;




class Article extends Model
{

    protected $fillable = ['id', 'term', 'max_price', 'unit'];


    /*one specific article has many relations to different shoppinglists*/

    public function shoppinglists(): BelongsToMany{
        return $this->belongsToMany(Shoppinglist::class)->withPivot('max_price', 'unit')->withTimestamps();
    }



}



