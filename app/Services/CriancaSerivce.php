<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 18/10/2016
 * Time: 13:43
 */

namespace App\Services;


use App\Contracts\CriancaRepository;
use App\Contracts\CriancaService;
use App\Contracts\UserService;

class CriancaSerivce implements CriancaService
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
     * @return \Illuminate\Database\Eloquent\Collection|\App\Crianca
     */
    public function getAll()
    {
        return $this->criancaRepository->getAll();
    }

    /**
     * The attributes that should be hidden for arrays.
     *
     * @param $id
     * @return \App\Crianca
     */
    public function getById($id)
    {
        return $this->criancaRepository->getById($id);
    }

    /**
     * @param array $data
     * @return \App\Crianca
     */
    public function create(array $data)
    {
        return $this->criancaRepository->create($data);
    }

    /**
     * @param $id
     * @param array $data
     * @return mixed
     */
    public function update($id, array $data)
    {
        return $this->criancaRepository->update($id, $data);
    }

    /**
     * @param $id
     * @return \App\Crianca
     * @throws \Exception
     */
    public function delete($id)
    {
        return $this->criancaRepository->delete($id);
    }

    /**
     * @param $id
     * @return \App\Crianca
     * @throws \Exception
     */
    public function restore($id)
    {
        return $this->criancaRepository->restore($id);
    }
}