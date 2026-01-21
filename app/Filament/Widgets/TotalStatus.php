<?php

namespace App\Filament\Widgets;

use App\Models\Module;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class TotalStatus extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Users', User::count())
                ->description('Total registered users')
            ->color('success'),


            stat::make('total posts', Module::count())
            ->description('total Modules posted')
            ->descriptionColor('success')
             ->descriptionIcon('heroicon-m-arrow-trending-up'),


        ];
    }
}
