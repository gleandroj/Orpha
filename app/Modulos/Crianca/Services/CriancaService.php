<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 18/10/2016
 * Time: 13:43
 */

namespace App\Modulos\Crianca\Services;


use App\Exceptions\ApiException;
use App\Modulos\Crianca\Contracts\CriancaRepositoryInterface;
use App\Modulos\Crianca\Contracts\CriancaServiceInterface;
use App\Modulos\Crianca\Models\Crianca;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class CriancaService implements CriancaServiceInterface
{
    /**
     * @var CriancaRepositoryInterface
     */
    private $criancaRepository;

    /**
     * @var \App\Modulos\User\Models\User
     */
    private $user;

    /**
     * CriancaSerivce constructor.
     * @param CriancaRepositoryInterface $criancaRepository
     * @throws ApiException
     * @internal param UserService $userService
     */
    public function __construct(CriancaRepositoryInterface $criancaRepository)
    {
        $this->criancaRepository = $criancaRepository;
        $this->user = Auth::user();
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
     * @throws ApiException
     */
    public function getById($id)
    {
        if(!$crianca = $this->criancaRepository->getById($id)) throw new ApiException(trans('messages.MSG8'), ApiException::modelNotFound, 404);
        return $crianca;
    }

    /**
     * @param array $data
     * @return mixed
     * @throws ApiException
     */
    public function create(array $data)
    {
        $data = collect($data);

        $data->put('orfanato_id', $this->user->orfanato_id);

        if(!$crianca = $this->criancaRepository->create($data->all())) throw new ApiException(trans('messages.MSG4'), ApiException::internal, 500);
        return $crianca;
    }

    /**
     * @param $id
     * @param array $data
     * @return Model
     * @throws ApiException
     */
    public function update($id, array $data)
    {
        $data = collect($data);

        if(!$crianca = $this->criancaRepository->update($id, $data->all())) throw new ApiException(trans('messages.MSG4'), ApiException::internal, 500);
        return $crianca;
    }

    /**
     * @param $id
     * @return Crianca
     * @throws \Exception
     */
    public function delete($id)
    {
        if(!$deleted = $this->criancaRepository->delete($id)) throw new ApiException(trans('messages.MSG4'), ApiException::internal, 500);
        return $deleted;
    }

    /**
     * @param $id
     * @return Crianca
     * @throws \Exception
     */
    public function restore($id)
    {
        if(!$restored = $this->criancaRepository->restore($id)) throw new ApiException(trans('messages.MSG4'), ApiException::internal, 500);
        return $restored;
    }
}