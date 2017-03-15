<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Laravel\Passport\ClientRepository;

class Implantation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'implantation:go';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Configura o servidor para ser executado pela primeira vez.';
    /**
     * @var ClientRepository
     */
    private $clients;

    /**
     * Create a new command instance.
     *
     * @param ClientRepository $clients
     */
    public function __construct(ClientRepository $clients)
    {
        parent::__construct();
        $this->clients = $clients;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info("Implantando...");
        $this->info("Criando tabelas...");
        $this->call('migrate');
        $this->info("Executando carga de dados");
        $this->call('db:seed');
        $this->info("Configurando OAuth...");
        $client = $this->clients->createPasswordGrantClient(
            null, config('app.name').' Password Grant Client', 'http://localhost'
        );
        $client['secret'] = 'iG7mXf3ZDiiOss4pmJA5zPb19kotpHyfLjyd2Xiz';
        $client->save();
        $this->line('<comment>Client ID:</comment> '. $client->id);
        $this->line('<comment>Client Secret:</comment> '. $client->secret);
        $this->info('Done.');

        $this->info('Utilize as seguintes credenciais para acessar (em modo teste):');
        $this->line('<comment>E-mail:</comment> admin@orpha.com.br');
        $this->line('<comment>Senha:</comment> 123321');

        if($this->confirm('Deseja executar o servidor?', true)){
            $this->call('serve');
        }
    }
}
