<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 07/03/2017
 * Time: 09:03
 */

namespace App\Modulos\Orpha\Scopes;

use App\Modulos\User\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;

class OrfanatoScope implements Scope
{
    /**
     * All of the extensions to be added to the builder.
     *
     * @var array
     */
    protected $extensions = ['WithoutOrfanato'];

    /**
     * Current User
     *
     * @var User
     */
    protected $user;

    /**
     * double try to get Auth::user because for unknown reason doesn't always work
     *
     * ShopScope constructor.
     */
    public function __construct()
    {
        $this->user = Auth::user();
    }

    /**
     * Apply the scope to a given Eloquent query builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder $builder
     * @param  \Illuminate\Database\Eloquent\Model $model
     * @return void
     */
    public function apply(Builder $builder, Model $model)
    {
        $user = $this->user ?: Auth::user();
        if($user != null)
            $builder->where($model->getQualifiedOrfanatoColumn(), '=', $user->orfanato_id);
    }

    /**
     * Extend the query builder with the needed functions.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @return void
     */
    public function extend(Builder $builder)
    {
        foreach ($this->extensions as $extension) {
            $this->{"add{$extension}"}($builder);
        }
    }

    /**
     * Add the WithoutOrfanato extension to the builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @return void
     */
    protected function addWithoutOrfanato(Builder $builder)
    {
        $builder->macro('withoutOrfanato', function (Builder $builder) {
            return $builder->withoutGlobalScope($this);
        });
    }


}