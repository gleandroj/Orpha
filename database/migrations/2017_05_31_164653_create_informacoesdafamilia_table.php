<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInformacoesdafamiliaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('informacoesdafamilia', function (Blueprint $table) {
            $table->increments('id');

            /*$table->integer('crianca_id')->unsigned();
            $table->foreign('crianca_id')->references('id')->on('criancas');*/

            $table->integer('pia_id')->unsigned();
            $table->foreign('pia_id')->references('id')->on('pia');

            $table->boolean('atendimentorealizado_acolhimento')->default(0)->nullable();
            $table->boolean('atendimentorealizado_completado')->default(0)->nullable();
            $table->boolean('atendimentorealizado_encaminhado_grupo_pais_responsaveis')->default(0)->nullable();
            $table->boolean('atendimentorealizado_esclarecimento_fluxo_processo')->default(0)->nullable();
            $table->boolean('atendimentorealizado_orientacao_sobre_medidas_socioeducativas')->default(0)->nullable();
            $table->string('atendimentorealizado_outros')->nullable();
            $table->boolean('orientacaorealizada_completado')->default(0)->nullable();
            $table->boolean('orientacaorealizada_direitos_legais')->default(0)->nullable();
            $table->boolean('orientacaorealizada_direitos_providenciario')->default(0)->nullable();
            $table->boolean('orientacaorealizada_direitos_sociai')->default(0)->nullable();
            $table->boolean('orientacaorealizada_educacao_formal')->default(0)->nullable();
            $table->boolean('orientacaorealizada_educacao_profissional')->default(0)->nullable();
            $table->string('orientacaorealizada_outros')->nullable();
            $table->boolean('orientacaorealizada_planejamento_familiar')->default(0)->nullable();
            $table->boolean('orientacaorealizada_planejamento_orcamentario')->default(0)->nullable();
            $table->boolean('rededeapoio2_atendimento_social')->default(0)->nullable();
            $table->boolean('rededeapoio2_bolsa_familia')->default(0)->nullable();
            $table->boolean('rededeapoio2_cesta_basica')->default(0)->nullable();
            $table->boolean('rededeapoio2_completado')->default(0)->nullable();
            $table->boolean('rededeapoio2_custeio_transporte')->default(0)->nullable();
            $table->string('rededeapoio2_custo')->nullable();
            $table->boolean('rededeapoio2_equipamentos')->default(0)->nullable();
            $table->boolean('rededeapoio2_geracao_trabalho_renda')->default(0)->nullable();
            $table->string('rededeapoio2_local_residencia')->nullable();
            $table->string('rededeapoio2_numero_transporte')->nullable();
            $table->string('rededeapoio2_outros')->nullable();
            $table->boolean('rededeapoio2_programas_sociais')->default(0)->nullable();
            $table->boolean('rededeapoio_associacao_moradores')->default(0)->nullable();
            $table->boolean('rededeapoio_atendimento_juridico')->default(0)->nullable();
            $table->boolean('rededeapoio_atendimento_medic')->default(0)->nullable();
            $table->boolean('rededeapoio_atendimento_saude_mental_drogas')->default(0)->nullable();
            $table->boolean('rededeapoio_atendimento_saude_mental_transtorno')->default(0)->nullable();
            $table->boolean('rededeapoio_completado')->default(0)->nullable();
            $table->boolean('rededeapoio_conselho_tutelar')->default(0)->nullable();
            $table->string('rededeapoio_outros')->nullable();
            $table->boolean('rededeapoio_programa_protecao')->default(0)->nullable();

            $table->boolean("completado")->default(0)->nullable();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('informacoesdafamilia');
    }
}
