using AutoMapper;
using GeekSpot.Application.Common.Interfaces.Persistence;
using GeekSpot.Domain.DTO;
using GeekSpot.Domain.Entities;

namespace GeekSpot.Infraestructure.Persistence
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly IMapper _map;

        public UsuarioRepository(IMapper map)
        {
            _map = map;
        }

        private static readonly List<Usuario> _usuarios = new();

        public bool Adicionar(UsuarioSenhaDTO dto)
        {
            Usuario usuario = _map.Map<Usuario>(dto);

            _usuarios.Add(usuario);
            return true;
        }

        public UsuarioSenhaDTO? GetPorEmail(string email)
        {
            var u = _usuarios.SingleOrDefault(u => u.Email == email);
            UsuarioSenhaDTO dto = _map.Map<UsuarioSenhaDTO>(u);

            return dto;
        }
    }
}
