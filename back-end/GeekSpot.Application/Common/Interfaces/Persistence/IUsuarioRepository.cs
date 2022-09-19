using GeekSpot.Domain.DTO;

namespace GeekSpot.Application.Common.Interfaces.Persistence
{
    public interface IUsuarioRepository
    {
        Task<UsuarioDTO>? Adicionar(UsuarioSenhaDTO dto);
        Task<UsuarioDTO>? Atualizar(UsuarioSenhaDTO dto);
        Task<List<UsuarioDTO>> GetTodos();
        Task<UsuarioDTO>? GetPorId(int id);
        Task<UsuarioSenhaDTO>? GetPorEmailOuUsuarioSistema(string? email, string? nomeUsuarioSistema);
        Task? AtualizarFoto(int usuarioId, string foto);
    }
}
