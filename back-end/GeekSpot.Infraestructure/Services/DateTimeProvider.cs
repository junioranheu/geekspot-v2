using GeekSpot.Application.Common.Interfaces.Services;
using static GeekSpot.Utils.Biblioteca;

namespace GeekSpot.Infraestructure.Services
{
    public class DateTimeProvider : IDateTimeProvider
    {
        public DateTime HorarioBrasilia => HorarioBrasilia();
    }
}
