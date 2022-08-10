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

        public async Task<UsuarioDTO> Registrar(UsuarioSenhaDTO dto)
        {
            // #1.2 - Verificar se o usuário já existe com o e-mail informado. Se existir, aborte;
            var verificarUsuario = _usuarioRepository.GetPorEmailOuUsuarioSistema(dto?.Email, dto?.NomeUsuarioSistema);

            if (verificarUsuario is not null)
            {
                UsuarioDTO erro = new()
                {
                    Erro = true,
                    CodigoErro = (int)CodigoErrosEnum.UsuarioExistente,
                    Mensagem = GetDescricaoEnum(CodigoErrosEnum.UsuarioExistente)
                };

                return erro;
            }

            // #2 - Criar usuário (gerando ID único);
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
                IsVerificado = 1
            };

            await _usuarioRepository.Adicionar(novoUsuario);

            // #3 - Criar token JWT;
            var token = _jwtTokenGenerator.GerarToken(novoUsuario);
            novoUsuario.Token = token;

            // #4 - Converter de UsuarioSenhaDTO para UsuarioDTO;
            UsuarioDTO usuarioDto = _map.Map<UsuarioDTO>(novoUsuario);

            return usuarioDto;
        }

        public async Task<UsuarioDTO> Login(UsuarioSenhaDTO dto)
        {
            // #1 - Verificar se o usuário existe;
            var usuario = await _usuarioRepository.GetPorEmailOuUsuarioSistema(dto?.Email, dto?.NomeUsuarioSistema);

            if (usuario is null)
            {
                UsuarioDTO erro = new()
                {
                    Erro = true,
                    CodigoErro = (int)CodigoErrosEnum.UsuarioNaoEncontrado,
                    Mensagem = GetDescricaoEnum(CodigoErrosEnum.UsuarioNaoEncontrado)
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
                    Mensagem = GetDescricaoEnum(CodigoErrosEnum.UsuarioSenhaIncorretos)
                };

                return erro;
            }

            // #3 - Criar token JWT;
            var token = _jwtTokenGenerator.GerarToken(usuario);
            usuario.Token = token;

            // #4 - Converter de UsuarioSenhaDTO para UsuarioDTO;
            UsuarioDTO usuarioDto = _map.Map<UsuarioDTO>(usuario);

            return usuarioDto;
        }
    }
}
