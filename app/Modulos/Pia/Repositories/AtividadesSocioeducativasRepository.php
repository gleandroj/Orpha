<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/05/2017
 * Time: 13:16
 */

namespace App\Modulos\Pia\Repositories;


use App\Contracts\UnitOfWorkInterface;
use App\Modulos\Pia\Contracts\AtividadesSocioeducativasRepositoryInterface;
use App\Repositories\AbstractRepository;
use App\Modulos\Pia\Models\AtividadesSocioeducativas;

class AtividadesSocioeducativasRepository extends AbstractRepository implements AtividadesSocioeducativasRepositoryInterface
{
    /**
     * AtividadesSocioeducativasRepository constructor.
     * @param AtividadesSocioeducativas $model
     * @param UnitOfWorkInterface $uow
     */
    public function __construct(AtividadesSocioeducativas $model, UnitOfWorkInterface $uow)
    {
        parent::__construct($model, $uow);
    }
}