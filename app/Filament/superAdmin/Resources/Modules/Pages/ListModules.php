<?php

// namespace App\Filament\SuperAdmin\Resources\Modules\Pages;

// use App\Filament\SuperAdmin\Resources\Modules\ModuleResource;
// use Filament\Actions\CreateAction;
// use Filament\Resources\Pages\ListRecords;
//
// class ListModules extends ListRecords
// {
//     protected static string $resource = ModuleResource::class;

//     protected function getHeaderActions(): array
//     {
//         return [
//             CreateAction::make(),
//         ];
//     }
// }


namespace App\Filament\superAdmin\Resources\Modules\Pages;

use App\Filament\superAdmin\Resources\Modules\ModuleResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListModules extends ListRecords
{
    protected static string $resource = ModuleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
