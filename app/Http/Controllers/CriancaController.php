<?php

namespace App\Http\Controllers;

use App\Contracts\CriancaService;
use App\Crianca;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

class CriancaController extends Controller
{
    /**
     * @var CriancaService
     */
    private $criancaService;

    /**
     * CriancaController constructor.
     * @param CriancaService $criancaService
     */
    public function __construct(CriancaService $criancaService)
    {
        $this->criancaService = $criancaService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Crianca|\Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        $this->authorizeForUser(Auth::user(), 'index', Crianca::class);
        return $this->criancaService->getAll();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorizeForUser($request->user(), 'create', Crianca::class);
        return $this->criancaService->create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \App\Crianca
     */
    public function show($id)
    {
        $this->authorizeForUser(Auth::user(), 'show', Crianca::class);
        return $this->criancaService->getById($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->authorizeForUser($request->user(), 'update', Crianca::class);
        return $this->criancaService->update($id, $request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \App\Crianca
     */
    public function destroy($id)
    {
        $this->authorizeForUser(Auth::user(), 'delete', Crianca::class);
        return $this->criancaService->delete($id);
    }


    /**
     * Restore the specified resource from storage.
     *
     * @param  int  $id
     * @return \App\Crianca
     */
    public function restore($id)
    {
        $this->authorizeForUser(Auth::user(), 'active', Crianca::class);
        return $this->criancaService->restore($id);
    }
}
