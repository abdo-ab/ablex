<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
         return $schema
            ->components([
                TextInput::make("name")
                ->required()
                ->helperText("this field is required")
                ->minLength("3")
                ->maxLength("125")

                ,
                TextInput::make("email")
                ->required()
                ->helperText("email must contain @")
                ->minLength("4")
                ->maxLength("255")
                ,
                TextInput::make("password")
                ->required()
                ->helperText("password must be at least 4 ")
                ->minLength("4")
                ->maxLength("12")
                ,
                Hidden::make("Role")
                ->default("user")

            ]);
    }
}
