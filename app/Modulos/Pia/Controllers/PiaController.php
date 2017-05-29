<?php

namespace App\Modulos\Pia\Controllers;

use App\Modulos\Crianca\Models\Crianca;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Modulos\Pia\Models\Pia;
use App\Modulos\Pia\Contracts\PiaServiceInterface;


class PiaController extends Controller
{
    /**
     * PiaController constructor.
     */
    public function __construct()
    {
    }

    /**
     * @param Crianca $crianca
     * @return mixed
     */
    public function pia(Crianca $crianca){
        return $crianca->pia;
    }
}
