using System.Text.Json.Serialization;

namespace backend.Models
{
    public sealed class VitalsFromDavidDto
    {
        [JsonPropertyName("Timestamp")]
        public string Timestamp { get; set; }

        [JsonPropertyName("ValueInMgPerDl")]
        public int ValueInMgPerDl { get; set; }

        [JsonPropertyName("TrendArrow")]
        public int TrendArrow { get; set; }

        [JsonPropertyName("TrendMessage")]
        public string TrendMessage { get; set; }

        [JsonPropertyName("MeasurementColor")]
        public int MeasurementColor { get; set; }

        [JsonPropertyName("GlucoseUnits")]
        public int GlucoseUnits { get; set; }

        [JsonPropertyName("Value")]
        public int Value { get; set; } 
    }
}
