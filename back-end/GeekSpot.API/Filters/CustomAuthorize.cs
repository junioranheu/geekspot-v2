using GeekSpot.Domain.Enums;
using Microsoft.AspNetCore.Authorization;

namespace GeekSpot.API.Filters
{
    // https://stackoverflow.com/a/10445884
    public class CustomAuthorize : AuthorizeAttribute
    {
        public CustomAuthorize(params UsuarioTipoEnum[] DomainRoles)
        {
            foreach (var domainRole in DomainRoles)
            {
                var domain = domainRole.ToString().Split('_')[0] + "_";
                var role = domainRole.ToString().Replace(domain, "").Replace("_", " ");
                domain = domain.Replace("_", "\\");
                Roles += ", " + domain + role;
            }

            Roles = Roles?.Substring(2);
        }
    }
}
