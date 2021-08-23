<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(array('prefix' => 'api'), function()
{

  Route::get('/', function () {
      return response()->json(['message' => 'Gave API', 'status' => 'Connected']);;
  });

  //Aqui adicionamos os endpoints e os controllers ao qual se referem.
  Route::resource('usuarios', 'UsuariosController');
  Route::resource('exposicoes', 'ExposicoesController');

});

Route::get('/', function () {
    return redirect('api');
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
