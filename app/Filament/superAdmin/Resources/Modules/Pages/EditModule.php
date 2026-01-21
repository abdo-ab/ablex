<?php

// namespace App\Filament\SuperAdmin\Resources\Modules\Pages;

// use App\Filament\SuperAdmin\Resources\Modules\ModuleResource;
// use Filament\Actions\DeleteAction;
// use Filament\Resources\Pages\EditRecord;

// class EditModule extends EditRecord
// {
//     protected static string $resource = ModuleResource::class;

//           protected function getRedirectUrl(): string
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


namespace App\Filament\SuperAdmin\Resources\Modules\Pages;

use App\Filament\SuperAdmin\Resources\Modules\ModuleResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditModule extends EditRecord
{
    protected static string $resource = ModuleResource::class;

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
