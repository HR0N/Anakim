<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;
use App\Http\Controllers\ProductConttroller;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MusicListController;
use App\Http\Controllers\AnimalIpController;
use App\Http\Controllers\SiteDevProjectController;

//Route::resource('products', ProductConttroller::class);
//header("Set-Cookie: cross-site-cookie=whatever; SameSite=None; Secure");

/*todo:                                                                         Public                */
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/products', [ProductConttroller::class, 'index']);
Route::get('/products/{id}', [ProductConttroller::class, 'show']);
Route::get('/products/search/{name}', [ProductConttroller::class, 'search']);
Route::put('/products/update/{id}', [ProductConttroller::class, 'update']);

// mPlayer
Route::get('/get_music', [MusicListController::class, 'index']);
Route::get('/music_list', [MusicListController::class, 'store']);
Route::put('/update_music_list_array', [MusicListController::class, 'update_array']); // todo: must be protect
// AnimalIp
Route::get('/get_my_animal_back_peach', [AnimalIpController::class, 'index']);
// SiteDev
Route::get('/show_all_projects', [SiteDevProjectController::class, 'index']);
Route::get('/show_all_sub_items/{id}', [SiteDevProjectController::class, 'index_sub_items']);
Route::post('/site_dev_create_project', [SiteDevProjectController::class, 'store']);
Route::post('/site_dev_create_sub_item', [SiteDevProjectController::class, 'store_sub_item']);
Route::post('/site_dev_destroy/{id}', [SiteDevProjectController::class, 'destroy']);
Route::post('/site_dev_destroy_sub_item/{id}', [SiteDevProjectController::class, 'destroy_sub_item']);
Route::put('/site_dev_edit_sub_item/{id}', [SiteDevProjectController::class, 'update']);


/*todo:                                                                         Protected                */
Route::group(['middleware' => ['auth:sanctum']], function (){
// Logout
    Route::get('/logout', [AuthController::class, 'logout']);
// mPlayer
});










































// Protected routes
Route::group(['middleware' => ['auth:sanctum']], function (){
    Route::post('/products', [ProductConttroller::class, 'store']);
    Route::put('/products/{id}', [ProductConttroller::class, 'update']);
    Route::delete('/products/{id}', [ProductConttroller::class, 'destroy']);
});

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
Route::get('/test', [TestController::class, 'index2']);
Route::get('/test1', [TestController::class, 'test1']);
Route::get('/test2', [TestController::class, 'test2']);
