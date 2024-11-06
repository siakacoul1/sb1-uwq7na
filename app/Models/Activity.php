<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Activity extends Model
{
    protected $fillable = [
        'name',
        'program_id',
        'description',
        'start_date',
        'end_date',
        'location',
        'capacity',
        'type',
        'status'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime'
    ];

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }
}