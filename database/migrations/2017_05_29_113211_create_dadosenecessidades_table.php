<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDadosenecessidadesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dadosenecessidades', function (Blueprint $table) {
            $table->increments('id');

            /*$table->integer('crianca_id')->unsigned();
            $table->foreign('crianca_id')->references('id')->on('criancas');*/

            $table->integer('pia_id')->unsigned();
            $table->foreign('pia_id')->references('id')->on('pia');

            $table->boolean("documentacao_certidao_nascimento")->default(0)->nullable();
            $table->boolean("documentacao_historico_escolar")->default(0)->nullable();
            $table->boolean("documentacao_declaracao_escolar")->default(0)->nullable();
            $table->string("documentacao_rg")->nullable();
            $table->string("documentacao_cpf")->nullable();
            $table->string("documentacao_titulo_eleitoral")->nullable();
            $table->string("documentacao_ctps")->nullable();
            $table->string("documentacao_reservista")->nullable();
            $table->string("documentacao_outros")->nullable();
            $table->boolean("documentacao_completado")->default(0)->nullable();

            $table->boolean("necessidades_enfermagem")->default(0)->nullable();
            $table->boolean("necessidades_medico")->default(0)->nullable();
            $table->boolean("necessidades_nutricao")->default(0)->nullable();
            $table->boolean("necessidades_odontologia")->default(0)->nullable();
            $table->boolean("necessidades_oftalmologia")->default(0)->nullable();
            $table->boolean("necessidades_psicologia")->default(0)->nullable();
            $table->boolean("necessidades_psiquiatria")->default(0)->nullable();
            $table->boolean("necessidades_servico_social")->default(0)->nullable();
            $table->boolean("necessidades_tratamento_drogas")->default(0)->nullable();
            $table->boolean("necessidades_musicoterapia")->default(0)->nullable();
            $table->boolean("necessidades_ter_ocupacional")->default(0)->nullable();
            $table->boolean("necessidades_pedagogia")->default(0)->nullable();
            $table->string("necessidades_outros")->nullable();
            $table->boolean("necessidades_completado")->default(0)->nullable();

            $table->enum("rededeapoio_equipamentos", ['contato', 'encaminhar'])->default('encaminhar')->nullable();
            $table->enum("rededeapoio_familia_extensa", ['contato', 'encaminhar'])->default('encaminhar')->nullable();
            $table->enum("rededeapoio_pais_responsaveis", ['contato', 'encaminhar'])->default('encaminhar')->nullable();
            $table->enum("rededeapoio_programas_apoio_comunitario", ['contato', 'encaminhar'])->default('encaminhar')->nullable();
            $table->enum("rededeapoio_programas_protecao", ['contato', 'encaminhar'])->default('encaminhar')->nullable();
            $table->enum("rededeapoio_servico_atendimento_vitimias_maus_tratos", ['contato', 'encaminhar'])->default('encaminhar')->nullable();
            $table->string("rededeapoio_outros")->nullable();
            $table->boolean("rededeapoio_completado")->default(0)->nullable();

            $table->boolean("religiosidade_atividade_religiosa")->default(0)->nullable();
            $table->boolean("religiosidade_assistencia_religiosa")->default(0)->nullable();
            $table->string("religiosidade_denominacao_religiosa")->nullable();
            $table->string("religiosidade_outros")->nullable();
            $table->boolean("religiosidade_completado")->default(0)->nullable();

            $table->string("atividades_escolarizacao")->nullable();
            $table->string("atividades_curso_profissionalizante")->nullable();
            $table->string("atividades_atividades_artisticas")->nullable();
            $table->string("atividades_atividades_culturais")->nullable();
            $table->string("atividades_atividades_esportivas")->nullable();
            $table->string("atividades_outros")->nullable();
            $table->boolean("atividades_completado")->default(0)->nullable();

            $table->string("tratamentos_medico")->nullable();
            $table->string("tratamentos_nutricao")->nullable();
            $table->string("tratamentos_odontologia")->nullable();
            $table->string("tratamentos_psicologia")->nullable();
            $table->string("tratamentos_psiquiatria")->nullable();
            $table->string("tratamentos_servico_social")->nullable();
            $table->string("tratamentos_uso_drogras")->nullable();
            $table->string("tratamentos_atendimento_hospitalar")->nullable();
            $table->string("tratamentos_outros")->nullable();
            $table->boolean("tratamentos_completado")->default(0)->nullable();

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
        Schema::dropIfExists('dadosenecessidades');
    }
}
