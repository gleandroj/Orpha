<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 18/10/2016
 * Time: 13:42
 */

namespace App\Modulos\Crianca\Repositories;

use App\Contracts\UnitOfWorkInterface;
use App\Modulos\Crianca\Models\Crianca;
use App\Repositories\AbstractRepository;
use App\Modulos\Crianca\Contracts\CriancaRepositoryInterface;

class CriancaRepository extends AbstractRepository implements CriancaRepositoryInterface
{

    /**
     * CriancaRepository constructor.
     * @param Crianca $model
     * @param UnitOfWorkInterface $uow
     */
    public function __construct(Crianca $model, UnitOfWorkInterface $uow)
    {
        parent::__construct($model, $uow);
    }

    /**
     *  Return sum of criancas by category (Active and Inactive)
     * @return array
     */
    public function getCountActiveAndInactiveCriancas()
    {
        return ['ativos' => $this->model->count(), 'inativos' => $this->model->onlyTrashed()->count()];
    }

    /**
     * Return sum of criancas by age
     * @return mixed
     */
    public function getCountByAge()
    {
        $criancas = collect($this->getAll())->sortBy(function ($crianca){
            return $crianca->idade;
        });
        $idades = $criancas->pluck('idade')->unique();

        $series = collect([]);$j = 0;

        $data = collect([]);

        for ($i = 0 ; $i < round(($idades->max() / 4), 0, PHP_ROUND_HALF_DOWN ) ; $i++){
            $min = ($i+$j);
            $max = ($i+($j+=4));
            $data->offsetSet($min.' a '.$max, $criancas->filter(function($value) use($min, $max){
                return $value['idade'] >= $min && $value['idade'] <= $max;
            })->count());
        }

        return $data->filter(function ($count){
            return $count >= 0;
        });
    }
}