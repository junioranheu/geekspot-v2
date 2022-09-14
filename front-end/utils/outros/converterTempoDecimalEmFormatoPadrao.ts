import moment from 'moment';

// https://stackoverflow.com/a/44071876;
export default function converterTempoDecimalEmFormatoPadrao(tempo: number, tipoDuracao: any) {
    const d = moment.duration(tempo, tipoDuracao);

    return [
        ('0' + d.hours()).slice(-2),
        ('0' + d.minutes()).slice(-2),
        ('0' + d.seconds()).slice(-2),
    ].join(':')
}