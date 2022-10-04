using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Domain.DTO;
using GeekSpot.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static GeekSpot.Utils.Biblioteca;

namespace GeekSpot.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : BaseController<UsuariosController>
    {
        private readonly IUsuarioRepository _usuarios;

        public UsuariosController(IUsuarioRepository usuarioRepository)
        {
            _usuarios = usuarioRepository;
        }

        [HttpPut("atualizar")]
        [Authorize]
        public async Task<ActionResult<UsuarioDTO>> Atualizar(UsuarioSenhaDTO dto)
        {
            var isMesmoUsuario = await IsUsuarioSolicitadoMesmoDoToken(dto.UsuarioId);

            if (!isMesmoUsuario)
            {
                UsuarioDTO erro = new()
                {
                    Erro = true,
                    CodigoErro = (int)CodigoErrosEnum.NaoAutorizado,
                    MensagemErro = GetDescricaoEnum(CodigoErrosEnum.NaoAutorizado)
                };

                return erro;
            }

            var usuario = await _usuarios.Atualizar(dto);
            return Ok(usuario);
        }

        [HttpGet("todos")]
        public async Task<ActionResult<List<UsuarioDTO>>> GetTodos()
        {
            var itens = await _usuarios.GetTodos();

            if (itens == null)
            {
                return NotFound();
            }

            return itens;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioDTO>> GetById(int id)
        {
            var byId = await _usuarios.GetById(id);

            if (byId == null)
            {
                return NotFound();
            }

            return byId;
        }

        [HttpPut("verificarConta/{codigoVerificacao}")]
        public async Task<ActionResult<UsuarioDTO>> VerificarConta(string codigoVerificacao)
        {
            var usuario = await _usuarios.VerificarConta(codigoVerificacao);
            return usuario;
        }

        [HttpPut("atualizarDadosLojinha")]
        [Authorize]
        public async Task<ActionResult<UsuarioDTO>> AtualizarDadosLojinha(UsuarioDTO dto)
        {
            int usuarioLogadoId = Convert.ToInt32(User?.FindFirstValue(ClaimTypes.NameIdentifier));
            var usuario = await _usuarios.AtualizarDadosLojinha(usuarioLogadoId, dto);

            return Ok(usuario);
        }
    }
}
