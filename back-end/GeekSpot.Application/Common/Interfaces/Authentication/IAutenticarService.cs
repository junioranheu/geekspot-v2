using GeekSpot.Domain.DTO;

namespace GeekSpot.Application.Common.Interfaces.Authentication
{
    public interface IAutenticarService
    {
        UsuarioDTO Registrar(UsuarioSenhaDTO dto);
        UsuarioDTO Login(UsuarioSenhaDTO dto);
    }
}
