<?php

namespace Orpha\Domains\Pia\Models;

use Orpha\Support\Models\Model;

class DadosNecessidades extends Model
{
    protected $table = 'dados_necessidades';

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

        'redede_apoio_equipamentos',
        'redede_apoio_familia_extensa',
        'redede_apoio_pais_responsaveis',
        'redede_apoio_programas_apoio_comunitario',
        'redede_apoio_programas_protecao',
        'redede_apoio_servico_atendimento_vitimias_maus_tratos',
        'redede_apoio_outros',
        'redede_apoio_completado',

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