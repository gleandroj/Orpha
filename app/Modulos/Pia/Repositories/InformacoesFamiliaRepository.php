<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/05/2017
 * Time: 13:16
 */

namespace App\Modulos\Pia\Repositories;


use App\Contracts\UnitOfWorkInterface;
use App\Modulos\Pia\Contracts\InformacoesFamiliaRepositoryInterface;
use App\Repositories\AbstractRepository;
use App\Modulos\Pia\Models\InformacoesFamilia;

class InformacoesFamiliaRepository extends AbstractRepository implements InformacoesFamiliaRepositoryInterface
{
    /**
     * InformacoesFamiliaRepository constructor.
     * @param InformacoesFamilia $model
     * @param UnitOfWorkInterface $uow
     */
    public function __construct(InformacoesFamilia $model, UnitOfWorkInterface $uow)
    {
        parent::__construct($model, $uow);
    }
}