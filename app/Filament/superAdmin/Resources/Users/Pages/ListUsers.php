<?php

// namespace App\Filament\SuperAdmin\Resources\Users\Pages;

// use App\Filament\SuperAdmin\Resources\Users\UserResource;
// use Filament\Actions\CreateAction;
// use Filament\Resources\Pages\ListRecords;

// class ListUsers extends ListRecords
// {
//     protected static string $resource = UserResource::class;

//     protected function getHeaderActions(): array
//     {
//         return [
//             CreateAction::make(),
//         ];
//     }
//       protected function getRedirectUrl(): string
//  {
//     return $this->getResource()::getUrl('index');

// }
// }


namespace App\Filament\superAdmin\Resources\Users\Pages;

use App\Filament\superAdmin\Resources\Users\UserResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListUsers extends ListRecords
{
    protected static string $resource = UserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
      protected function getRedirectUrl(): string
 {
    return $this->getResource()::getUrl('index');

}
}
