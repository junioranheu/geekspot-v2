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

        public async Task? Adicionar(ItemDTO dto)
        {
            Item item = _map.Map<Item>(dto);

            _context.Add(item);
            await _context.SaveChangesAsync();
        }

        public async Task? Atualizar(ItemDTO dto)
        {
            Item item = _map.Map<Item>(dto);

            _context.Update(item);
            await _context.SaveChangesAsync();
        }

        public async Task? Deletar(int id)
        {
            var dados = await _context.Itens.FindAsync(id);

            if (dados == null)
            {
                throw new Exception("Registro com o id " + id + " não foi encontrado");
            }

            _context.Itens.Remove(dados);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ItemDTO>>? GetTodos()
        {
            var todos = await _context.Itens.
                        Include(u => u.Usuarios).ThenInclude(ut => ut.UsuariosTipos).
                        Include(u => u.Usuarios).ThenInclude(ui => ui.UsuariosInformacoes).
                        Include(it => it.ItensTipos).
                        Include(ii => ii.ItensImagens).
                        Where(i => i.IsAtivo == true).
                        OrderBy(n => n.Nome).AsNoTracking().ToListAsync();

            List<ItemDTO> dto = _map.Map<List<ItemDTO>>(todos);
            return dto;
        }

        public async Task<ItemDTO>? GetById(int id)
        {
            var byId = await _context.Itens.
                        Include(u => u.Usuarios).ThenInclude(ut => ut.UsuariosTipos).
                        Include(u => u.Usuarios).ThenInclude(ui => ui.UsuariosInformacoes).
                        Include(it => it.ItensTipos).
                        Include(ii => ii.ItensImagens).
                        Where(i => i.ItemId == id && i.IsAtivo == true).AsNoTracking().FirstOrDefaultAsync();

            ItemDTO dto = _map.Map<ItemDTO>(byId);
            return dto;
        }

        public async Task<List<ItemDTO>>? GetByItemTipoId(int itemTipoId)
        {
            var itens = await _context.Itens.
                        Include(u => u.Usuarios).ThenInclude(ut => ut.UsuariosTipos).
                        Include(u => u.Usuarios).ThenInclude(ui => ui.UsuariosInformacoes).
                        Include(it => it.ItensTipos).
                        Include(ii => ii.ItensImagens).
                        Where(it => it.ItemTipoId == itemTipoId && it.IsAtivo == true).AsNoTracking().ToListAsync();

            List<ItemDTO> dto = _map.Map<List<ItemDTO>>(itens);
            return dto;
        }

        public async Task<List<ItemDTO>>? GetByUsuarioId(int usuarioId)
        {
            var itens = await _context.Itens.
                        Include(u => u.Usuarios).ThenInclude(ut => ut.UsuariosTipos).
                        Include(u => u.Usuarios).ThenInclude(ui => ui.UsuariosInformacoes).
                        Include(it => it.ItensTipos).
                        Include(ii => ii.ItensImagens).
                        Where(it => it.UsuarioId == usuarioId && it.IsAtivo == true).AsNoTracking().ToListAsync();

            List<ItemDTO> dto = _map.Map<List<ItemDTO>>(itens);
            return dto;
        }
    }
}
