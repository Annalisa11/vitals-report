namespace backend.Configuration
{
    public class OpenAiClientSettings
    {
        public const string Section = nameof(OpenAiClientSettings);

        public string? ApiKey { get; set; }
    }
}
