<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['domain' => config('project.app_domain'), 'as' => 'web.', 'namespace' => 'Web', 'middleware' => 'web'], function() {
    /*
    Route::get('/', [
        'as'   => 'reset.store',
        'uses' => 'PasswordsController@postReset',
    ]);
    */
    Route::get('/', function () {
        return view('index');
    });
});

Route::group(['domain' => config('project.api_domain'), 'as' => 'api.', 'namespace' => 'Api', 'middleware' => 'cors'], function() {
    
    Route::resource('questions', 'QuestionsController'); 
    
    Route::group(['prefix' => 'v1', 'namespace' => 'V1'], function() {
        Route::get('/', function () {
            return 'v1 입니당';
        });
    });
    Route::group(['prefix' => 'v2', 'namespace' => 'V2'], function() {
        Route::get('/', function () {
            return 'v2 입니당';
        });
        //Route::resource('photo', 'PhotoController', ['except' => ['create', 'edit']]);
    });
   
});
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/
/*
Route::group(['middleware' => ['web']], function () {
    //
});
*/
