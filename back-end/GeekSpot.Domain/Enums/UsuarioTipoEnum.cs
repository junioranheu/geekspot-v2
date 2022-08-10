using System.ComponentModel;

namespace GeekSpot.Domain.Enums
{
    public enum UsuarioTipoEnum
    {
        Administrador = 1,

        [Description("Usuário")]
        Usuario = 2,

        Loja = 3
    }
}
