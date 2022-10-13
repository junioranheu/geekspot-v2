using GeekSpot.API.Filters;
using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Domain.DTO;
using GeekSpot.Domain.Enums;
using Microsoft.AspNetCore.Mvc;

namespace GeekSpot.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AjudasItensController : BaseController<AjudasItensController>
    {
        private readonly IAjudaItemRepository _ajudaItemRepository;

        public AjudasItensController(IAjudaItemRepository ajudaItemRepository)
        {
            _ajudaItemRepository = ajudaItemRepository;
        }

        [HttpPost("adicionar")]
        [CustomAuthorize(UsuarioTipoEnum.Administrador)]
        public async Task<ActionResult<bool>> Adicionar(AjudaItemDTO dto)
        {
            await _ajudaItemRepository.Adicionar(dto);
            return Ok(true);
        }

        [HttpPut("atualizar")]
        [CustomAuthorize(UsuarioTipoEnum.Administrador)]
        public async Task<ActionResult<bool>> Atualizar(AjudaItemDTO dto)
        {
            await _ajudaItemRepository.Atualizar(dto);
            return Ok(true);
        }

        [HttpDelete("deletar/{id}")]
        [CustomAuthorize(UsuarioTipoEnum.Administrador)]
        public async Task<ActionResult<bool>> Deletar(int id)
        {
            await _ajudaItemRepository.Deletar(id);
            return Ok(true);
        }

        [HttpGet("todos")]
        public async Task<ActionResult<List<AjudaItemDTO>>> GetTodos()
        {
            var todos = await _ajudaItemRepository.GetTodos();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AjudaItemDTO>> GetById(int id)
        {
            var byId = await _ajudaItemRepository.GetById(id);

            if (byId == null)
            {
                return NotFound();
            }

            return Ok(byId);
        }

        [HttpGet("byAjudaTopicoId/{ajudaTopicoId}")]
        public async Task<ActionResult<List<AjudaItemDTO>>> GetByAjudaTopicoId(int ajudaTopicoId)
        {
            var byAjudaTopicoId = await _ajudaItemRepository.GetByAjudaTopicoId(ajudaTopicoId);

            if (byAjudaTopicoId == null)
            {
                return NotFound();
            }

            return Ok(byAjudaTopicoId);
        }
    }
}
