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

        [Description("Conta desativada")]
        ContaDesativada = 108,

        [Description("Usuário não encontrado")]
        UsuarioNaoEncontrado = 109,

        [Description("Não autorizado")]
        NaoAutorizado = 110,

        [Description("Código de verificação inválido")]
        CodigoVerificacaoInvalido = 111,

        [Description("Código de verificação expirado")]
        CodigoVerificacaoExpirado = 112,

        [Description("Conta já se encontra verificada")]
        ContaJaVerificada = 113,

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
