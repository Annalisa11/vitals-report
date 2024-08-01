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
            var history = await DavidApiClient.GetHistoryAsync();

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
                Vitals = this.buildVitalsDto(vitalsToConvert),
                Comment = openAiResponse.Comment,
                CommentHeadline = openAiResponse.Headline,
                History = history.Select(x => buildVitalsDto(x)).ToArray(),
            };
            return this.Ok(summary);
        }

        private VitalsDto buildVitalsDto(VitalsFromDavidDto vitals)
        {
            return new VitalsDto
            {
                GlucoseUnits = vitals.GlucoseUnits,
                MeasurementColor = vitals.MeasurementColor,
                Timestamp = vitals.Timestamp,
                TrendMessage = vitals.TrendMessage,
                Value = vitals.Value,
                ValueInMgPerDl = vitals.ValueInMgPerDl
            };
        }
    }
}
