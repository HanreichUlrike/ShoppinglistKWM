<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Shoppinglist extends Model
{

    protected $fillable = ['id', 'until', 'price', 'comments', 'helper_id', 'user_id'];

    /*one shoppinglist belongs to one user*/

    public function user() : BelongsTo{
        return $this->belongsTo(User::class);
    }

    /*one shoppinglist contains many articles*/

    public function articles() : BelongsToMany{
        return $this->belongsToMany(Article::class)->withPivot('max_price', 'unit')->withTimestamps();
    }

}
