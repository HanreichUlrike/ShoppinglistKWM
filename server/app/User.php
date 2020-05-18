<?php

namespace App;

use App\Http\Middleware\Authenticate;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements  JWTSubject
{
    use Notifiable;


    /** ---- auth JWT ---- */
    /**
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * @return array
     */

    /** Hilfesuchender oder Freiwilliger ??*/

    public function getJWTCustomClaims()
    {
        return ['user' => ['id' => $this->id], 'seeker' => ['seeker' => strval($this->seeker)],'helper' => ['helper' => strval($this->helper)] ];
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'firstname', 'lastname', 'email', 'password', 'address', 'helper', 'seeker'
    ];


    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    /*one user can have many shoppinglists*/

    public function shoppinglists():HasMany{
        return $this->hasMany(Shoppinglist::class);
    }
}
