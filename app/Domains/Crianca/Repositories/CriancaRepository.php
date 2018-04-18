<?php

namespace Orpha\Domains\Crianca\Repositories;

use Orpha\Support\Repositories\RepositoryContract;
use Orpha\Domains\Crianca\Models\Crianca;

interface CriancaRepository extends RepositoryContract
{
    /**
     *  Return sum of criancas by category (Active and Inactive)
     * @return array
     */
    public function getCountActiveAndInactiveCriancas();

    /**
     * Return sum of criancas by age
     * @return mixed
     */
    public function getCountByAge();
}