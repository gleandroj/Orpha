<?php

namespace Orpha\Units\Crianca\Http\Controllers;

use Illuminate\Http\Request;
use Orpha\Domains\Crianca\Models\Crianca;
use Orpha\Support\Http\Controllers\Controller;
use Orpha\Domains\Crianca\Contracts\CriancaServiceContract;

class CriancaController extends Controller
{
    /**
     * @var CriancaServiceContract
     */
    private $criancaService;

    /**
     * CriancaController constructor.
     * @param CriancaServiceContract $criancaService
     */
    public function __construct(CriancaServiceContract $criancaService)
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
        $this->authorizeForUser($this->getCurrentUser(), 'index', Crianca::class);
        return $this->criancaService->getAll();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Crianca|\Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorizeForUser($this->getCurrentUser(), 'create', Crianca::class);
        $this->validate($request, [
            'nome' => 'required|max:50',
            'dt_nascimento' => 'required|date',
            'filiacao' => 'required|max:50',
            'responsavel' => 'required|max:50',
            'grau_parentesco' => 'required|max:50',
            'processo' => 'required|max:20',
            'comarca' => 'required|max:50'
        ]);
        return $this->criancaService->create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param Crianca $crianca
     * @return Crianca
     */
    public function show(Crianca $crianca)
    {
        $this->authorizeForUser($this->getCurrentUser(), 'show', $crianca);
        return $this->criancaService->getById($crianca->id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Crianca $crianca
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Crianca $crianca)
    {
        $this->authorizeForUser($this->getCurrentUser(), 'update', $crianca);
        $this->validate($request, [
            'nome' => 'required|max:50',
            'dt_nascimento' => 'required|date',
            'filiacao' => 'required|max:50',
            'responsavel' => 'required|max:50',
            'grau_parentesco' => 'required|max:50',
            'processo' => 'required|max:20',
            'comarca' => 'required|max:50'
        ]);
        return $this->criancaService->update($crianca->id, $request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Crianca $crianca
     * @return Crianca
     */
    public function destroy(Crianca $crianca)
    {
        $this->authorizeForUser($this->getCurrentUser(), 'delete', $crianca);
        return $this->criancaService->delete($crianca->id);
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param Crianca $crianca
     * @return Crianca
     * @internal param $id
     */
    public function restore(Crianca $crianca)
    {
        $this->authorizeForUser($this->getCurrentUser(), 'active', $crianca);
        return $this->criancaService->restore($crianca->id);
    }
}
