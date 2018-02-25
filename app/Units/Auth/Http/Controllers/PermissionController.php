<?php

namespace  Orpha\Units\Auth\Http\Controllers;

use Orpha\Support\Http\Controllers\Controller;
use Orpha\Domains\Auth\Models\Permission;

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
