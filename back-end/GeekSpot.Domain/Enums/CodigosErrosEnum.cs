using System.ComponentModel;

namespace GeekSpot.Domain.Enums
{
    public enum CodigoErrosEnum
    {
        [Description("Já existe outro usuário cadastrado com este e-mail")]
        UsuarioExistente = 101,

        [Description("Tipo de usuário não permitido")]
        TipoUsuarioNaoPermitido = 102,

        [Description("Tipo de usuário não encontrado")]
        TipoUsuarioNaoEncontrado = 103,

        [Description("Requisitos de senha não cumprido")]
        RequisitosSenhaNaoCumprido = 104,

        [Description("Usuário ou senha incorretos")]
        UsuarioSenhaIncorretos = 105,

        [Description("Conta desativada")]
        ContaDesativada = 106,

        [Description("Usuário não encontrado")]
        UsuarioNaoEncontrado = 107,

        [Description("Dado não encontrado")]
        NaoEncontrado = 500,
    }
}
