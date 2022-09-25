using GeekSpot.Domain.DTO;

namespace GeekSpot.Application.Common.Interfaces.Persistence
{
    public interface IRefreshTokenRepository
    {
        Task? Adicionar(RefreshTokenDTO dto);
        Task<string>? GetRefreshTokenByUsuarioId(int usuarioId);
    }
}
