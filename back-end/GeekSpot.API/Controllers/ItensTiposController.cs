using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Domain.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GeekSpot.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItensTiposController : ControllerBase
    {
        private readonly IItemTipoRepository _itemTipoRepository;

        public ItensTiposController(IItemTipoRepository itemRepository)
        {
            _itemTipoRepository = itemRepository;
        }

        [HttpPost("adicionar")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<bool>> Adicionar(ItemTipoDTO dto)
        {
            await _itemTipoRepository.Adicionar(dto);
            return Ok(true);
        }

        [HttpPut("atualizar")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<bool>> Atualizar(ItemTipoDTO dto)
        {
            await _itemTipoRepository.Atualizar(dto);
            return Ok(true);
        }

        [HttpPost("deletar")]
        [Authorize(Roles = "1")]
        public async Task<ActionResult<int>> Deletar(int id)
        {
            await _itemTipoRepository.Deletar(id);
            return Ok(true);
        }

        [HttpGet("todos")]
        public async Task<ActionResult<List<ItemTipoDTO>>> GetTodos()
        {
            var todos = await _itemTipoRepository.GetTodos();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ItemTipoDTO>> GetPorId(int id)
        {
            var porId = await _itemTipoRepository.GetPorId(id);

            if (porId == null)
            {
                return NotFound();
            }

            return Ok(porId);
        }
    }
}
