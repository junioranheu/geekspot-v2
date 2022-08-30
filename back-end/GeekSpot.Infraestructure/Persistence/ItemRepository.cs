using AutoMapper;
using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Domain.DTO;
using GeekSpot.Domain.Entities;
using GeekSpot.Infraestructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GeekSpot.Infraestructure.Persistence
{
    public class ItemRepository : IItemRepository
    {
        public readonly Context _context;
        private readonly IMapper _map;

        public ItemRepository(Context context, IMapper map)
        {
            _context = context;
            _map = map;
        }

        public async Task Adicionar(ItemDTO dto)
        {
            Item item = _map.Map<Item>(dto);

            _context.Add(item);
            await _context.SaveChangesAsync();
        }

        public async Task Atualizar(ItemDTO dto)
        {
            Item item = _map.Map<Item>(dto);

            _context.Update(item);
            await _context.SaveChangesAsync();
        }

        public async Task Deletar(int id)
        {
            var dados = await _context.Itens.FindAsync(id);

            if (dados == null)
            {
                throw new Exception("Registro com o id " + id + " não foi encontrado");
            }

            _context.Itens.Remove(dados);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ItemDTO>> GetTodos()
        {
            var todos = await _context.Itens.
                        Include(u => u.Usuarios).ThenInclude(ut => ut.UsuariosTipos).
                        Include(it => it.ItensTipos).
                        Include(ii => ii.ItensImagens).
                        Where(i => i.IsAtivo == 1).
                        OrderBy(n => n.Nome).AsNoTracking().ToListAsync();

            List<ItemDTO> dto = _map.Map<List<ItemDTO>>(todos);
            return dto;
        }

        public async Task<ItemDTO> GetPorId(int id)
        {
            var porId = await _context.Itens.
                        Include(u => u.Usuarios).ThenInclude(ut => ut.UsuariosTipos).
                        Include(it => it.ItensTipos).
                        Include(ii => ii.ItensImagens).
                        Where(i => i.IsAtivo == 1).
                        Where(i => i.ItemId == id).AsNoTracking().FirstOrDefaultAsync();

            ItemDTO dto = _map.Map<ItemDTO>(porId);
            return dto;
        }

        public async Task<List<ItemDTO>> GetPorItemTipoId(int itemTipoId)
        {
            var itens = await _context.Itens.
                        Include(u => u.Usuarios).ThenInclude(ut => ut.UsuariosTipos).
                        Include(it => it.ItensTipos).
                        Include(ii => ii.ItensImagens).
                        Where(i => i.IsAtivo == 1).
                        Where(it => it.ItemTipoId == itemTipoId).AsNoTracking().ToListAsync();

            List<ItemDTO> dto = _map.Map<List<ItemDTO>>(itens);
            return dto;
        }

        public async Task<List<ItemDTO>> GetPorUsuarioId(int usuarioId)
        {
            var itens = await _context.Itens.
                        Include(u => u.Usuarios).ThenInclude(ut => ut.UsuariosTipos).
                        Include(it => it.ItensTipos).
                        Include(ii => ii.ItensImagens).
                        Where(i => i.IsAtivo == 1).
                        Where(it => it.UsuarioId == usuarioId).AsNoTracking().ToListAsync();

            List<ItemDTO> dto = _map.Map<List<ItemDTO>>(itens);
            return dto;
        }
    }
}
