using GeekSpot.API.Models;

namespace GeekSpot.API.Interfaces
{
    public interface IItemRepository
    {
        Task<List<Item>> GetTodos();
        Task<Item> GetPorId(int id);
        Task<int> PostCriar(Item i);
        Task<int> PostAtualizar(Item i);
        Task<int> PostDeletar(int id);
        Task<List<Item>> GetPorItemTipoId(int itemTipoId);
        Task<List<Item>> GetPorUsuarioId(int usuarioId);
    }
}
