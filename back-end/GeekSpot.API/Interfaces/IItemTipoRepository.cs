using GeekSpot.API.Models;

namespace GeekSpot.API.Interfaces
{
    public interface IItemTipoRepository
    {
        Task<List<ItemTipo>> GetTodos();
        Task<ItemTipo> GetPorId(int id);
        Task<int> PostCriar(ItemTipo it);
        Task<int> PostAtualizar(ItemTipo it);
        Task<int> PostDeletar(int id);
    }
}
