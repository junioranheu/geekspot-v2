using AutoMapper;
using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Domain.DTO;
using GeekSpot.Domain.Entities;
using GeekSpot.Domain.Enums;
using GeekSpot.Infraestructure.Data;
using Microsoft.EntityFrameworkCore;
using static GeekSpot.Utils.Biblioteca;

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

            _context.Add(usuario);
            await _context.SaveChangesAsync();

            UsuarioDTO usuarioDTO = _map.Map<UsuarioDTO>(usuario);
            return usuarioDTO;
        }

        public async Task<UsuarioDTO>? Atualizar(UsuarioSenhaDTO dto)
        {
            Usuario usuario = _map.Map<Usuario>(dto);
            UsuarioDTO usuarioDTO = _map.Map<UsuarioDTO>(dto);

            _context.Update(usuario);
            await _context.SaveChangesAsync();
            return usuarioDTO;
        }

        public async Task? Deletar(int id)
        {
            var dados = await _context.Usuarios.FindAsync(id);

            if (dados == null)
            {
                throw new Exception("Registro com o id " + id + " não foi encontrado");
            }

            _context.Usuarios.Remove(dados);
            await _context.SaveChangesAsync();
        }

        public async Task<List<UsuarioDTO>>? GetTodos()
        {
            var todos = await _context.Usuarios.
                        Include(ut => ut.UsuariosTipos).
                        Include(ui => ui.UsuariosInformacoes).
                        OrderBy(ui => ui.UsuarioId).AsNoTracking().ToListAsync();

            List<UsuarioDTO> dto = _map.Map<List<UsuarioDTO>>(todos);
            return dto;
        }

        public async Task<UsuarioDTO>? GetById(int id)
        {
            var byId = await _context.Usuarios.
                       Include(ut => ut.UsuariosTipos).
                       Include(ui => ui.UsuariosInformacoes).
                       Where(ui => ui.UsuarioId == id).AsNoTracking().FirstOrDefaultAsync();

            UsuarioDTO dto = _map.Map<UsuarioDTO>(byId);
            return dto;
        }

        public async Task<UsuarioSenhaDTO>? GetByEmailOuUsuarioSistema(string? email, string? nomeUsuarioSistema)
        {
            var byEmail = await _context.Usuarios.
                Include(ui => ui.UsuariosInformacoes).
                Where(e => e.Email == email).AsNoTracking().FirstOrDefaultAsync();

            if (byEmail is null)
            {
                var byNomeUsuario = await _context.Usuarios.
                                     Include(ui => ui.UsuariosInformacoes).
                                     Where(n => n.NomeUsuarioSistema == nomeUsuarioSistema).AsNoTracking().FirstOrDefaultAsync();

                UsuarioSenhaDTO dto1 = _map.Map<UsuarioSenhaDTO>(byNomeUsuario);
                return dto1;
            }

            UsuarioSenhaDTO dto2 = _map.Map<UsuarioSenhaDTO>(byEmail);
            return dto2;
        }

        public async Task? AtualizarFoto(int usuarioId, string foto)
        {
            var usuario = await _context.Usuarios.Where(ui => ui.UsuarioId == usuarioId).FirstOrDefaultAsync();
            usuario.Foto = foto;

            _context.Update(usuario);
            await _context.SaveChangesAsync();
        }

        public async Task<string>? AtualizarCodigoVerificacao(int usuarioId)
        {
            var usuario = await _context.Usuarios.Where(ui => ui.UsuarioId == usuarioId).FirstOrDefaultAsync();
            string novoCodigoVerificacao = GerarStringAleatoria(6, true);

            usuario.CodigoVerificacao = novoCodigoVerificacao;
            usuario.ValidadeCodigoVerificacao = HorarioBrasilia().AddHours(24);

            _context.Update(usuario);
            await _context.SaveChangesAsync();

            return novoCodigoVerificacao;
        }

        public async Task<UsuarioDTO>? VerificarConta(string codigoVerificacao)
        {
            var usuario = await _context.Usuarios.Where(cv => cv.CodigoVerificacao == codigoVerificacao).AsNoTracking().FirstOrDefaultAsync();

            if (usuario is null)
            {
                UsuarioDTO erro = new() { Erro = true, CodigoErro = (int)CodigoErrosEnum.CodigoVerificacaoInvalido, MensagemErro = GetDescricaoEnum(CodigoErrosEnum.CodigoVerificacaoInvalido) };
                return erro;
            }

            if (HorarioBrasilia() > usuario.ValidadeCodigoVerificacao)
            {
                UsuarioDTO erro = new() { Erro = true, CodigoErro = (int)CodigoErrosEnum.CodigoVerificacaoExpirado, MensagemErro = GetDescricaoEnum(CodigoErrosEnum.CodigoVerificacaoExpirado) };
                return erro;
            }

            if (usuario.IsVerificado == true)
            {
                UsuarioDTO erro = new() { Erro = true, CodigoErro = (int)CodigoErrosEnum.ContaJaVerificada, MensagemErro = GetDescricaoEnum(CodigoErrosEnum.ContaJaVerificada) };
                return erro;
            }

            usuario.IsVerificado = true;
            _context.Update(usuario);
            await _context.SaveChangesAsync();

            UsuarioDTO dto = _map.Map<UsuarioDTO>(usuario);
            return dto;
        }
    }
}
