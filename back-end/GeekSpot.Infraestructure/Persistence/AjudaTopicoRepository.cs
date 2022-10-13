using AutoMapper;
using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Domain.DTO;
using GeekSpot.Domain.Entities;
using GeekSpot.Infraestructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GeekSpot.Infraestructure.Persistence
{
    public class AjudaTopicoRepository : IAjudaTopicoRepository
    {
        public readonly Context _context;
        private readonly IMapper _map;

        public AjudaTopicoRepository(Context context, IMapper map)
        {
            _context = context;
            _map = map;
        }

        public async Task? Adicionar(AjudaTopicoDTO dto)
        {
            AjudaTopico ajudaTopico = _map.Map<AjudaTopico>(dto);

            _context.Add(ajudaTopico);
            await _context.SaveChangesAsync();
        }

        public async Task? Atualizar(AjudaTopicoDTO dto)
        {
            AjudaTopico ajudaTopico = _map.Map<AjudaTopico>(dto);

            _context.Update(ajudaTopico);
            await _context.SaveChangesAsync();
        }

        public async Task? Deletar(int id)
        {
            var dados = await _context.AjudasTopicos.FindAsync(id);

            if (dados == null)
            {
                throw new Exception("Registro com o id " + id + " não foi encontrado");
            }

            _context.AjudasTopicos.Remove(dados);
            await _context.SaveChangesAsync();
        }

        public async Task<List<AjudaTopicoDTO>>? GetTodos()
        {
            var todos = await _context.AjudasTopicos.Where(i => i.IsAtivo == true).OrderBy(at => at.AjudaTopicoId).AsNoTracking().ToListAsync();

            List<AjudaTopicoDTO> dto = _map.Map<List<AjudaTopicoDTO>>(todos);
            return dto;
        }

        public async Task<AjudaTopicoDTO>? GetById(int id)
        {
            var itens = await _context.AjudasTopicos.Where(at => at.AjudaTopicoId == id && at.IsAtivo == true).AsNoTracking().FirstOrDefaultAsync();

            AjudaTopicoDTO dto = _map.Map<AjudaTopicoDTO>(itens);
            return dto;
        }
    }
}
