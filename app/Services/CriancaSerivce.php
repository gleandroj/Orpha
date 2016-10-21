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
use App\Crianca;
use Illuminate\Database\Eloquent\ModelNotFoundException;

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
        if(!$crianca = $this->criancaRepository->getById($id))
            throw (new ModelNotFoundException())->setModel('criança', $id);
        return $crianca;
    }

    /**
     * @param array $data
     * @return \App\Crianca
     */
    public function create(array $data)
    {
        $data = collect($data);

        validator($data->all(), [
            'nome' => 'required|max:50',
            'dt_nascimento' => 'required|date',
            'filiacao' => 'required|max:50',
            'responsavel' => 'required|max:50',
            'grau_parentesco' => 'required|max:50',
            'processo' => 'required|max:20',
            'comarca' => 'required|max:50'
        ])->validate();

        return $this->criancaRepository->create($data->all());
    }

    /**
     * @param $id
     * @param array $data
     * @return mixed
     */
    public function update($id, array $data)
    {
        $data = collect($data);

        validator($data->all(), [
            'nome' => 'required|max:50',
            'dt_nascimento' => 'required|date',
            'filiacao' => 'required|max:50',
            'responsavel' => 'required|max:50',
            'grau_parentesco' => 'required|max:50',
            'processo' => 'required|max:20',
            'comarca' => 'required|max:50'
        ])->validate();

        return $this->criancaRepository->update($id, $data->all());
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