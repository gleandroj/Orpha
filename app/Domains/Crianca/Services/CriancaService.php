<?php

namespace Orpha\Domains\Crianca\Services;

use Orpha\Domains\Crianca\Models\Crianca;
use Orpha\Domains\Crianca\Repositories\CriancaRepository;
use Orpha\Domains\Crianca\Contracts\CriancaServiceContract;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;

class CriancaService implements CriancaServiceContract
{
    /**
     * @var CriancaRepository
     */
    private $criancaRepository;

    /**
     * CriancaSerivce constructor.
     * @param CriancaRepository $criancaRepository
     * @internal param UserService $userService
     */
    public function __construct(CriancaRepository $criancaRepository)
    {
        $this->criancaRepository = $criancaRepository;
    }

    /**
     * @return User|\Illuminate\Contracts\Auth\Authenticatable
     */
    protected function getCurrentUser(){
        return Auth::user();
    }

    /**
     * @return Collection|Crianca
     */
    public function getAll()
    {
        return $this->criancaRepository->getAll();
    }

    /**
     * @param $id
     * @return Model
     * @throws ModelNotFoundException
     */
    public function getById($id)
    {
        if(!$crianca = $this->criancaRepository->getById($id)) throw (new ModelNotFoundException())->setModel(Crianca::class);
        return $crianca;
    }

    /**
     * @param array $data
     * @return mixed
     * @throws \Exception
     */
    public function create(array $data)
    {
        $data = collect($data);

        $data->put('orfanato_id', $this->getCurrentUser()->orfanato_id);

        if(!$crianca = $this->criancaRepository->create($data->all())) throw new \Exception(trans('messages.MSG4'));
        return $crianca->fresh();
    }

    /**
     * @param $id
     * @param array $data
     * @return Model
     * @throws \Exception
     */
    public function update($id, array $data)
    {
        $data = collect($data);

        if(!$crianca = $this->criancaRepository->update($id, $data->all())) throw new \Exception(trans('messages.MSG4'));
        return $crianca->fresh();
    }

    /**
     * @param $id
     * @return Crianca|Model
     * @throws \Exception
     */
    public function delete($id)
    {
        if(!$deleted = $this->criancaRepository->delete($id)) throw new \Exception(trans('messages.MSG4'));
        return $deleted;
    }

    /**
     * @param $id
     * @return Crianca|Model
     * @throws \Exception
     */
    public function restore($id)
    {
        if(!$restored = $this->criancaRepository->restore($id)) throw new \Exception(trans('messages.MSG4'));
        return $restored;
    }
}