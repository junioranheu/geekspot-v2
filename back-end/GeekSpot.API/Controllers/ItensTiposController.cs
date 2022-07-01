using GeekSpot.API.Interfaces;
using GeekSpot.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GeekSpot.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItensTiposController : BaseController<ItensTiposController>
    {
        private readonly IItemTipoRepository _itemRepository;

        public ItensTiposController(IItemTipoRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        [HttpGet("todos")]
        public async Task<ActionResult<List<ItemTipo>>> GetTodos()
        {
            var todos = await _itemRepository.GetTodos();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ItemTipo>> GetPorId(int id)
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
        public async Task<ActionResult<bool>> PostCriar(ItemTipo it)
        {
            var isOk = await _itemRepository.PostCriar(it);

            if (isOk < 1)
            {
                return NotFound();
            }

            return Ok(true);
        }

        [HttpPost("atualizar")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<bool>> PostAtualizar(ItemTipo it)
        {
            var isOk = await _itemRepository.PostAtualizar(it);

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
    }
}
