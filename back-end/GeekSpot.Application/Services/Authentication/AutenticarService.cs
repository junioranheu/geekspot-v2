using AutoMapper;
using GeekSpot.Application.Common.Interfaces.Authentication;
using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Domain.DTO;
using GeekSpot.Domain.Enums;
using static GeekSpot.Utils.Biblioteca;

namespace GeekSpot.Application.Services.Authentication
{
    public class AutenticarService : IAutenticarService
    {
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IMapper _map;

        public AutenticarService(IJwtTokenGenerator jwtTokenGenerator, IUsuarioRepository usuarioRepository, IMapper map)
        {
            _jwtTokenGenerator = jwtTokenGenerator;
            _usuarioRepository = usuarioRepository;
            _map = map;
        }

        public async Task<UsuarioDTO> Login(UsuarioSenhaDTO dto)
        {
            // #1 - Verificar se o usuário existe;
            var usuario = await _usuarioRepository.GetByEmailOuUsuarioSistema(dto?.Email, dto?.NomeUsuarioSistema);

            if (usuario is null)
            {
                UsuarioDTO erro = new()
                {
                    Erro = true,
                    CodigoErro = (int)CodigoErrosEnum.UsuarioNaoEncontrado,
                    MensagemErro = GetDescricaoEnum(CodigoErrosEnum.UsuarioNaoEncontrado)
                };

                return erro;
            }

            // #2 - Verificar se a senha está correta;
            if (usuario.Senha != Criptografar(dto?.Senha))
            {
                UsuarioDTO erro = new()
                {
                    Erro = true,
                    CodigoErro = (int)CodigoErrosEnum.UsuarioSenhaIncorretos,
                    MensagemErro = GetDescricaoEnum(CodigoErrosEnum.UsuarioSenhaIncorretos)
                };

                return erro;
            }

            // #3 - Criar token JWT;
            var token = _jwtTokenGenerator.GerarToken(usuario);
            usuario.Token = token;

            // #4 - Converter de UsuarioSenhaDTO para UsuarioDTO;
            UsuarioDTO usuarioDTO = _map.Map<UsuarioDTO>(usuario);

            return usuarioDTO;
        }

        public async Task<UsuarioDTO> Registrar(UsuarioSenhaDTO dto)
        {
            // #1 - Verificar se o usuário já existe com o e-mail informado. Se existir, aborte;
            var verificarUsuario = await _usuarioRepository.GetByEmailOuUsuarioSistema(dto?.Email, dto?.NomeUsuarioSistema);

            if (verificarUsuario is not null)
            {
                UsuarioDTO erro = new()
                {
                    Erro = true,
                    CodigoErro = (int)CodigoErrosEnum.UsuarioExistente,
                    MensagemErro = GetDescricaoEnum(CodigoErrosEnum.UsuarioExistente)
                };

                return erro;
            }

            // #2.1 - Verificar requisitos gerais;
            if (dto?.NomeCompleto?.Length < 3 || dto?.NomeUsuarioSistema?.Length < 3)
            {
                UsuarioDTO erro = new()
                {
                    Erro = true,
                    CodigoErro = (int)CodigoErrosEnum.RequisitosNome,
                    MensagemErro = GetDescricaoEnum(CodigoErrosEnum.RequisitosNome)
                };

                return erro;
            }

            // #2.2 - Verificar e-mail;
            if (!ValidarEmail(dto?.Email))
            {
                UsuarioDTO erro = new()
                {
                    Erro = true,
                    CodigoErro = (int)CodigoErrosEnum.EmailInvalido,
                    MensagemErro = GetDescricaoEnum(CodigoErrosEnum.EmailInvalido)
                };

                return erro;
            }

            // #2.3 - Verificar requisitos de senha;
            var validarSenha = ValidarSenha(dto?.Senha, dto?.NomeCompleto, dto?.NomeUsuarioSistema, dto?.Email);
            if (!validarSenha.Item1)
            {
                UsuarioDTO erro = new()
                {
                    Erro = true,
                    CodigoErro = (int)CodigoErrosEnum.RequisitosSenhaNaoCumprido,
                    // MensagemErro = GetDescricaoEnum(CodigoErrosEnum.RequisitosSenhaNaoCumprido)
                    MensagemErro = validarSenha.Item2
                };

                return erro;
            }

            // #3 - Criar usuário;
            var novoUsuario = new UsuarioSenhaDTO
            {
                NomeCompleto = dto?.NomeCompleto,
                Email = dto?.Email,
                NomeUsuarioSistema = dto?.NomeUsuarioSistema,
                Senha = Criptografar(dto?.Senha),
                UsuarioTipoId = (int)UsuarioTipoEnum.Usuario,
                Foto = "",
                DataRegistro = HorarioBrasilia(),
                DataOnline = HorarioBrasilia(),
                IsAtivo = 1,
                IsPremium = 0,
                IsVerificado = 0,
                CodigoVerificacao = GerarStringAleatoria(6, true),
                ValidadeCodigoVerificacao = HorarioBrasilia().AddHours(24),
                HashUrlTrocarSenha = "",
                ValidadeHashUrlTrocarSenha = DateTime.MinValue
            };

            UsuarioDTO usuarioAdicionado = await _usuarioRepository.Adicionar(novoUsuario);

            // #4 - Automaticamente atualizar o valor da Foto com um valor padrão após criar o novo usuário;
            await _usuarioRepository.AtualizarFoto(usuarioAdicionado.UsuarioId, $"{usuarioAdicionado.UsuarioId}.webp");

            // #5 - Adicionar ao objeto novoUsuario o id do novo usuário;
            novoUsuario.UsuarioId = usuarioAdicionado.UsuarioId;

            // #6 - Criar token JWT;
            var token = _jwtTokenGenerator.GerarToken(novoUsuario);
            novoUsuario.Token = token;

            // #7 - Converter de UsuarioSenhaDTO para UsuarioDTO;
            UsuarioDTO usuarioDTO = _map.Map<UsuarioDTO>(novoUsuario);

            return usuarioDTO;
        }
    }
}
