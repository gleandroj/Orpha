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

class InformacoesFamilia extends Model
{
    use SoftDeletes;

    protected $table = 'informacoesdafamilia';

    protected $fillable = [
         'atendimentorealizado_acolhimento'
        ,'atendimentorealizado_completado'
        ,'atendimentorealizado_encaminhado_grupo_pais_responsaveis'
        ,'atendimentorealizado_esclarecimento_fluxo_processo'
        ,'atendimentorealizado_orientacao_sobre_medidas_socioeducativas'
        ,'atendimentorealizado_outros'
        ,'orientacaorealizada_completado'
        ,'orientacaorealizada_direitos_legais'
        ,'orientacaorealizada_direitos_providenciario'
        ,'orientacaorealizada_direitos_sociai'
        ,'orientacaorealizada_educacao_formal'
        ,'orientacaorealizada_educacao_profissional'
        ,'orientacaorealizada_outros'
        ,'orientacaorealizada_planejamento_familiar'
        ,'orientacaorealizada_planejamento_orcamentario'
        ,'rededeapoio2_atendimento_social'
        ,'rededeapoio2_bolsa_familia'
        ,'rededeapoio2_cesta_basica'
        ,'rededeapoio2_completado'
        ,'rededeapoio2_custeio_transporte'
        ,'rededeapoio2_custo'
        ,'rededeapoio2_equipamentos'
        ,'rededeapoio2_geracao_trabalho_renda'
        ,'rededeapoio2_local_residencia'
        ,'rededeapoio2_numero_transporte'
        ,'rededeapoio2_outros'
        ,'rededeapoio2_programas_sociais'
        ,'rededeapoio_associacao_moradores'
        ,'rededeapoio_atendimento_juridico'
        ,'rededeapoio_atendimento_medic'
        ,'rededeapoio_atendimento_saude_mental_drogas'
        ,'rededeapoio_atendimento_saude_mental_transtorno'
        ,'rededeapoio_completado'
        ,'rededeapoio_conselho_tutelar'
        ,'rededeapoio_outros'
        ,'rededeapoio_programa_protecao'
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