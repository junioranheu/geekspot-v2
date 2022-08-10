using GeekSpot.Domain.DTO;

namespace GeekSpot.Application.Common.Interfaces.Persistence
{
    public interface IItemRepository
    {
        Task Adicionar(ItemDTO dto);
        Task Atualizar(ItemDTO dto);
        Task Deletar(int id);
        Task<List<ItemDTO>>? GetTodos();
        Task<ItemDTO>? GetPorId(int id);
        Task<List<ItemDTO>>? GetPorItemTipoId(int itemTipoId);
        Task<List<ItemDTO>>? GetPorUsuarioId(int usuarioId);
    }
}
