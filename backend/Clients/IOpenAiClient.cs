using backend.Models;

namespace backend.Clients
{
    public interface IOpenAiClient
    {
        Task<OpenAiResponseDto> SendRequestAsync(string prompt);
    }
}
