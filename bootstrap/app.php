<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\ProtectFilamentAdmin;
use App\Http\Middleware\SuperAdminMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Symfony\Component\HttpFoundation\JsonResponse;
use Throwable;

$app = Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'admin' => ProtectFilamentAdmin::class,
            'superAdmin' => SuperAdminMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {

        //  SERVERLESS-SAFE ERROR HANDLING 
        $exceptions->render(function (Throwable $e) {
            return new JsonResponse([
                'error' => true,
                'message' => $e->getMessage(),
            ], 500);
        });

    })
    ->create();

/*
|--------------------------------------------------------------------------
| Vercel / Serverless filesystem fix
|--------------------------------------------------------------------------
*/
$app->useStoragePath('/tmp/storage');

//  required directories exist
@mkdir('/tmp/storage/framework/views', 0777, true);
@mkdir('/tmp/storage/framework/cache', 0777, true);
@mkdir('/tmp/storage/framework/sessions', 0777, true);

return $app;
