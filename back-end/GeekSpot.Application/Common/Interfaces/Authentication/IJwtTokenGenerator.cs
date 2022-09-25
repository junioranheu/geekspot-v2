using GeekSpot.Domain.DTO;
using System.Security.Claims;

namespace GeekSpot.Application.Common.Interfaces.Authentication
{
    public interface IJwtTokenGenerator
    {
        string GerarToken(UsuarioSenhaDTO usuario);
        string GerarToken(IEnumerable<Claim> claims);
        string GerarRefreshToken();
        ClaimsPrincipal? GetInfoTokenExpirado(string? token);
    }
}
