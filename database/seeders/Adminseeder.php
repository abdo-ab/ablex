<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class Adminseeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'mameadmin',
            'email' => 'awashdev@gmail.com',
            'email_verified_at' => now(),
            'password' =>Hash::make('12345678'),
            'Role' => 'admin',
        ]);
        User::factory()->create([
            'name' => 'devab',
            'email' => 'devabdo@gmail.com',
            'email_verified_at' => now(),
            'password' =>Hash::make('12345678'),
            'Role' => 'superAdmin',
        ]);
    }
}
