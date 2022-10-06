import { Dispatch } from 'react';

export default function limitarCaracterInput(limiteCaracteres: number, set: Dispatch<any>, event: any) {
    set(event.target.value.slice(0, limiteCaracteres));
}