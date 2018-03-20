<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 07/03/2017
 * Time: 09:16
 */

namespace App\Modulos\Orpha\Controllers;

use App\Http\Controllers\Controller;
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
