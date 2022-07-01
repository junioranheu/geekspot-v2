using GeekSpot.API.Models;

namespace GeekSpot.API.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<List<Usuario>> GetTodos();
        Task<Usuario> GetPorId(int id);
        Task<Usuario> GetVerificarEmailSenha(string nomeUsuarioSistema, string senha);
        Task<int> PostCriar(Usuario u);
        Task<bool> IsExistePorEmail(string email);
        Task<bool> IsExistePorNomeUsuarioSistema(string nomeUsuarioSistema);
    }
}
