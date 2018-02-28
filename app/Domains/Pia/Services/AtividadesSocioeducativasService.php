<?php

namespace Orpha\Domains\Pia\Services;

use Orpha\Domains\Crianca\Contracts\CriancaServiceContract;
use Orpha\Domains\Crianca\Models\Crianca;
use Orpha\Domains\Pia\Repositories\AtividadesSocioeducativasRepository;
use Orpha\Domains\Pia\Contracts\AtividadesSocioeducativasServiceContract;
use Orpha\Domains\Pia\Models\AtividadesSocioeducativas;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;
use Exception;

class AtividadesSocioeducativasService implements AtividadesSocioeducativasServiceContract
{
    /**
     * @var AtividadesSocioeducativasRepository
     */
    private $atividadesSocioeducativasRepository;
    
    /**
     * @var CriancaServiceContract
     */
    private $criancaService;

    /**
     * AtividadesSocioeducativasService constructor.
     * @param AtividadesSocioeducativasRepository $atividadesSocioeducativasRepository
     * @param CriancaServiceContract $criancaService
     */
    public function __construct(AtividadesSocioeducativasRepository $atividadesSocioeducativasRepository, CriancaServiceContract $criancaService)
    {
        $this->atividadesSocioeducativasRepository = $atividadesSocioeducativasRepository;
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
        if($crianca->pia->atividadesSocioeducativas == null)
            return $crianca->pia->atividadesSocioeducativas()->create([]);
        else
            return $crianca->pia->atividadesSocioeducativas;
    }

    /**
     * @param $criancaId
     * @param array $data
     * @return AtividadesSocioeducativas|\Illuminate\Database\Eloquent\Model
     * @throws Exception
     */
    public function update($criancaId, array $data)
    {
        $data = collect($data);
        $update_key = $data->get('key');
        $update_data = $data->filter(function($value, $key) use ($update_key){
            return str_contains($key, $update_key);
        });

        $atividadesSocioeducativas = $this->getByCriancaId($criancaId);
        $update_data->put($update_key.'_completado', true);

        if($update_key == 'religiosidade') $update_data->put('completado', true);

        if(!$atividadesSocioeducativas = $this->atividadesSocioeducativasRepository->update($atividadesSocioeducativas->id, $update_data->all())) throw new Exception(trans('messages.MSG4'));
        return $atividadesSocioeducativas->fresh();
    }
}