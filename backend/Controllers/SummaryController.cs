using backend.Clients;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{

    [ApiController]
    public class SummaryController(IOpenAiClient client) : ControllerBase
    {
        [Route("v1/summary")]
        [HttpGet]
        public async Task<IActionResult> GetSummary()
        {
            var vitalsToConvert = await DavidApiClient.GetDavidVitalsAsync();

            string prompt =
                "Generate a message in raw JSON with no formatting and two properties 'headline' and 'comment'. " +
                "Headline should contain a fitting emoji. And comment should contain a short, " +
                $"funny and sarcastic text that comments on these diabetes vitals: {vitalsToConvert.ValueInMgPerDl} mg/dL, " +
                $"and take into account time {vitalsToConvert.Timestamp}. And complements Target Blood Sugar Ranges: " +
                $"Before Meals (Preprandial): 80-130 mg/dL\n1-2 Hours After Meals (Postprandial): Less than 180 mg/dL\nBedtime: 100-140 mg/dL"
                ;
            var openAiResponse = await client.SendRequestAsync(prompt);
            var summary = new SummaryResponseDto()
            {
                Vitals = new VitalsDto
                {
                    GlucoseUnits = vitalsToConvert.GlucoseUnits,
                    MeasurementColor = vitalsToConvert.MeasurementColor,
                    Timestamp = vitalsToConvert.Timestamp,
                    TrendMessage = vitalsToConvert.TrendMessage,
                    Value = vitalsToConvert.Value,
                    ValueInMgPerDl = vitalsToConvert.ValueInMgPerDl
                },
                Comment = openAiResponse.Comment,
                CommentHeadline = openAiResponse.Headline,
                
            };
            return this.Ok(summary);
        }
    }
}
