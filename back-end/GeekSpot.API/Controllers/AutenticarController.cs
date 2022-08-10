using GeekSpot.Application.Common.Interfaces.Authentication;
using GeekSpot.Domain.DTO;
using Microsoft.AspNetCore.Mvc;

namespace GeekSpot.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AutenticarController : BaseController<AutenticarController>
    {
        private readonly IAutenticarService _autenticarService;

        public AutenticarController(IAutenticarService autenticarService)
        {
            _autenticarService = autenticarService;
        }

        [HttpPost("registrar")]
        public async Task<ActionResult<UsuarioDTO>> Registrar(UsuarioSenhaDTO dto)
        {
            var authResultado = await _autenticarService.Registrar(dto);
            return Ok(authResultado);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UsuarioDTO>> Login(UsuarioSenhaDTO dto)
        {
            var authResultado = await _autenticarService.Login(dto);
            return Ok(authResultado);
        }
    }
}
