using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Domain.DTO;
using GeekSpot.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

        [HttpPost("adicionar")]
        public async Task<ActionResult<UsuarioDTO>> Adicionar(UsuarioSenhaDTO dto)
        {
            var isExiste = await _usuarios.GetPorEmailOuUsuarioSistema(dto?.Email, dto?.NomeUsuarioSistema);

            if (isExiste is not null)
            {
                UsuarioDTO erro = new()
                {
                    Erro = true,
                    CodigoErro = (int)CodigoErrosEnum.UsuarioExistente,
                    Mensagem = GetDescricaoEnum(CodigoErrosEnum.UsuarioExistente)
                };

                return erro;
            }

            var usuario = await _usuarios.Adicionar(dto);
            return Ok(usuario);
        }

        [HttpPost("atualizar")]
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
                    Mensagem = GetDescricaoEnum(CodigoErrosEnum.NaoAutorizado)
                };

                return erro;
            }

            var usuario = await _usuarios.Atualizar(dto);
            return Ok(usuario);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioDTO>> GetPorId(int id)
        {
            var porId = await _usuarios.GetPorId(id);

            if (porId == null)
            {
                return NotFound();
            }

            return porId;
        }

        [HttpGet("todos")]
        [Authorize]
        public async Task<ActionResult<List<UsuarioDTO>>> GetTodos()
        {
            var itens = await _usuarios.GetTodos();

            if (itens == null)
            {
                return NotFound();
            }

            return itens;
        }
    }
}
