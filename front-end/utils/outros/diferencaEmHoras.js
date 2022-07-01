import Moment from 'moment';

export default function diferencaEmHoras(dataUm, dataDois) {
    var duracao = Moment.duration(dataUm.diff(dataDois));
    var diferencaHoras = duracao.asHours();

    return diferencaHoras;
}