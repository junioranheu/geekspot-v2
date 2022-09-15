import Moment from 'moment';
import 'moment/locale/pt-br'; // Traduzir moment;

export default function formatarData(data: Date | string, estilo: number) {
    let dataFormatada = '';

    if (estilo === 1) {
        dataFormatada = Moment(data).locale('pt-br').format('DD/MM/YYYY');
    } else if (estilo === 2) {
        var diferencaDias = Moment().diff(data, 'days');
        // console.log(diferencaDias);

        if (diferencaDias === 0) {
            const isMesmoDia = Moment(data).isSame(Moment(), 'day');

            if (isMesmoDia) {
                dataFormatada = `Hoje, ${Moment(data).locale('pt-br').format('[às] HH:mm:ss')}`;
            } else {
                dataFormatada = `Ontem, ${Moment(data).locale('pt-br').format('[às] HH:mm:ss')}`;
            }
        } else if (diferencaDias === 1) {
            dataFormatada = `Ontem, ${Moment(data).locale('pt-br').format('[às] HH:mm:ss')}`;
        } else {
            dataFormatada = Moment(data).locale('pt-br').format('DD [de] MMMM [de] YYYY, [às] HH:mm:ss');
        }
    } else if (estilo === 3) {
        dataFormatada = Moment(data).locale('pt-br').format('MMMM/YYYY');
    } else {
        dataFormatada = '-';
    }

    return dataFormatada;
}