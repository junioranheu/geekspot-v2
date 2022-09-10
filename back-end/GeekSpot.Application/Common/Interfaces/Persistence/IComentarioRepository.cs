using GeekSpot.Domain.DTO;

namespace GeekSpot.Application.Common.Interfaces.Persistence
{
    public interface IComentarioRepository
    {
        Task Adicionar(ComentarioDTO dto);
        Task Atualizar(ComentarioDTO dto);
        Task Deletar(int id);
        Task<List<ComentarioDTO>>? GetTodos();
        Task<ComentarioDTO>? GetPorId(int id);
        Task<List<ComentarioDTO>>? GetPorItemId(int itemId);
    }
}
