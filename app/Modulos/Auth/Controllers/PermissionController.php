<?php

namespace App\Modulos\Auth\Controllers;

use App\Http\Controllers\Controller;
use App\Modulos\Auth\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function index()
    {
        return Permission::all();
    }
}
