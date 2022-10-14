import moment from 'moment';

export default function validarDataNascimento(data: any) {
    let isValido = moment(data, 'yyyy-MM-DD', true).isValid();
    return isValido;
}