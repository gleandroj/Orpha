<?php

namespace Orpha\Domains\Pia\Services;

use Orpha\Domains\Crianca\Contracts\CriancaServiceContract;
use Orpha\Domains\Crianca\Models\Crianca;
use Orpha\Domains\Pia\Repositories\InformacoesFamiliaRepository;
use Orpha\Domains\Pia\Contracts\InformacoesFamiliaServiceContract;
use Orpha\Domains\Pia\Models\InformacoesFamilia;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;
use Exception;

class InformacoesFamiliaService implements InformacoesFamiliaServiceContract
{
    /**
     * @var InformacoesFamiliaRepository
     */
    private $informacoesFamiliaRepository;
    
    /**
     * @var CriancaServiceContract
     */
    private $criancaService;

    /**
     * InformacoesFamiliaService constructor.
     * @param InformacoesFamiliaRepository $informacoesFamiliaRepository
     * @param CriancaServiceContract $criancaService
     */
    public function __construct(InformacoesFamiliaRepository $informacoesFamiliaRepository, CriancaServiceContract $criancaService)
    {
        $this->informacoesFamiliaRepository = $informacoesFamiliaRepository;
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

        if($crianca->pia->informacoesFamilia == null)
            return $crianca->pia->informacoesFamilia()->create([]);
        else
            return $crianca->pia->informacoesFamilia;
    }

    /**
     * @param $criancaId
     * @param array $data
     * @return InformacoesFamilia|\Illuminate\Database\Eloquent\Model
     * @throws Exception
     */
    public function update($criancaId, array $data)
    {
        $data = collect($data);
        $update_key = $data->get('key');
        $update_data = $data->filter(function($value, $key) use ($update_key){
            return str_contains($key, $update_key);
        });

        $informacoesFamilia = $this->getByCriancaId($criancaId);
        $update_data->put($update_key.'_completado', true);

        if($update_key == 'rede_apoio2') $update_data->put('completado', true);

        if(!$informacoesFamilia = $this->informacoesFamiliaRepository->update($informacoesFamilia->id, $update_data->all())) throw new Exception(trans('messages.MSG4'));
        return $informacoesFamilia->fresh();
    }
}