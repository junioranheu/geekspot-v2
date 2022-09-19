using AutoMapper;
using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Domain.DTO;
using GeekSpot.Domain.Entities;
using GeekSpot.Infraestructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GeekSpot.Infraestructure.Persistence
{
    public class ItemTipoRepository : IItemTipoRepository
    {
        public readonly Context _context;
        private readonly IMapper _map;

        public ItemTipoRepository(Context context, IMapper map)
        {
            _context = context;
            _map = map;
        }

        public async Task? Adicionar(ItemTipoDTO dto)
        {
            ItemTipo itemTipo = _map.Map<ItemTipo>(dto);

            _context.Add(itemTipo);
            await _context.SaveChangesAsync();
        }

        public async Task? Atualizar(ItemTipoDTO dto)
        {
            ItemTipo itemTipo = _map.Map<ItemTipo>(dto);

            _context.Update(itemTipo);
            await _context.SaveChangesAsync();
        }

        public async Task? Deletar(int id)
        {
            var dados = await _context.ItensTipos.FindAsync(id);

            if (dados == null)
            {
                throw new Exception("Registro com o id " + id + " não foi encontrado");
            }

            _context.ItensTipos.Remove(dados);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ItemTipoDTO>>? GetTodos()
        {
            var todos = await _context.ItensTipos.Where(i => i.IsAtivo == 1).OrderBy(n => n.Tipo).AsNoTracking().ToListAsync();

            List<ItemTipoDTO> dto = _map.Map<List<ItemTipoDTO>>(todos);
            return dto;
        }

        public async Task<ItemTipoDTO>? GetById(int id)
        {
            var itens = await _context.ItensTipos.AsNoTracking().FirstOrDefaultAsync();

            ItemTipoDTO dto = _map.Map<ItemTipoDTO>(itens);
            return dto;
        }
    }
}
