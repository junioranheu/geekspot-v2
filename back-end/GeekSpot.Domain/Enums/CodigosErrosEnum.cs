using System.ComponentModel;

namespace GeekSpot.Domain.Enums
{
    public enum CodigoErrosEnum
    {
        // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=- 100 =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        [Description("Já existe outro usuário cadastrado com este e-mail ou nome de usuário")]
        UsuarioExistente = 101,

        [Description("Tipo de usuário não permitido")]
        TipoUsuarioNaoPermitido = 102,

        [Description("Tipo de usuário não encontrado")]
        TipoUsuarioNaoEncontrado = 103,

        [Description("Os requisitos de senha não foram cumpridos. A senha deve ser mais segura")]
        RequisitosSenhaNaoCumprido = 104,

        [Description("O nome completo ou nome de usuário não atingem o mínimo de caracteres necessários")]
        RequisitosNome = 105,

        [Description("E-mail inválido")]
        EmailInvalido = 106,

        [Description("Usuário ou senha incorretos")]
        UsuarioSenhaIncorretos = 107,

        [Description("Esta conta está desativada")]
        ContaDesativada = 108,

        [Description("Este usuário não foi encontrado")]
        UsuarioNaoEncontrado = 109,

        [Description("Não autorizado")]
        NaoAutorizado = 110,

        [Description("Este código de verificação é inválido")]
        CodigoVerificacaoInvalido = 111,

        [Description("Este código de verificação está expirado")]
        CodigoVerificacaoExpirado = 112,

        [Description("Esta conta já se encontra verificada portanto não é possível verificá-la novamente")]
        ContaJaVerificada = 113,

        [Description("Esta conta ainda não foi verificada. Um novo e-mail foi enviado para você. Verifique-a e tente novamente mais tarde")]
        ContaNaoVerificadaMasNovoEmailVerificacaoEnviado = 114,

        [Description("Esta conta ainda não foi verificada. Além disso, houve um erro ao enviar um novo e-mail de vericação. Tente novamente mais tarde")]
        ContaNaoVerificadaComFalhaNoEnvioNovoEmailVerificacao = 115,

        // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=- 400 =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        [Description("Dado não encontrado")]
        NaoEncontrado = 404,

        // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=- 500 =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        [Description("Este usuário já está sendo seguido por você")]
        UsuarioJaSegue = 510,

        [Description("Esse usuário não existe, portanto não é possível realizar essa ação")]
        UsuarioNaoExiste = 511,
    }
}
