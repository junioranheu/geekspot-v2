import { ChangeEvent, Dispatch, FocusEventHandler } from 'react';
import InputMask from 'react-input-mask';

interface iParametros {
    className: string;
    name: string;
    useState: any;
    setUseState: Dispatch<any>;
    value: string | undefined | null;
    mascara: string
    onBlur: FocusEventHandler<HTMLInputElement> | undefined;
    placeholder: string;
    isDisabled: boolean;
}

export default function MascaraInput({ className, name, useState, setUseState, value, mascara, onBlur, placeholder, isDisabled }: iParametros) {

    const valorFormatado = (str: string) => str.replace(/[^0-9]/g, '');

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setUseState({ ...useState, name: valorFormatado(e?.target?.value) });
    }

    return (
        <InputMask
            className={className}
            name={name}
            onChange={handleChange}
            // @ts-ignore;
            value={value}
            mask={mascara}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={isDisabled}
        />
    )
}