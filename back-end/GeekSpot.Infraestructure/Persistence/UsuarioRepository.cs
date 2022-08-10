using AutoMapper;
using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Domain.DTO;
using GeekSpot.Domain.Entities;
using GeekSpot.Infraestructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GeekSpot.Infraestructure.Persistence
{
    public class UsuarioRepository : IUsuarioRepository
    {
        public readonly Context _context;
        private readonly IMapper _map;

        public UsuarioRepository(Context context, IMapper map)
        {
            _map = map;
            _context = context;
        }

        public async Task<UsuarioDTO>? Adicionar(UsuarioSenhaDTO dto)
        {
            Usuario usuario = _map.Map<Usuario>(dto);
            UsuarioDTO usuarioDto = _map.Map<UsuarioDTO>(dto);

            _context.Add(usuario);
            await _context.SaveChangesAsync();
            return usuarioDto;
        }

        public async Task<UsuarioDTO>? Atualizar(UsuarioSenhaDTO dto)
        {
            Usuario usuario = _map.Map<Usuario>(dto);
            UsuarioDTO usuarioDto = _map.Map<UsuarioDTO>(dto);

            _context.Update(usuario);
            await _context.SaveChangesAsync();
            return usuarioDto;
        }

        public async Task Deletar(int id)
        {
            var dados = await _context.Usuarios.FindAsync(id);

            if (dados == null)
            {
                throw new Exception("Registro com o id " + id + " não foi encontrado");
            }

            _context.Usuarios.Remove(dados);
            await _context.SaveChangesAsync();
        }

        public async Task<List<UsuarioDTO>> GetTodos()
        {
            var todos = await _context.Usuarios.
                        Include(ut => ut.UsuariosTipos).
                        Include(ui => ui.UsuariosInformacoes).
                        OrderBy(ui => ui.UsuarioId).AsNoTracking().ToListAsync();

            List<UsuarioDTO> dto = _map.Map<List<UsuarioDTO>>(todos);
            return dto;
        }

        public async Task<UsuarioDTO>? GetPorId(int id)
        {
            var porId = await _context.Usuarios.
                        Include(ut => ut.UsuariosTipos).
                        Include(ui => ui.UsuariosInformacoes).
                        Where(ui => ui.UsuarioId == id).AsNoTracking().FirstOrDefaultAsync();

            UsuarioDTO dto = _map.Map<UsuarioDTO>(porId);
            return dto;
        }

        public async Task<UsuarioSenhaDTO>? GetPorEmailOuUsuarioSistema(string? email, string? nomeUsuarioSistema)
        {

            var porEmail = await _context.Usuarios.
                Where(e => e.Email == email).AsNoTracking().FirstOrDefaultAsync();

            if (porEmail is null)
            {
                var porNomeUsuario = await _context.Usuarios.
                                     Where(n => n.NomeUsuarioSistema == nomeUsuarioSistema).AsNoTracking().FirstOrDefaultAsync();

                UsuarioSenhaDTO dto1 = _map.Map<UsuarioSenhaDTO>(porNomeUsuario);
                return dto1;
            }

            UsuarioSenhaDTO dto2 = _map.Map<UsuarioSenhaDTO>(porEmail);
            return dto2;
        }
    }
}
