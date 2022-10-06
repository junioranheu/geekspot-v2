import { Dispatch, FocusEventHandler } from 'react';
import InputMask from 'react-input-mask';

interface iParametros {
    className: string;
    name: string;
    onChange: Dispatch<any>;
    value: string | undefined | null;
    mascara: string
    onBlur: FocusEventHandler<HTMLInputElement> | undefined;
    placeholder: string;
    isDisabled: boolean;
}

export default function InputMascara({ className, name, onChange, value, mascara, onBlur, placeholder, isDisabled }: iParametros) {
    return (
        <InputMask
            className={className}
            name={name}
            onChange={onChange}
            value={value ?? ''}
            mask={mascara}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={isDisabled}
        />
    )
}