<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/05/2017
 * Time: 14:35
 */

namespace App\Modulos\Pia\Services;


use App\Modulos\Crianca\Contracts\CriancaServiceInterface;
use App\Modulos\Crianca\Models\Crianca;
use App\Modulos\Pia\Contracts\InformacoesFamiliaRepositoryInterface;
use App\Modulos\Pia\Contracts\InformacoesFamiliaServiceInterface;
use App\Modulos\Pia\Models\InformacoesFamilia;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;
use Exception;

class InformacoesFamiliaService implements InformacoesFamiliaServiceInterface
{
    /**
     * @var InformacoesFamiliaRepositoryInterface
     */
    private $informacoesFamiliaRepository;
    /**
     * @var CriancaServiceInterface
     */
    private $criancaService;

    /**
     * InformacoesFamiliaService constructor.
     * @param InformacoesFamiliaRepositoryInterface $informacoesFamiliaRepository
     * @param CriancaServiceInterface $criancaService
     */
    public function __construct(InformacoesFamiliaRepositoryInterface $informacoesFamiliaRepository, CriancaServiceInterface $criancaService)
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

        if($update_key == 'religiosidade') $update_data->put('completado', true);

        if(!$informacoesFamilia = $this->informacoesFamiliaRepository->update($informacoesFamilia->id, $update_data->all())) throw new Exception(trans('messages.MSG4'));
        return $informacoesFamilia->fresh();
    }
}