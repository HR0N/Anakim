<?php

namespace App\Http\Controllers;

use App\Models\SiteDevProjects;
use App\Models\SubItem;
use Illuminate\Http\Request;

class SiteDevProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SiteDevProjects::all();
    }
    public function index_sub_items($id)
    {
//        return SubItem::all();
        return SubItem::where('project', $id)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
//            'title' => 'required|unique:posts|max:255',
            'title' => 'required',
            'user' => 'required',
        ]);
        return SiteDevProjects::create($validated);

    }
    public function store_sub_item(Request $request)
    {
        $validated = $request->validate([
            'project' => 'required',
            'item' => 'required',
            'text' => 'required',
            'finished',
        ]);
        return SubItem::create($validated);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        SiteDevProjects::destroy($id);
    }
    public function destroy_sub_item($id)
    {
        SubItem::destroy($id);
    }
}
