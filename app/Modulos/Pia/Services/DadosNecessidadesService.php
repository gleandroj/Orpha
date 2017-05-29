<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/05/2017
 * Time: 14:35
 */

namespace App\Modulos\Pia\Services;


use App\Modulos\Crianca\Contracts\CriancaServiceInterface;
use App\Modulos\Pia\Contracts\DadosNecessidadesRepositoryInterface;
use App\Modulos\Pia\Contracts\DadosNecessidadesServiceInterface;
use App\Modulos\Pia\Models\DadosNecessidades;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;
use Exception;

class DadosNecessidadesService implements DadosNecessidadesServiceInterface
{
    /**
     * @var DadosNecessidadesRepositoryInterface
     */
    private $dadosNecessidadesRepository;
    /**
     * @var CriancaServiceInterface
     */
    private $criancaService;

    /**
     * DadosNecessidadesService constructor.
     * @param DadosNecessidadesRepositoryInterface $dadosNecessidadesRepository
     * @param CriancaServiceInterface $criancaService
     */
    public function __construct(DadosNecessidadesRepositoryInterface $dadosNecessidadesRepository, CriancaServiceInterface $criancaService)
    {
        $this->dadosNecessidadesRepository = $dadosNecessidadesRepository;
        $this->criancaService = $criancaService;
    }

    /**
     * @return User|\Illuminate\Contracts\Auth\Authenticatable
     */
    protected function getCurrentUser(){
        return Auth::user();
    }

    /**
     * @param $id
     * @param array $data
     * @return DadosNecessidades|\Illuminate\Database\Eloquent\Model
     * @throws Exception
     */
    public function update($criancaId, array $data)
    {
        $data = collect($data);
        $update_key = $data->get('key');
        $update_data = $data->filter(function($value, $key) use ($update_key){
            return str_contains($key, $update_key);
        });

        $crianca = $this->criancaService->getById($criancaId);
        $dadosNecessidades = $crianca->pia->dadosNecessidades;
        $update_data->put($update_key.'_completado', true);

        if($update_key == 'religiosidade') $update_data->put('completado', true);

        if(!$dadosNecessidades = $this->dadosNecessidadesRepository->update($dadosNecessidades->id, $update_data->all())) throw new Exception(trans('messages.MSG4'));
        return $dadosNecessidades->fresh();
    }
}