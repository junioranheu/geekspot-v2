using GeekSpot.API.Filters;
using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Domain.DTO;
using GeekSpot.Domain.Enums;
using Microsoft.AspNetCore.Mvc;

namespace GeekSpot.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AjudasTopicosController : BaseController<AjudasTopicosController>
    {
        private readonly IAjudaTopicoRepository _ajudaTopicoRepository;

        public AjudasTopicosController(IAjudaTopicoRepository ajudaTopicoRepository)
        {
            _ajudaTopicoRepository = ajudaTopicoRepository;
        }

        [HttpPost("adicionar")]
        [CustomAuthorize(UsuarioTipoEnum.Administrador)]
        public async Task<ActionResult<bool>> Adicionar(AjudaTopicoDTO dto)
        {
            await _ajudaTopicoRepository.Adicionar(dto);
            return Ok(true);
        }

        [HttpPut("atualizar")]
        [CustomAuthorize(UsuarioTipoEnum.Administrador)]
        public async Task<ActionResult<bool>> Atualizar(AjudaTopicoDTO dto)
        {
            await _ajudaTopicoRepository.Atualizar(dto);
            return Ok(true);
        }

        [HttpDelete("deletar/{id}")]
        [CustomAuthorize(UsuarioTipoEnum.Administrador)]
        public async Task<ActionResult<bool>> Deletar(int id)
        {
            await _ajudaTopicoRepository.Deletar(id);
            return Ok(true);
        }

        [HttpGet("todos")]
        public async Task<ActionResult<List<AjudaTopicoDTO>>> GetTodos()
        {
            var todos = await _ajudaTopicoRepository.GetTodos();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AjudaTopicoDTO>> GetById(int id)
        {
            var byId = await _ajudaTopicoRepository.GetById(id);

            if (byId == null)
            {
                return NotFound();
            }

            return Ok(byId);
        }
    }
}
