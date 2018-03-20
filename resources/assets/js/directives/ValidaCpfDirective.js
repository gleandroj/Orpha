/**
 * Created by FG0003 on 13/02/2017.
 */
function TestaCPF(strCPF) {
    let Soma, i;
    let Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) )) return false;
    return true;
}

export let ValidaCpfDirective = {
    selector:'validaCpf',
    fn: ['OrphaUtilService', (OrphaUtilService)=>{

        return {
            require:'ngModel',
            link:(scope, element, attrs, $ctrl)=>{

                function validaCpf(value) {
                    if (value != null && value.length == 14) {
                        $ctrl.$setValidity('valida-cpf', TestaCPF(value.replace(/(\.)|(-)/g, '')));
                    }
                    return value;
                }

                $ctrl.$parsers.push(validaCpf);
            }
        }
    }]
};