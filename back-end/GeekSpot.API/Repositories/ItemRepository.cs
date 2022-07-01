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
            var todos = await _context.Itens.
                Include(u => u.Usuarios).ThenInclude(ut => ut.UsuariosTipos).
                Include(it => it.ItensTipos).
                OrderBy(n => n.Nome).AsNoTracking().ToListAsync();

            // Esconder alguns atributos;
            foreach (var item in todos)
            {
                item.Usuarios.Senha = "";
            }

            return todos;
        }

        public async Task<Item> GetPorId(int id)
        {
            var porId = await _context.Itens.
                Include(u => u.Usuarios).ThenInclude(ut => ut.UsuariosTipos).
                Include(it => it.ItensTipos).
                Where(i => i.ItemId == id).AsNoTracking().FirstOrDefaultAsync();

            // Esconder alguns atributos;
            porId.Usuarios.Senha = "";

            return porId;
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

        public async Task<List<Item>> GetPorItemTipoId(int itemTipoId)
        {
            var itens = await _context.Itens.
                Include(u => u.Usuarios).ThenInclude(ut => ut.UsuariosTipos).
                Include(it => it.ItensTipos).
                Where(it => it.ItemTipoId == itemTipoId).AsNoTracking().ToListAsync();

            // Esconder alguns atributos;
            foreach (var item in itens)
            {
                item.Usuarios.Senha = "";
            }

            return itens;
        }

        public async Task<List<Item>> GetPorUsuarioId(int usuarioId)
        {
            var itens = await _context.Itens.
                   Include(u => u.Usuarios).ThenInclude(ut => ut.UsuariosTipos).
                   Include(it => it.ItensTipos).
                   Where(it => it.UsuarioId == usuarioId).AsNoTracking().ToListAsync();

            // Esconder alguns atributos;
            foreach (var item in itens)
            {
                item.Usuarios.Senha = "";
            }

            return itens;
        }
    }
}
