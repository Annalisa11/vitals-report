using backend.Utils;

namespace backend.Factories
{
    public interface IOpenAiClientFactory
    {
        OpenAiClient Create(string apiKey);
    }
}
