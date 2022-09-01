import nProgress from 'nprogress';
import { Aviso } from './aviso';

export default function verificarDadosCriarConta(form, refNomeCompleto, refEmail, refNomeUsuario, refSenha, refConfirmarSenha, isTrocouSenha) {
    // console.log(form);

    // Verificação do nome #1: nome preenchido?;
    if (!form.nomeCompleto) {
        nProgress.done();
        Aviso.warn('Parece que você esqueceu de colocar o seu <b>nome</b>', 5000);
        refNomeCompleto.current.select();
        refSenha.current.value = '';
        refConfirmarSenha.current.value = '';
        return false;
    }

    // Verificação do nome #2: pelo menos 03 caracteres?;
    if (form.nomeCompleto.length < 3) {
        nProgress.done();
        Aviso.warn('Seu <b>nome</b> não pode ter menos de 03 caracteres!', 5000);
        refNomeCompleto.current.select();
        refSenha.current.value = '';
        refConfirmarSenha.current.value = '';
        return false;
    }

    // Verificação do nome #3: se existe pelo menos um espaço (dois nomes), false = não;
    var reg = new RegExp("(\\w+)(\\s+)(\\w+)");
    if (reg.test(form.nomeCompleto) === false) {
        nProgress.done();
        Aviso.warn(`<b>${form.nomeCompleto}</b> é um belo nome, mas cadê seu sobrenome?`, 5000);
        refNomeCompleto.current.select();
        refSenha.current.value = '';
        refConfirmarSenha.current.value = '';
        return false;
    }

    // Verificação de e-mail #1: e-mail preenchido?;
    if (!form.email) {
        nProgress.done();
        Aviso.warn('Parece que você esqueceu de colocar o seu <b>e-mail</b>', 5000);
        refEmail.current.select();
        refSenha.current.value = '';
        refConfirmarSenha.current.value = '';
        return false;
    }

    // Verificação de e-mail #2: e-mail válido?;
    if (checarEmail(form.email) === false) {
        nProgress.done();
        Aviso.warn('Parece que esse <b>e-mail</b> não é válido...', 5000);
        refEmail.current.select();
        refSenha.current.value = '';
        refConfirmarSenha.current.value = '';
        return false;
    }

    // Verificação de nome de usuário #1: nome de usuário preenchido?;
    if (!form.nomeUsuarioSistema) {
        nProgress.done();
        Aviso.warn('Parece que você esqueceu de colocar um <b>nome de usuário</b>', 5000);
        refNomeUsuario.current.select();
        refSenha.current.value = '';
        refConfirmarSenha.current.value = '';
        return false;
    }

    // Verificação de nome de usuário #2: pelo menos 03 caracteres?;
    if (form.nomeUsuarioSistema.length > 20 || form.nomeUsuarioSistema.length < 4) {
        nProgress.done();
        Aviso.warn('O <b>nome de usuário</b> não pode ter não pode ter menos de 4 e nem mais de 10 caracteres, e agora está com ' + form.nomeUsuarioSistema.length + '!', 5000);
        refNomeUsuario.current.select();
        refSenha.current.value = '';
        refConfirmarSenha.current.value = '';
        return false;
    }

    // Se a chamada vem da tela de criar nova conta, verifique a senha também;
    if (isTrocouSenha) {
        // Verificação de senha #1: senha preenchida?;
        if (!form.senha) {
            nProgress.done();
            Aviso.warn('Parece que você esqueceu de colocar sua <b>senha</b>', 5000);
            refSenha.current.select();
            return false;
        }

        // Verificação da senha #2: realizar uma série de verificações, se alguma retornar falso, aborte;
        if (checarSenha(form.senha, form, refSenha, refConfirmarSenha) === false) {
            nProgress.done();
            return false;
        }

        // Checar se os dois campos de senha coincidem;
        if (form.senha !== form.confirmarSenha) {
            nProgress.done();
            Aviso.warn('As <b>senhas</b> não estão idênticas! Tente novamente', 5000);
            refSenha.current.select();
            refSenha.current.value = '';
            refConfirmarSenha.current.value = '';
            return false;
        }
    }

    return true;
}

function checarSenha(senha, form, refSenha, refConfirmarSenha) {
    var number = /([0-9])/;
    var alphabets = /([a-zA-Z])/;
    // var special_characters = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;

    if (senha.length < 6) {
        Aviso.warn('Sua <b>senha</b> deve ter pelo menos 06 caracteres', 6000);
        refSenha.current.select();
        refSenha.current.value = '';
        refConfirmarSenha.current.value = '';
        form.senha = '';
        return false;
    } else {
        if (senha.match(number) && senha.match(alphabets)) { // && senha.match(special_characters)
            // Aviso.success('Sua senha é bem forte!', 6000);
            return true;
        } else {
            Aviso.warn('Sua <b>senha</b> não é forte o suficiente<br/>Lembre-se de usar: letras e números!', 6000);
            refSenha.current.select();
            refSenha.current.value = '';
            refConfirmarSenha.current.value = '';
            form.senha = '';
            return false;
        }
    }
}

function checarEmail(email) {
    //var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var regex = /^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}