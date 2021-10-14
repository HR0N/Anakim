<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class AnimalIpController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $user_ip = "46.219.220.13";
//        $user_ip = $_SERVER['REMOTE_ADDR'];
        $sxgeo = "http://ua.sxgeo.city/json/";
        $httpRequest = $sxgeo.$user_ip;

        $is_bot = preg_match(
            "~(Google|Yahoo|Rambler|Bot|Yandex|Spider|Snoopy|Crawler|Finder|Mail|curl)~i",
            $_SERVER['HTTP_USER_AGENT']
        );
        /*$session->deleteSession_data();*/
        $animal = $this->get_my_animal_back_peach($user_ip);
        $user_data = $this->is_already_have_same_user($user_ip);
        if($user_data != false){
            $data = $user_data;
//            var_dump('Yes, we already have same user in session! =)');
            $data['same_user'] = true;
            return $data;
        }else{
            $geo = !$is_bot ? file_get_contents($httpRequest): [];
            $geo = json_decode($geo, true);
            $data = [
                'ip' => $user_ip,
                'country' => $geo['country']['name_en'],
                'city' => $geo['city']['name_en'],
                'animal' => $animal,
                'same_user' => false
            ];
            $this->store_session_data($data);
            return $data;
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
        //
    }

    /*todo: ......................................................... ......:::::: Session ::::::......     */
    public function get_user_session_data(){
        if(session()->has('animal_ip')){
            return session('animal_ip');
        }else return false;
    }

    public function store_session_data($data){
        session()->put('animal_ip', $data);
    }
    public function is_already_have_same_user($user_ip){
        $user_data = $this->get_user_session_data();
        if($user_data && $user_data['ip'] == $user_ip){
            return $user_data;
        }else return false;
    }

    public function deleteSession_data(){
        session()->flush();
    }
    /*todo: ......................................................... ......:::::: RollAnimal ::::::......     */
    public function get_my_animal_back_peach($user_ip){
//        $user_ip = $user_ip;
//        $user_ip = collect(mb_strimwidth(explode('.', $user_ip)[2],1,2));
//        $user_ip = intval($user_ip[0]);
//        if($user_ip > 19){
//            $user_ip = floor($user_ip / 5);
//        }
        $user_ip = rand(0, 19);
        $animals = [
            'bamby', 'bear', 'cat', 'chicken', 'cow', 'dog', 'elephant', 'fox', 'giraffe', 'goat',
            'koala', 'lion', 'monkey', 'owl', 'panda', 'pig', 'rabbit', 'raccoon', 'tiger', 'wolf'
        ];

        return($animals[$user_ip]);
    }
}
