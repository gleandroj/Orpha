<?php
/**
 * Created by PhpStorm.
 * User: hc
 * Date: 02/10/16
 * Time: 02:09
 */

namespace App\Repositories;


class UnitOfWork implements \App\Contracts\UnitOfWork
{
    private $inTransaction = false;

    private static $runningTransactions = 0;

    /**
     * @return $this
     */
    public function begin()
    {
        if(static::$runningTransactions > 0){
            return $this;
        }
        // nothing to do, will not start nested transaction

        $this->inTransaction = true;
        static::$runningTransactions++;
        \DB::beginTransaction();

        return $this;
    }

    /**
     * @return $this
     */
    public function commit()
    {
        if(!$this->inTransaction){
            return $this;
        }

        \DB::commit();
        $this->inTransaction = false;
        static::$runningTransactions--;

        return $this;
    }

    /**
     * @return $this
     */
    public function rollback()
    {
        if(!$this->inTransaction){
            return $this;
        }

        \DB::rollBack();
        $this->inTransaction = false;
        static::$runningTransactions--;

        return $this;
    }

    /**
     *
     */
    function __destruct()
    {
        // rollback if not committed
        if($this->inTransaction){
            $this->rollback();
        }
    }
}