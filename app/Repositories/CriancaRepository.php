<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 18/10/2016
 * Time: 13:42
 */

namespace App\Repositories;

use App\Crianca;

class CriancaRepository extends AbstractRepository implements \App\Contracts\CriancaRepository
{

    public function __construct(Crianca $model, UnitOfWork $uow)
    {
        parent::__construct($model, $uow);
    }

}