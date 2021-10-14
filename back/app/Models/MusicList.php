<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MusicList extends Model
{
    use HasFactory;
    protected $table = 'music_list'; /* <== OPTIONAL */
    protected $fillable = [
        'title',
        'src',
        'album',
        'order',
    ];
}
