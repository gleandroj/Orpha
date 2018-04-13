<?php

namespace Orpha\Infrastructure\Data\Repositories;

use Orpha\Domains\Crianca\Models\Crianca;
use Orpha\Support\Repositories\UnitOfWorkContract;
use Orpha\Domains\Crianca\Repositories\CriancaRepository as CriancaRepositoryInterface;

class CriancaRepository extends AbstractRepository implements CriancaRepositoryInterface
{
    /**
     * CriancaRepository constructor.
     * @param Crianca $model
     * @param UnitOfWorkContract $uow
     */
    public function __construct(Crianca $model, UnitOfWorkContract $uow)
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