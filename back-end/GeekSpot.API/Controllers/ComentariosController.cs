using GeekSpot.API.Filters;
using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Domain.DTO;
using GeekSpot.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GeekSpot.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComentariosController : BaseController<ComentariosController>
    {
        private readonly IComentarioRepository _itemRepository;

        public ComentariosController(IComentarioRepository comentarioRepository)
        {
            _itemRepository = comentarioRepository;
        }

        [HttpPost("adicionar")]
        [Authorize]
        public async Task<ActionResult<bool>> Adicionar(ComentarioDTO dto)
        {
            dto.UsuarioId = Convert.ToInt32(User.FindFirstValue(ClaimTypes.NameIdentifier));
            await _itemRepository.Adicionar(dto);
            return Ok(true);
        }

        [HttpPut("atualizar")]
        [CustomAuthorize(UsuarioTipoEnum.Administrador)]
        public async Task<ActionResult<bool>> Atualizar(ComentarioDTO dto)
        {
            await _itemRepository.Atualizar(dto);
            return Ok(true);
        }

        [HttpPost("deletar")]
        [CustomAuthorize(UsuarioTipoEnum.Administrador)]
        public async Task<ActionResult<int>> Deletar(int id)
        {
            await _itemRepository.Deletar(id);
            return Ok(true);
        }

        [HttpGet("todos")]
        [CustomAuthorize(UsuarioTipoEnum.Administrador)]
        public async Task<ActionResult<List<ComentarioDTO>>> GetTodos()
        {
            var todos = await _itemRepository.GetTodos();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ComentarioDTO>> GetPorId(int id)
        {
            var porId = await _itemRepository.GetPorId(id);

            if (porId == null)
            {
                return NotFound();
            }

            return Ok(porId);
        }

        [HttpGet("porItemId/{itemId}")]
        public async Task<ActionResult<List<ComentarioDTO>>> GetPorItemId(int itemId)
        {
            var porItemId = await _itemRepository.GetPorItemId(itemId);

            if (porItemId == null)
            {
                return NotFound();
            }

            return Ok(porItemId);
        }
    }
}
