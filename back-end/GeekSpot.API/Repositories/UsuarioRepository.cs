using GeekSpot.API.Data;
using GeekSpot.API.Interfaces;
using GeekSpot.API.Models;
using Microsoft.EntityFrameworkCore;
using static GeekSpot.Biblioteca.Biblioteca;

namespace GeekSpot.API.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        public readonly Context _context;

        public UsuarioRepository(Context context)
        {
            _context = context;
        }

        public async Task<List<Usuario>> GetTodos()
        {
            var itens = await _context.Usuarios.
                Include(ut => ut.UsuariosTipos).
                Include(ui => ui.UsuariosInformacoes).
                OrderBy(ui => ui.UsuarioId).AsNoTracking().ToListAsync();

            return itens;
        }

        public async Task<Usuario> GetPorId(int id)
        {
            var item = await _context.Usuarios.
                Include(ut => ut.UsuariosTipos).
                Include(ui => ui.UsuariosInformacoes).
                Where(ui => ui.UsuarioId == id).AsNoTracking().FirstOrDefaultAsync();

            return item;
        }

        public async Task<Usuario> GetVerificarEmailSenha(string nomeUsuarioSistema, string senha)
        {
            string senhaCriptografada = Criptografar(senha);

            var usuarioBd = await _context.Usuarios.
                Include(ui => ui.UsuariosInformacoes).
                AsNoTracking().
                FirstOrDefaultAsync(l => (l.NomeUsuarioSistema == nomeUsuarioSistema || l.Email == nomeUsuarioSistema) && l.Senha == senhaCriptografada);

            return usuarioBd;
        }

        public async Task<int> PostCriar(Usuario usuario)
        {
            // Hora atual;
            DateTime horaAgora = HorarioBrasilia();
            string senhaCriptografada = Criptografar(usuario.Senha);

            usuario.Senha = senhaCriptografada;
            usuario.DataRegistro = horaAgora;

            _context.Add(usuario);
            var isOk = await _context.SaveChangesAsync();

            return usuario.UsuarioId;
        }

        public async Task<bool> IsExistePorEmail(string email)
        {
            return await _context.Usuarios.AnyAsync(e => e.Email == email);
        }

        public async Task<bool> IsExistePorNomeUsuarioSistema(string nomeUsuarioSistema)
        {
            return await _context.Usuarios.AnyAsync(nus => nus.NomeUsuarioSistema == nomeUsuarioSistema);
        }
    }
}
