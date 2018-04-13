<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 07/03/2017
 * Time: 09:16
 */

namespace Orpha\Units\Orfanato\Http\Controllers;

use Orpha\Support\Http\Controllers\Controller;
use Orpha\Domains\Crianca\Repositories\CriancaRepository;
use Orpha\Domains\User\Repositories\UserRepository;

class DashboardController extends Controller
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var CriancaRepository
     */
    private $criancaRepository;

    /**
     * DashboardController constructor.
     * @param UserRepository $userRepository
     * @param CriancaRepository $criancaRepository
     */
    public function __construct(UserRepository $userRepository, CriancaRepository $criancaRepository)
    {
        $this->userRepository = $userRepository;
        $this->criancaRepository = $criancaRepository;
    }

    /**
     * @return array
     */
    public function getData()
    {
        return [
            'users' => $this->userRepository->getCountActiveAndInactiveUsers(),
            'criancas' => $this->criancaRepository->getCountActiveAndInactiveCriancas(),
            'criancasByAge' => $this->criancaRepository->getCountByAge()
        ];
    }

}
