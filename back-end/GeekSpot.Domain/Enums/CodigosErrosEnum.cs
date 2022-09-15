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

        [Description("Usuário ou senha incorretos")]
        UsuarioSenhaIncorretos = 105,

        [Description("Conta desativada")]
        ContaDesativada = 106,

        [Description("Usuário não encontrado")]
        UsuarioNaoEncontrado = 107,

        [Description("Não autorizado")]
        NaoAutorizado = 108,

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
