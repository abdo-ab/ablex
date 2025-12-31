<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class Adminseeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'mameadmin',
            'email' => 'mameadmin@gmail.com',
            'password' => '12345678',
            'Role' => 'admin',
        ]);
        User::factory()->create([
            'name' => 'devab',
            'email' => 'devab@gmail.com',
            'password' => '12345678',
            'Role' => 'superAdmin',
        ]);
    }
}
