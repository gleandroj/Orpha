<?php

namespace App\Http\Controllers;

use App\Contracts\CriancaService;
use Illuminate\Http\Request;

use App\Http\Requests;

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
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
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
        return $this->criancaService->restore($id);
    }
}
