<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 07/03/2017
 * Time: 09:04
 */

namespace App\Modulos\Orpha\Traits;



use App\Modulos\Orpha\Models\Orfanato;
use App\Modulos\Orpha\Scopes\OrfanatoScope;

trait OrfanatoQuery
{
    /**
     * Boot the soft deleting trait for a model.
     *
     * @return void
     */
    public static function bootOrfanatoQuery()
    {
        static::addGlobalScope(new OrfanatoScope());
    }

    /**
     * @return Orfanato
     */
    public function orfanato()
    {
        return $this->belongsTo(Orfanato::class);
    }

    /**
     * Get the name of the column for applying the scope.
     *
     * @return string
     */
    public function getOrfanatoColumn()
    {
        return defined('static::ORFANATO_COLUMN') ? static::ORFANATO_COLUMN : 'orfanato_id';
    }

    /**
     * Get the fully qualified column name for applying the scope.
     *
     * @return string
     */
    public function getQualifiedOrfanatoColumn()
    {
        return $this->getTable().'.'.$this->getOrfanatoColumn();
    }
}