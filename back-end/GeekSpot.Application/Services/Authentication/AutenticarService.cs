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

            // #3.1 - Gerar código de verificação para usar no processo de criação e no envio de e-mail;
            string codigoVerificacao = GerarStringAleatoria(6, true);

            // #3.2 - Criar usuário;
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
                CodigoVerificacao = codigoVerificacao,
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

            // #8 - Enviar e-mail de veririficação de conta;
            try
            {
                if (!String.IsNullOrEmpty(usuarioDTO?.Email) && !String.IsNullOrEmpty(usuarioDTO?.NomeCompleto) && !String.IsNullOrEmpty(codigoVerificacao))
                {
                    usuarioDTO.IsEmailVerificacaoContaEnviado = await EnviarEmailVerificacaoConta(usuarioDTO?.Email, usuarioDTO?.NomeCompleto, codigoVerificacao);
                }
            }
            catch (Exception)
            {
                usuarioDTO.IsEmailVerificacaoContaEnviado = false;
            }

            return usuarioDTO;
        }

        public static async Task<bool> EnviarEmailVerificacaoConta(string email, string nomeUsuario, string codigoVerificacao)
        {
            string assunto = "Verifique sua conta do GeekSpot";
            string conteudoEmailSemHtml = "";

            // Montar a url final;
            string dominio = CaminhoFront();
            string urlAlterarSenha = (dominio + $"verificar-conta/{codigoVerificacao}");

            // Pegar o arquivo referente ao layout do e-mail de recuperação de senha;
            string conteudoEmailHtml = string.Empty;
            string root = Directory.GetCurrentDirectory() + "/Emails/";
            string caminhoFinal = root + GetDescricaoEnum(EmailEnum.VerificarConta);
            using (var reader = new StreamReader(caminhoFinal))
            {
                // Ler arquivo;
                string readFile = reader.ReadToEnd();
                string strContent = readFile;

                // Remover tags desnecessárias;
                strContent = strContent.Replace("\r", string.Empty);
                strContent = strContent.Replace("\n", string.Empty);

                // Replaces;
                strContent = strContent.Replace("[Url]", urlAlterarSenha);
                strContent = strContent.Replace("[NomeUsuario]", nomeUsuario);
                conteudoEmailHtml = strContent.ToString();
            }

            bool resposta = await EnviarEmail(email, assunto, conteudoEmailSemHtml, conteudoEmailHtml);
            return resposta;
        }
    }
}
