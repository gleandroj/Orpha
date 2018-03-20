<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 18/10/2016
 * Time: 13:38
 */

namespace App\Modulos\Crianca\Contracts;

use App\Contracts\RepositoryInterface;

interface CriancaRepositoryInterface extends RepositoryInterface
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