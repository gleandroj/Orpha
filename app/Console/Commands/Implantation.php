<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Laravel\Passport\ClientRepository;
use Symfony\Component\Process\Process;

class Implantation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'implantation';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Configura a aplicação para ser executado pela primeira vez.';

    /**
     * @var ClientRepository
     */
    private $clients;

    /**
     * @var \Illuminate\Support\Collection
     */
    private $environment;

    /**
     * @var array
     */
    private $banco_de_dados = ['sqlite' => null, 'mysql' => '3306', 'pgsql' => '5432', 'redis' => '6379'];

    /**
     * Create a new command instance.
     *
     * @param ClientRepository $clients
     */
    public function __construct(ClientRepository $clients)
    {
        parent::__construct();
        $this->clients = $clients;
        $this->environment = collect([]);
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        if($this->confirm('Deseja configurar o Ambiente?', true)){
            $this->setupLocalEnvironment($this->choice('Escolha a Variavel de ambiente', ['local', 'production', 'debug'], 0));
        }

        $this->info("Implantando...");

        $this->setupDatabase();
        $this->setupOAuth();

        if($this->confirm('Deseja compilar o front end?', false)){
            $this->setupFrontEnd();
        }

        if($this->confirm('Deseja executar o servidor?', true)){
            $this->call('serve');
        }
    }

    /**
     * Setup database migrations
     */
    private function setupDatabase()
    {
        $this->info("Criando tabelas...");
        $this->call('migrate');
        $this->info("Executando carga de dados...");
        $this->call('db:seed');
    }

    /**
     * Setup passport
     */
    private function setupOAuth()
    {
        $this->info("Configurando OAuth...");
        $client = $this->clients->createPasswordGrantClient(
            null, config('app.name').' Password Grant Client', 'http://localhost'
        );
        $client['secret'] = 'iG7mXf3ZDiiOss4pmJA5zPb19kotpHyfLjyd2Xiz';
        $client->save();
        $this->line('<comment>Client ID:</comment> '. $client->id);
        $this->line('<comment>Client Secret:</comment> '. $client->secret);

        $this->info('Utilize as seguintes credenciais para acessar (em modo teste):');
        $this->line('<comment>E-mail:</comment> admin@orpha.com.br');
        $this->line('<comment>Senha:</comment> 123321123');
    }

    /**
     * Setup npm modules and compile webpack
     */
    private function setupFrontEnd()
    {
        if(!File::exists($this->laravel->basePath().'\node_modules')){
            $npmCmd = "npm install && npm run production";
        }else{
            $npmCmd = "npm run production";
        }
        $this->info('Compilando front end...');
        $npm = new Process($npmCmd);
        $npm->setTimeout(60*10);
        $npm->enableOutput();
        $npm->run();

        if(!$npm->isSuccessful()){
            $this->warn('Falha ao executar comandos: '.$npmCmd);
            $this->warn('Falha ao configurar o front end, verifique se o Node.js eo NPM estão instalados corretamente.');
        }
    }

    /**
     * Setup .env file and default env var's
     * @param $env
     */
    private function setupLocalEnvironment($env)
    {
        if($env != 'local' && $env != 'debug') return;
        $dbs = ''; foreach ($this->banco_de_dados as $key => $value) $dbs .= $key.($value != null ? ':' : '').$value.', ';

        $this->environment->put('APP_ENV', $env);
        $this->environment->put('APP_KEY', '');
        $this->environment->put('APP_DEBUG', 'true');
        $this->environment->put('APP_LOG_LEVEL', 'debug');

        $this->environment->put('APP_URL', $this->ask("Url da aplicacao?", "http://localhost"));

        $this->environment->put('DB_CONNECTION', $this->choice('Escolha o banco de dados', collect($this->banco_de_dados)->keys()->all(), 1));
        $this->environment->put('DB_HOST', $this->ask("Host do banco de dados", "localhost"));
        $this->environment->put('DB_PORT', $this->ask("Porta do banco de dados, " .$dbs, $this->banco_de_dados['mysql']));
        $this->environment->put('DB_DATABASE', $this->ask("Nome do banco de dados", "orphadb"));
        $this->environment->put('DB_USERNAME', $this->ask("Usuario do banco de dados", "root"));
        $this->environment->put('DB_PASSWORD', (($p = $this->ask('Senha do banco de dados', false)) == false ? null : $p));

        $this->environment->put('BROADCAST_DRIVER', 'log');
        $this->environment->put('CACHE_DRIVER', 'file');
        $this->environment->put('SESSION_DRIVER', 'file');
        $this->environment->put('QUEUE_DRIVER', 'sync');

        if($this->confirm('Deseja configurar servico de envio de emails em nuvem?', false)){
            $this->environment->put('SPARKPOST_SECRET', $this->ask('Token de acesso do SparkPost'));
        }

        if($this->confirm('Deseja configurar servico de armazenamento em nuvem?', false)){

            $this->environment->put('S3_SECRET', $this->ask('Amazon S3 Secret'));
            $this->environment->put('S3_KEY', $this->ask('Amazon S3 Key'));
            $this->environment->put('S3_BUCKET', $this->ask('Amazon S3 Bucket'));
            $this->environment->put('S3_REGION', $this->ask('Amazon S3 Region'));

        }

        $environmentFile = '';
        foreach ($this->environment as $key => $value){
            $environmentFile.= $key.'='.$value.PHP_EOL;
        }

        File::put(base_path().'/.env', $environmentFile);

        $this->call('key:generate');

        $this->call('config:clear');
    }
}
