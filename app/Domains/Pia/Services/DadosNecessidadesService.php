<?php

namespace Orpha\Domains\Pia\Services;

use Orpha\Domains\Crianca\Contracts\CriancaServiceContract;
use Orpha\Domains\Crianca\Models\Crianca;
use Orpha\Domains\Pia\Repositories\DadosNecessidadesRepository;
use Orpha\Domains\Pia\Contracts\DadosNecessidadesServiceContract;
use Orpha\Domains\Pia\Models\DadosNecessidades;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;
use Exception;

class DadosNecessidadesService implements DadosNecessidadesServiceContract
{
    /**
     * @var DadosNecessidadesRepository
     */
    private $dadosNecessidadesRepository;
    /**
     * @var CriancaServiceContract
     */
    private $criancaService;

    /**
     * DadosNecessidadesService constructor.
     * @param DadosNecessidadesRepository $dadosNecessidadesRepository
     * @param CriancaServiceContract $criancaService
     */
    public function __construct(DadosNecessidadesRepository $dadosNecessidadesRepository, CriancaServiceContract $criancaService)
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
     * @param $criancaId
     * @return \Illuminate\Database\Eloquent\Model
     * @throws ModelNotFoundException
     */
    public function getByCriancaId($criancaId)
    {
        if(!$crianca = $this->criancaService->getById($criancaId)) throw (new ModelNotFoundException())->setModel(Crianca::class);

        if($crianca->pia->dadosNecessidades == null)
            return $crianca->pia->dadosNecessidades()->create([]);
        else
            return $crianca->pia->dadosNecessidades;
    }

    /**
     * @param $criancaId
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

        $dadosNecessidades = $this->getByCriancaId($criancaId);
        $update_data->put($update_key.'_completado', true);

        if($update_key == 'religiosidade') $update_data->put('completado', true);

        if(!$dadosNecessidades = $this->dadosNecessidadesRepository->update($dadosNecessidades->id, $update_data->all())) throw new Exception(trans('messages.MSG4'));
        return $dadosNecessidades->fresh();
    }
}