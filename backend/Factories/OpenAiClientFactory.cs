using backend.Utils;

namespace backend.Factories
{
    public class OpenAiClientFactory : IOpenAiClientFactory
    {
        public OpenAiClient Create(string apiKey)
        {
            OpenAiClient client = new OpenAiClient(apiKey);

            return client;
        }
    }
}
