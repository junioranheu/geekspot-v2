using AutoMapper;
using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Domain.DTO;

namespace GeekSpot.Infraestructure.Persistence
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly IMapper _map;

        public UsuarioRepository(IMapper map)
        {
            _map = map;
        }

        public Task<UsuarioDTO>? Adicionar(UsuarioSenhaDTO dto)
        {
            throw new NotImplementedException();
        }

        public Task<UsuarioDTO>? Atualizar(UsuarioSenhaDTO dto)
        {
            throw new NotImplementedException();
        }

        public Task Deletar(int id)
        {
            throw new NotImplementedException();
        }

        public Task<UsuarioSenhaDTO>? GetPorEmailOuUsuarioSistema(string? email, string? nomeUsuarioSistema)
        {
            throw new NotImplementedException();
        }

        public Task<UsuarioDTO>? GetPorId(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<UsuarioDTO>> GetTodos()
        {
            throw new NotImplementedException();
        }
    }
}
