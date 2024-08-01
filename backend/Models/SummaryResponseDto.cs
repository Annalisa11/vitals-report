using System.Text.Json.Serialization;

namespace backend.Models
{
    public class SummaryResponseDto
    {
        [JsonPropertyName("vitals")]
        public required VitalsDto Vitals { get; set; }

        [JsonPropertyName("comment")]
        public required string Comment { get; set; }

        [JsonPropertyName("commentHeadline")]
        public required string CommentHeadline { get; set; }
    }
}
