using GeekSpot.Domain.DTO;

namespace GeekSpot.Application.Common.Interfaces.Persistence
{
    public interface IUsuarioRepository
    {
        bool Adicionar(UsuarioSenhaDTO dto);
        UsuarioSenhaDTO? GetPorEmail(string email);
    }
}
