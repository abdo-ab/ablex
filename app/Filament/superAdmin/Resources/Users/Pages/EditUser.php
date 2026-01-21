<?php

// namespace App\Filament\SuperAdmin\Resources\Users\Pages;

// use App\Filament\SuperAdmin\Resources\Users\UserResource;
// use Filament\Actions\DeleteAction;
// use Filament\Resources\Pages\EditRecord;

// class EditUser extends EditRecord
// {
//     protected static string $resource = UserResource::class;

//             protected function getRedirectUrl(): string
//  {
//     return $this->getResource()::getUrl('index');

// }
//     protected function getHeaderActions(): array
//     {
//         return [
//             DeleteAction::make(),
//         ];
//     }
// }


namespace App\Filament\superAdmin\Resources\Users\Pages;

use App\Filament\superAdmin\Resources\Users\UserResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditUser extends EditRecord
{
    protected static string $resource = UserResource::class;

            protected function getRedirectUrl(): string
 {
    return $this->getResource()::getUrl('index');

}
    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
