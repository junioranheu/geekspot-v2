using GeekSpot.API.Filters;
using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Domain.DTO;
using GeekSpot.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static GeekSpot.Utils.Biblioteca;

namespace GeekSpot.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComentariosController : BaseController<ComentariosController>
    {
        private readonly IComentarioRepository _comentarioRepository;

        public ComentariosController(IComentarioRepository comentarioRepository)
        {
            _comentarioRepository = comentarioRepository;
        }

        [HttpPost("adicionar")]
        [Authorize]
        public async Task<ActionResult<bool>> Adicionar(ComentarioDTO dto)
        {
            dto.UsuarioId = Convert.ToInt32(User?.FindFirstValue(ClaimTypes.NameIdentifier));
            await _comentarioRepository.Adicionar(dto);
            return Ok(true);
        }

        [HttpPut("atualizar")]
        [CustomAuthorize(UsuarioTipoEnum.Administrador)]
        public async Task<ActionResult<bool>> Atualizar(ComentarioDTO dto)
        {
            await _comentarioRepository.Atualizar(dto);
            return Ok(true);
        }

        [HttpPost("deletar")]
        [CustomAuthorize(UsuarioTipoEnum.Administrador)]
        public async Task<ActionResult<int>> Deletar(int id)
        {
            await _comentarioRepository.Deletar(id);
            return Ok(true);
        }

        [HttpGet("todos")]
        [CustomAuthorize(UsuarioTipoEnum.Administrador)]
        public async Task<ActionResult<List<ComentarioDTO>>> GetTodos()
        {
            var todos = await _comentarioRepository.GetTodos();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ComentarioDTO>> GetPorId(int id)
        {
            var porId = await _comentarioRepository.GetPorId(id);

            if (porId == null)
            {
                return NotFound();
            }

            return Ok(porId);
        }

        [HttpGet("porItemId/{itemId}")]
        public async Task<ActionResult<List<ComentarioDTO>>> GetPorItemId(int itemId)
        {
            var porItemId = await _comentarioRepository.GetPorItemId(itemId);

            if (porItemId == null)
            {
                return NotFound();
            }

            return Ok(porItemId);
        }

        [HttpPut("responderComentario")]
        [Authorize]
        public async Task<ActionResult<ComentarioDTO>> ResponderComentario(ComentarioDTO dto)
        {
            int idUsuarioDonoItem = dto?.Itens?.UsuarioId ?? 0;
            var isMesmoUsuario = await IsUsuarioSolicitadoMesmoDoToken(idUsuarioDonoItem);

            if (!isMesmoUsuario)
            {
                ComentarioDTO erro = new()
                {
                    Erro = true,
                    CodigoErro = (int)CodigoErrosEnum.NaoAutorizado,
                    MensagemErro = GetDescricaoEnum(CodigoErrosEnum.NaoAutorizado)
                };

                return erro;
            }

            await _comentarioRepository.ResponderComentario(dto);
            return Ok(true);
        }
    }
}
