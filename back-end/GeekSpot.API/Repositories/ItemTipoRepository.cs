using GeekSpot.API.Data;
using GeekSpot.API.Interfaces;
using GeekSpot.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GeekSpot.API.Repositories
{
    public class ItemTipoRepository : IItemTipoRepository
    {
        public readonly Context _context;

        public ItemTipoRepository(Context context)
        {
            _context = context;
        }

        public async Task<List<ItemTipo>> GetTodos()
        {
            var itens = await _context.ItensTipos.OrderBy(t => t.Tipo).AsNoTracking().ToListAsync();
            return itens;
        }

        public async Task<ItemTipo> GetPorId(int id)
        {
            var item = await _context.ItensTipos.Where(it => it.ItemTipoId == id).AsNoTracking().FirstOrDefaultAsync();
            return item;
        }

        public async Task<int> PostCriar(ItemTipo it)
        {
            _context.Add(it);
            var isOk = await _context.SaveChangesAsync();

            return isOk;
        }

        public async Task<int> PostAtualizar(ItemTipo it)
        {
            int isOk;

            try
            {
                _context.Update(it);
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
            var dados = await _context.ItensTipos.FindAsync(id);

            if (dados == null)
            {
                throw new Exception("Registro com o id " + id + " não foi encontrado");
            }

            _context.ItensTipos.Remove(dados);
            var isOk = await _context.SaveChangesAsync();

            return isOk;
        }

        private async Task<bool> IsExiste(int id)
        {
            return await _context.ItensTipos.AnyAsync(it => it.ItemTipoId == id);
        }
    }
}
