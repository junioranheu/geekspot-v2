using GeekSpot.Domain.DTO;

namespace GeekSpot.Application.Common.Interfaces.Authentication
{
    public interface IJwtTokenGenerator
    {
        string GerarToken(UsuarioSenhaDTO usuario);
    }
}
