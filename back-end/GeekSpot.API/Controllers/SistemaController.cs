using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Domain.DTO;
using Microsoft.AspNetCore.Mvc;

namespace GeekSpot.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SistemaController : BaseController<SistemaController>
    {
        private readonly ISistemaRepository _sistemaRepository;

        public SistemaController(ISistemaRepository sistemaRepository)
        {
            _sistemaRepository = sistemaRepository;
        }

        [HttpGet("todosEstados")]
        public async Task<ActionResult<List<EstadoDTO>>> GetTodosEstados()
        {
            var todos = await _sistemaRepository.GetTodosEstados();
            return Ok(todos);
        }

        [HttpGet("todasCidadesByEstadoId")]
        public async Task<ActionResult<List<CidadeDTO>>> GetTodasCidades(int estadoId)
        {
            var todos = await _sistemaRepository.GetTodasCidades(estadoId);
            return Ok(todos);
        }

        [HttpGet("listaDataAtual")]
        public List<DateTime> GetListaDataAtual()
        {
            var lista = _sistemaRepository.GetListaDataAtual();
            return lista;
        }
    }
}
