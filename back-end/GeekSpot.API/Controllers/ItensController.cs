using GeekSpot.API.Filters;
using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Domain.DTO;
using GeekSpot.Domain.Enums;
using Microsoft.AspNetCore.Mvc;

namespace GeekSpot.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItensController : BaseController<ItensController>
    {
        private readonly IItemRepository _itemRepository;

        public ItensController(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        [HttpPost("adicionar")]
        [CustomAuthorize(UsuarioTipoEnum.Administrador)]
        public async Task<ActionResult<bool>> Adicionar(ItemDTO dto)
        {
            await _itemRepository.Adicionar(dto);
            return Ok(true);
        }

        [HttpPut("atualizar")]
        [CustomAuthorize(UsuarioTipoEnum.Administrador)]
        public async Task<ActionResult<bool>> Atualizar(ItemDTO dto)
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
        public async Task<ActionResult<List<ItemDTO>>> GetTodos()
        {
            var todos = await _itemRepository.GetTodos();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ItemDTO>> GetPorId(int id)
        {
            var porId = await _itemRepository.GetPorId(id);

            if (porId == null)
            {
                return NotFound();
            }

            return Ok(porId);
        }

        [HttpGet("porItemTipoId/{itemTipoId}")]
        public async Task<ActionResult<List<ItemDTO>>> GetPorItemTipoId(int itemTipoId)
        {
            var porItemTipoId = await _itemRepository.GetPorItemTipoId(itemTipoId);

            if (porItemTipoId == null)
            {
                return NotFound();
            }

            return Ok(porItemTipoId);
        }

        [HttpGet("porUsuarioId/{usuarioId}")]
        public async Task<ActionResult<List<ItemDTO>>> GetPorUsuarioId(int usuarioId)
        {
            var porUsuarioId = await _itemRepository.GetPorUsuarioId(usuarioId);

            if (porUsuarioId == null)
            {
                return NotFound();
            }

            return Ok(porUsuarioId);
        }
    }
}

