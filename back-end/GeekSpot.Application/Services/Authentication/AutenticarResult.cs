using GeekSpot.Domain.DTO;

namespace GeekSpot.Application.Services.Authentication
{
    public record AutenticarResult(
        UsuarioSenhaDTO Usuario,
        string Token
    );
}
