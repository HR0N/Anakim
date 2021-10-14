<?php

namespace App\Http\Controllers;

use App\Models\MusicList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class MusicListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return MusicList::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
//        $folders = ['Background', 'EasyMusic', 'Eminem', 'Fast', 'KillingFloor', 'Lineage'];
//        $folder = 'Lineage';
//        $files = scandir('../../src/music/'.$folder, SCANDIR_SORT_DESCENDING);
//        $files2 = [];
//        foreach ($files as $key => $val){
//            if(strlen($val) > 5 && $val != null){
//                $array['title'] = str_replace('.mp3', '', $val);
//                $array['src'] = $val;
//                $array['album'] = $folder;
//                $array['order'] = strval($key);
//
////                MusicList::create($array);
//                array_push($files2, $array);
//            }
//        }
//        array_map(function ($val){
////            MusicList::create($val);
//        }, $files2);
//        dd($files2);
        $validated = $request->validate([
            'title' => 'required',
            'src' => 'required',
            'album' => 'required',
        ]);
//        return MusicList::create($request->all());
        return MusicList::create($validated);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return MusicList::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update_array(Request $request)
    {
        array_map(function ($val){
            $product = MusicList::find($val['id']);
            $product->update($val);
        }, $request->all());
        return 'Done!';
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return MusicList::destroy($id);
    }

    /**
     * Search for a name
     *
     * @param  string  $name
     * @return \Illuminate\Http\Response
     */
    public function search($name)
    {
        return MusicList::where('title', 'like', '%'.$name.'%')->get();
    }
}
