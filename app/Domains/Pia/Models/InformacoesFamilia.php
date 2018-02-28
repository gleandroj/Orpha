<?php

namespace Orpha\Domains\Pia\Models;

use Orpha\Support\Models\Model;

class InformacoesFamilia extends Model
{
    protected $table = 'informacoes_familia';

    protected $fillable = [
         'atendimento_realizado_acolhimento'
        ,'atendimento_realizado_completado'
        ,'atendimento_realizado_encaminhado_grupo_pais_responsaveis'
        ,'atendimento_realizado_esclarecimento_fluxo_processo'
        ,'atendimento_realizado_orientacao_sobre_medidas_socioeducativas'
        ,'atendimento_realizado_outros'

        ,'orientacao_realizada_completado'
        ,'orientacao_realizada_direitos_legais'
        ,'orientacao_realizada_direitos_providenciario'
        ,'orientacao_realizada_direitos_sociai'
        ,'orientacao_realizada_educacao_formal'
        ,'orientacao_realizada_educacao_profissional'
        ,'orientacao_realizada_outros'
        ,'orientacao_realizada_planejamento_familiar'
        ,'orientacao_realizada_planejamento_orcamentario'

        ,'rede_apoio2_atendimento_social'
        ,'rede_apoio2_bolsa_familia'
        ,'rede_apoio2_cesta_basica'
        ,'rede_apoio2_custeio_transporte'
        ,'rede_apoio2_custo'
        ,'rede_apoio2_equipamentos'
        ,'rede_apoio2_geracao_trabalho_renda'
        ,'rede_apoio2_local_residencia'
        ,'rede_apoio2_numero_transporte'
        ,'rede_apoio2_outros'
        ,'rede_apoio2_programas_sociais'
        ,'rede_apoio2_completado'

        ,'rede_apoio_associacao_moradores'
        ,'rede_apoio_atendimento_juridico'
        ,'rede_apoio_atendimento_medic'
        ,'rede_apoio_atendimento_saude_mental_drogas'
        ,'rede_apoio_atendimento_saude_mental_transtorno'
        ,'rede_apoio_completado'
        ,'rede_apoio_conselho_tutelar'
        ,'rede_apoio_outros'
        ,'rede_apoio_programa_protecao'

        ,'completado'
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