<?php



namespace App\Filament\superAdmin\Resources\Modules\Pages;

use App\Filament\superAdmin\Resources\Modules\ModuleResource;
use Filament\Facades\Filament;
use Filament\Resources\Pages\CreateRecord;

class CreateModule extends CreateRecord
{
    protected static string $resource = ModuleResource::class;
        protected static bool $canCreateAnother = false;
     protected function mutateFormDataBeforeCreate(array $data): array
    {
           $user = Filament::auth()->user();
           $data["user_id"] = $user->id;
           $data['author_name'] = $user->name;

        return $data;
    }
       protected function getRedirectUrl(): string
 {
    return $this->getResource()::getUrl('index');

}
}
