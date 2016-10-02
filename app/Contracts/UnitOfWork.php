<?php
/**
 * Created by PhpStorm.
 * User: hc
 * Date: 02/10/16
 * Time: 02:09
 */

namespace App\Contracts;


interface UnitOfWork
{
    /**
     * @return mixed
     */
    public function begin();

    /**
     * @return mixed
     */
    public function commit();

    /**
     * @return mixed
     */
    public function rollback();
}