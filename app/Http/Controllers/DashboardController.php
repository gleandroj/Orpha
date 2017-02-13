<?php

namespace App\Http\Controllers;

use App\Modulos\Crianca\Contracts\CriancaRepositoryInterface;
use App\Modulos\User\Contracts\UserRepositoryInterface;

class DashboardController extends Controller
{
    /**
     * @var UserRepositoryInterface
     */
    private $userRepository;

    /**
     * @var CriancaRepositoryInterface
     */
    private $criancaRepository;

    /**
     * DashboardController constructor.
     * @param UserRepositoryInterface $userRepository
     * @param CriancaRepositoryInterface $criancaRepository
     */
    public function __construct(UserRepositoryInterface $userRepository, CriancaRepositoryInterface $criancaRepository)
    {
        $this->userRepository = $userRepository;
        $this->criancaRepository = $criancaRepository;
    }

    public function getData()
    {
        return [
            'users' => $this->userRepository->getCountActiveAndInactiveUsers(),
            'criancas' => $this->criancaRepository->getCountActiveAndInactiveCriancas(),
            'criancasByAge' => $this->criancaRepository->getCountByAge()
        ];
    }

}
