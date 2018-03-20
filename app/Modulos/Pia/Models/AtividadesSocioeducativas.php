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

class AtividadesSocioeducativas extends Model
{
    use SoftDeletes;

    protected $table = 'atividadessocioeducativas';

    protected $fillable = [
        'educacaoecidadania_reflexao_ato_infracional',
        'educacaoecidadania_orientacao_medidas_socioeducativas',
        'educacaoecidadania_orientacao_mundo_trabalho',
        'educacaoecidadania_empreendedorismo',
        'educacaoecidadania_constituicao_federal',
        'educacaoecidadania_eca_direitos_deveres',
        'educacaoecidadania_familia',
        'educacaoecidadania_coletividade',
        'educacaoecidadania_orientacao_processo_escolarizacao',
        'educacaoecidadania_outros',
        'educacaoecidadania_completado',

        'educacaoemeioambiente_poluicao_cuidados',
        'educacaoemeioambiente_material_reciclavel',
        'educacaoemeioambiente_sustentabilidade',
        'educacaoemeioambiente_completado',

        'educacaoesaude_alimentacao',
        'educacaoesaude_cuidado_higiene_pessoal',
        'educacaoesaude_exame_preventivo_periodico',
        'educacaoesaude_metodos_contraceptivos',
        'educacaoesaude_saude_bucal',
        'educacaoesaude_saude_mental',
        'educacaoesaude_sexualidade',
        'educacaoesaude_paternidade',
        'educacaoesaude_programa_tuberculose',
        'educacaoesaude_programa_hanseniase',
        'educacaoesaude_uso_abuso_alcool_drogas',
        'educacaoesaude_outros',
        'educacaoesaude_completado',
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