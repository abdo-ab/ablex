<?php

namespace App\Filament\SuperAdmin\Resources\Modules;

use App\Filament\SuperAdmin\Resources\Modules\Pages\CreateModule;
use App\Filament\SuperAdmin\Resources\Modules\Pages\EditModule;
use App\Filament\SuperAdmin\Resources\Modules\Pages\ListModules;
use App\Filament\SuperAdmin\Resources\Modules\Schemas\ModuleForm;
use App\Filament\SuperAdmin\Resources\Modules\Tables\ModulesTable;
use App\Models\Module;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class ModuleResource extends Resource
{
    protected static ?string $model = Module::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Schema $schema): Schema
    {
        return ModuleForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ModulesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListModules::route('/'),
            'create' => CreateModule::route('/create'),
            'edit' => EditModule::route('/{record}/edit'),
        ];
    }
    
}
