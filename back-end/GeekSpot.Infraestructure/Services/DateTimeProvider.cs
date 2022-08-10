using GeekSpot.Application.Common.Interfaces.Services;

namespace GeekSpot.Infraestructure.Services
{
    public class DateTimeProvider : IDateTimeProvider
    {
        public DateTime UtcNow => DateTime.UtcNow;
    }
}
