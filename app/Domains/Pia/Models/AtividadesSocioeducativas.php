<?php

namespace Orpha\Domains\Pia\Models;

use Orpha\Support\Models\Model;

class AtividadesSocioeducativas extends Model
{
    protected $table = 'atividades_socio_educativas';

    protected $fillable = [
        'educacao_cidadania_reflexao_ato_infracional',
        'educacao_cidadania_orientacao_medidas_socioeducativas',
        'educacao_cidadania_orientacao_mundo_trabalho',
        'educacao_cidadania_empreendedorismo',
        'educacao_cidadania_constituicao_federal',
        'educacao_cidadania_eca_direitos_deveres',
        'educacao_cidadania_familia',
        'educacao_cidadania_coletividade',
        'educacao_cidadania_orientacao_processo_escolarizacao',
        'educacao_cidadania_outros',
        'educacao_cidadania_completado',

        'educacao_meio_ambiente_poluicao_cuidados',
        'educacao_meio_ambiente_material_reciclavel',
        'educacao_meio_ambiente_sustentabilidade',
        'educacao_meio_ambiente_completado',

        'educacao_saude_alimentacao',
        'educacao_saude_cuidado_higiene_pessoal',
        'educacao_saude_exame_preventivo_periodico',
        'educacao_saude_metodos_contraceptivos',
        'educacao_saude_saude_bucal',
        'educacao_saude_saude_mental',
        'educacao_saude_sexualidade',
        'educacao_saude_paternidade',
        'educacao_saude_programa_tuberculose',
        'educacao_saude_programa_hanseniase',
        'educacao_saude_uso_abuso_alcool_drogas',
        'educacao_saude_outros',
        'educacao_saude_completado',
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