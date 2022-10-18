using AutoMapper;
using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Domain.DTO;
using GeekSpot.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using static GeekSpot.Utils.Biblioteca;

namespace GeekSpot.Infrastructure.Persistence
{
    public class SistemaRepository : ISistemaRepository
    {
        public readonly Context _context;
        private readonly IMapper _map;

        public SistemaRepository(Context context, IMapper map)
        {
            _context = context;
            _map = map;
        }

        public async Task<List<EstadoDTO>>? GetTodosEstados()
        {
            var todos = await _context.Estados.
                        Where(i => i.IsAtivo == true).
                        OrderBy(n => n.Nome).AsNoTracking().ToListAsync();

            List<EstadoDTO> dto = _map.Map<List<EstadoDTO>>(todos);
            return dto;
        }

        public async Task<List<CidadeDTO>>? GetTodasCidades(int estadoId)
        {
            var todos = await _context.Cidades.
                        Include(e => e.Estados).
                        Where(e => e.EstadoId == estadoId && e.IsAtivo == true).
                        OrderBy(n => n.Nome).AsNoTracking().ToListAsync();

            List<CidadeDTO> dto = _map.Map<List<CidadeDTO>>(todos);
            return dto;
        }

        public List<DateTime>? GetListaDataAtual()
        {
            List<DateTime> listaHoraAtual = new()
            {
                DateTime.Now,
                HorarioBrasilia()
            };

            return listaHoraAtual;
        }
    }
}
