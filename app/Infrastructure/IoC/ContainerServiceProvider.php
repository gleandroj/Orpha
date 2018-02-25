<?php

namespace Orpha\Infrastructure\IoC;

use Illuminate\Support\ServiceProvider;
use Illuminate\Container\Container as Application;
use Illuminate\Notifications\Events\NotificationSent;
use Illuminate\Support\Facades\Event;

use Orpha\Infrastructure\Data\Repositories\PasswordRepository;
use Orpha\Domains\Auth\Repositories\PasswordRepository as PasswordRepositoryInterface;

class ContainerServiceProvider extends ServiceProvider
{
    /**
     * Event's Listeners
     * @var array
     */
    protected static $listeners = [
    ];

    /**
     * Register Services
     */
    public function Register()
    {
        self::RegisterServices($this->app, $this);
    }

    /**
     * @param Application $application
     * @param ServiceProvider $provider
     */
    public static function RegisterServices(Application $application, ServiceProvider $provider)
    {
        static::registerAuthDomain($application, $provider);
        static::registerAgents($application, $provider);
        static::registerHelper($application, $provider);
        static::registerListeners();
    }

    /**
     * @param Application $application
     * @param ServiceProvider $provider
     */
    private static function registerHelper(Application $application, ServiceProvider $provider)
    {
    }

    /**
     * @param Application $application
     * @param ServiceProvider $provider
     */
    private static function registerAuthDomain(Application $application, ServiceProvider $provider)
    {
        $application->bind(PasswordRepositoryInterface::class, PasswordRepository::class);
    }

    /**
     * @param Application $application
     * @param ServiceProvider $provider
     */
    private static function registerAgents(Application $application, ServiceProvider $provider)
    {
    }

    /**
     * Register core event's listeners
     */
    private static function registerListeners()
    {
        foreach (self::$listeners as $event => $listeners) {
            foreach ($listeners as $listener) {
                Event::listen($event, $listener);
            }
        }
    }

}