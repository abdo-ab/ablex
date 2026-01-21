<?php

namespace App\Filament\Widgets;

use App\Models\Module;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class TotalStatus extends StatsOverviewWidget
{
    protected static bool $isLazy = false;
    protected function getStats(): array
    {
        return [
            Stat::make('Total Users', User::count())
                ->description('Total registered users')
                ->icon('heroicon-m-users')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->chart([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120])
                ->color('success'),


            Stat::make('total posts', Module::count())
                ->description('total Modules posted')
                ->descriptionColor('success')
                ->icon('heroicon-m-academic-cap')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->chart([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120])
                ->color('success'),


        ];
    }
}
