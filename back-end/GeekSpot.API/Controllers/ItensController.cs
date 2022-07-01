using GeekSpot.API.Interfaces;
using GeekSpot.API.Models;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("todos")]
        public async Task<ActionResult<List<Item>>> GetTodos()
        {
            var todos = await _itemRepository.GetTodos();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetPorId(int id)
        {
            var porId = await _itemRepository.GetPorId(id);

            if (porId == null)
            {
                return NotFound();
            }

            return Ok(porId);
        }

        [HttpPost("criar")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<bool>> PostCriar(Item i)
        {
            var isOk = await _itemRepository.PostCriar(i);

            if (isOk < 1)
            {
                return NotFound();
            }

            return Ok(true);
        }

        [HttpPost("atualizar")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<bool>> PostAtualizar(Item i)
        {
            var isOk = await _itemRepository.PostAtualizar(i);

            if (isOk < 1)
            {
                return NotFound();
            }

            return Ok(true);
        }

        [HttpPost("deletar")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<int>> PostDeletar(int id)
        {
            var isOk = await _itemRepository.PostDeletar(id);

            if (isOk < 1)
            {
                return NotFound();
            }

            return Ok(true);
        }

        [HttpGet("porItemTipoId/{itemTipoId}")]
        public async Task<ActionResult<List<Item>>> GetPorItemTipoIdId(int itemTipoId)
        {
            var porItemTipoId = await _itemRepository.GetPorItemTipoId(itemTipoId);

            if (porItemTipoId == null)
            {
                return NotFound();
            }

            return Ok(porItemTipoId);
        }

        [HttpGet("porUsuarioId/{usuarioId}")]
        public async Task<ActionResult<List<Item>>> GetPorUsuarioId(int usuarioId)
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
