using GeekSpot.Domain.DTO;
using System.Security.Claims;

namespace GeekSpot.Application.Common.Interfaces.Authentication
{
    public interface IJwtTokenGenerator
    {
        string GerarToken(UsuarioSenhaDTO usuario, IEnumerable<Claim>? listaClaims);
        string GerarRefreshToken();
        ClaimsPrincipal? GetInfoTokenExpirado(string? token);
    }
}
