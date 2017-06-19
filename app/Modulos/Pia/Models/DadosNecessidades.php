<?php
/**
 * Created by PhpStorm.
 * User: FG0003
 * Date: 29/05/2017
 * Time: 13:17
 */

namespace App\Modulos\Pia\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DadosNecessidades extends Model
{
    use SoftDeletes;

    protected $table = 'dadosenecessidades';

    protected $fillable = [
        'documentacao_certidao_nascimento',
        'documentacao_historico_escolar',
        'documentacao_declaracao_escolar',
        'documentacao_rg',
        'documentacao_cpf',
        'documentacao_titulo_eleitoral',
        'documentacao_ctps',
        'documentacao_reservista',
        'documentacao_outros',
        'documentacao_completado',

        'necessidades_enfermagem',
        'necessidades_medico',
        'necessidades_nutricao',
        'necessidades_odontologia',
        'necessidades_oftalmologia',
        'necessidades_psicologia',
        'necessidades_psiquiatria',
        'necessidades_servico_social',
        'necessidades_tratamento_drogas',
        'necessidades_musicoterapia',
        'necessidades_ter_ocupacional',
        'necessidades_pedagogia',
        'necessidades_outros',
        'necessidades_completado',

        'rededeapoio_equipamentos',
        'rededeapoio_familia_extensa',
        'rededeapoio_pais_responsaveis',
        'rededeapoio_programas_apoio_comunitario',
        'rededeapoio_programas_protecao',
        'rededeapoio_servico_atendimento_vitimias_maus_tratos',
        'rededeapoio_outros',
        'rededeapoio_completado',

        'religiosidade_atividade_religiosa',
        'religiosidade_assistencia_religiosa',
        'religiosidade_denominacao_religiosa',
        'religiosidade_outros',
        'religiosidade_completado',

        'atividades_escolarizacao',
        'atividades_curso_profissionalizante',
        'atividades_atividades_artisticas',
        'atividades_atividades_culturais',
        'atividades_atividades_esportivas',
        'atividades_outros',
        'atividades_completado',

        'tratamentos_medico',
        'tratamentos_nutricao',
        'tratamentos_odontologia',
        'tratamentos_psicologia',
        'tratamentos_psiquiatria',
        'tratamentos_servico_social',
        'tratamentos_uso_drogras',
        'tratamentos_atendimento_hospitalar',
        'tratamentos_outros',
        'tratamentos_completado',
        'completado'
    ];

    /**
     * Crianca
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function pia()
    {
        return $this->belongsTo(Pia::class);
    }
}