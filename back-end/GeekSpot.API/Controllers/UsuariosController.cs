using GeekSpot.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GeekSpot.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioRepository _usuarios;

        public UsuariosController(IUsuarioRepository usuarioRepository)
        {
            _usuarios = usuarioRepository;
        }

        [HttpGet("todos")]
        [Authorize]
        public async Task<ActionResult<List<Usuario>>> GetTodos()
        {
            var itens = await _usuarios.GetTodos();
            return itens;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetPorId(int id)
        {
            var item = await _usuarios.GetPorId(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        [HttpGet("verificarEmailSenha")]
        public async Task<ActionResult<Usuario>> GetVerificarEmailSenha(string nomeUsuarioSistema, string senha)
        {
            var usuarioBd = await _usuarios.GetVerificarEmailSenha(nomeUsuarioSistema, senha);

            if (usuarioBd != null)
            {
                Usuario usu = new()
                {
                    UsuarioId = usuarioBd.UsuarioId,
                    NomeCompleto = usuarioBd.NomeCompleto,
                    NomeUsuarioSistema = usuarioBd.NomeUsuarioSistema,
                    Email = usuarioBd.Email,
                    UsuarioTipoId = usuarioBd.UsuarioTipoId,
                    Foto = usuarioBd.Foto,
                    DataOnline = usuarioBd.DataOnline
                };

                return usu;
            }
            else
            {
                return null;
            }
        }

        [HttpGet("isExistePorEmail")]
        public async Task<ActionResult<bool>> IsExistePorEmail(string email)
        {
            bool isExiste = await _usuarios.IsExistePorEmail(email);
            return isExiste;
        }

        [HttpGet("isExistePorNomeUsuarioSistema")]
        public async Task<ActionResult<bool>> IsExistePorNomeUsuarioSistema(string nomeUsuarioSistema)
        {
            bool isExiste = await _usuarios.IsExistePorNomeUsuarioSistema(nomeUsuarioSistema);
            return isExiste;
        }
    }
}
