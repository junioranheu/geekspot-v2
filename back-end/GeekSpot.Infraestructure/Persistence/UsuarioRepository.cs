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

        public async Task<UsuarioSenhaDTO>? GetByEmailOuUsuarioSistemaDiferenteDoMeu(int usuarioId, string? email, string? nomeUsuarioSistema)
        {
            var byEmail = await _context.Usuarios.
                Include(ui => ui.UsuariosInformacoes).
                Where(e => e.Email == email && e.UsuarioId != usuarioId).AsNoTracking().FirstOrDefaultAsync();

            if (byEmail is null)
            {
                var byNomeUsuario = await _context.Usuarios.
                                     Include(ui => ui.UsuariosInformacoes).
                                     Where(n => n.NomeUsuarioSistema == nomeUsuarioSistema && n.UsuarioId != usuarioId).AsNoTracking().FirstOrDefaultAsync();

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

        public async Task<UsuarioDTO>? AtualizarDadosLojinha(int usuarioId, UsuarioDTO dto)
        {
            var byId = await _context.Usuarios.
                       Include(ut => ut.UsuariosTipos).
                       Include(ui => ui.UsuariosInformacoes).
                       Where(ui => ui.UsuarioId == usuarioId).AsNoTracking().FirstOrDefaultAsync();

            if (byId is null)
            {
                UsuarioDTO erro = new() { Erro = true, CodigoErro = (int)CodigoErrosEnum.FalhaAoAtualizarDados, MensagemErro = GetDescricaoEnum(CodigoErrosEnum.FalhaAoAtualizarDados) };
                return erro;
            }

            // Se o usuário não tiver dados na tabela UsuariosInformacoes, a classe deve ser instanciada;
            if (byId.UsuariosInformacoes is null)
            {
                byId.UsuariosInformacoes = new();
            }

            // Atualizar dados;
            byId.Foto = !String.IsNullOrEmpty(dto.Foto) ? $"{usuarioId}.webp" : "";
            byId.UsuariosInformacoes.LojinhaImagemCapa = !String.IsNullOrEmpty(dto.UsuariosInformacoes?.LojinhaImagemCapa) ? $"{usuarioId}.webp" : "";
            byId.UsuariosInformacoes.LojinhaTitulo = dto.UsuariosInformacoes?.LojinhaTitulo;
            byId.UsuariosInformacoes.LojinhaDescricao = dto.UsuariosInformacoes?.LojinhaDescricao;
            byId.UsuariosInformacoes.DataUltimaAlteracao = HorarioBrasilia();

            _context.Update(byId);
            await _context.SaveChangesAsync();

            UsuarioDTO dtoRetorno = _map.Map<UsuarioDTO>(byId);
            return dtoRetorno;
        }

        public async Task<UsuarioDTO>? AtualizarDadosPessoais(int usuarioId, UsuarioSenhaDTO dto)
        {
            var byId = await _context.Usuarios.
                       Include(ut => ut.UsuariosTipos).
                       Include(ui => ui.UsuariosInformacoes).
                       Where(ui => ui.UsuarioId == usuarioId).AsNoTracking().FirstOrDefaultAsync();

            if (byId is null)
            {
                UsuarioDTO erro = new() { Erro = true, CodigoErro = (int)CodigoErrosEnum.FalhaAoAtualizarDados, MensagemErro = GetDescricaoEnum(CodigoErrosEnum.FalhaAoAtualizarDados) };
                return erro;
            }

            // #1 - Verificar se o usuário já existe com o e-mail ou nome de usuário do sistema informados. Se existir, aborte;
            var verificarUsuario = await GetByEmailOuUsuarioSistemaDiferenteDoMeu(usuarioId, dto?.Email, dto?.NomeUsuarioSistema);

            if (verificarUsuario is not null)
            {
                UsuarioDTO erro = new() { Erro = true, CodigoErro = (int)CodigoErrosEnum.UsuarioExistente, MensagemErro = GetDescricaoEnum(CodigoErrosEnum.UsuarioExistente) };
                return erro;
            }

            // #2.1 - Verificar requisitos gerais;
            if (dto?.NomeCompleto?.Length < 3 || dto?.NomeUsuarioSistema?.Length < 3)
            {
                UsuarioDTO erro = new() { Erro = true, CodigoErro = (int)CodigoErrosEnum.RequisitosNome, MensagemErro = GetDescricaoEnum(CodigoErrosEnum.RequisitosNome) };
                return erro;
            }

            // #2.2 - Verificar e-mail;
            if (!ValidarEmail(dto?.Email))
            {
                UsuarioDTO erro = new() { Erro = true, CodigoErro = (int)CodigoErrosEnum.EmailInvalido, MensagemErro = GetDescricaoEnum(CodigoErrosEnum.EmailInvalido) };
                return erro;
            }

            // #2.3 - Verificar requisitos de senha;
            var validarSenha = ValidarSenha(dto?.Senha, dto?.NomeCompleto, byId?.NomeUsuarioSistema, dto?.Email);
            if (!validarSenha.Item1)
            {
                UsuarioDTO erro = new() { Erro = true, CodigoErro = (int)CodigoErrosEnum.RequisitosSenhaNaoCumprido, MensagemErro = validarSenha.Item2 };
                return erro;
            }

            // #3.1 - Se o usuário não tiver dados na tabela UsuariosInformacoes, a classe deve ser instanciada;
            if (byId.UsuariosInformacoes is null)
            {
                byId.UsuariosInformacoes = new();
            }

            // #3.2 - Atualizar dados;
            byId.NomeCompleto = dto.NomeCompleto;
            byId.NomeUsuarioSistema = dto.NomeUsuarioSistema;
            byId.Email = dto.Email;
            byId.Senha = dto.Senha;
            byId.UsuariosInformacoes.DataAniversario = dto.UsuariosInformacoes?.DataAniversario > DateTime.MinValue ? dto.UsuariosInformacoes.DataAniversario : DateTime.MinValue;
            byId.UsuariosInformacoes.CPF = dto.UsuariosInformacoes?.CPF ?? "";
            byId.UsuariosInformacoes.Telefone = dto.UsuariosInformacoes?.Telefone ?? "";
            byId.UsuariosInformacoes.DataUltimaAlteracao = HorarioBrasilia();

            _context.Update(byId);
            await _context.SaveChangesAsync();

            UsuarioDTO dtoRetorno = _map.Map<UsuarioDTO>(byId);
            return dtoRetorno;
        }
    }
}
