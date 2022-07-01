using GeekSpot.API.Data;
using GeekSpot.API.Interfaces;
using GeekSpot.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GeekSpot.API.Repositories
{
    public class ItemRepository : IItemRepository
    {
        public readonly Context _context;

        public ItemRepository(Context context)
        {
            _context = context;
        }

        public async Task<List<Item>> GetTodos()
        {
            var itens = await _context.Itens.OrderBy(n => n.Nome).AsNoTracking().ToListAsync();
            return itens;
        }

        public async Task<Item> GetPorId(int id)
        {
            var item = await _context.Itens.Where(i => i.ItemId == id).AsNoTracking().FirstOrDefaultAsync();
            return item;
        }

        public async Task<int> PostCriar(Item i)
        {
            _context.Add(i);
            var isOk = await _context.SaveChangesAsync();

            return isOk;
        }

        public async Task<int> PostAtualizar(Item i)
        {
            int isOk;

            try
            {
                _context.Update(i);
                isOk = await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return isOk;
        }

        public async Task<int> PostDeletar(int id)
        {
            var dados = await _context.Itens.FindAsync(id);

            if (dados == null)
            {
                throw new Exception("Registro com o id " + id + " não foi encontrado");
            }

            _context.Itens.Remove(dados);
            var isOk = await _context.SaveChangesAsync();

            return isOk;
        }

        private async Task<bool> IsExiste(int id)
        {
            return await _context.Itens.AnyAsync(i => i.ItemId == id);
        }
    }
}
