<?php

namespace Orpha\Infrastructure\Data\Repositories;

use Orpha\Support\Repositories\UnitOfWorkContract;

class UnitOfWork implements UnitOfWorkContract
{
    private $inTransaction = false;
    private $runningTransactions = 0;
    
    /**
     * @return $this
     */
    public function begin()
    {
        if($this->runningTransactions > 0){
            return $this;
        }
        // nothing to do, will not start nested transaction
        $this->inTransaction = true;
        $this->runningTransactions++;
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
        $this->runningTransactions--;
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
        $this->runningTransactions--;
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