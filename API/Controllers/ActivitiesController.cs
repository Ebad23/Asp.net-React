using Application.Activities;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
   
    public class ActivitiesController : BaseApiController
    {
        [HttpGet] //api/activities
        public async Task<IActionResult> GetActivities()
        {
            var result = await Mediator.Send(new List.Query());

            return HandleResult(result);
        }
        
        [HttpGet("{id}")] //api/activities/1ijdfjhfhf
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            var result = await Mediator.Send(new Details.Query{Id = id});

            return HandleResult(result);

        }

        [HttpPost] //api/activities/createactivity
        public async Task<IActionResult> CreateActivity([FromBody]Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Activity = activity}));
        }

        [HttpPut("{id}")] //api/activities/createactivity
        public async Task<IActionResult> EditActivity(Guid id,[FromBody]Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

         [HttpDelete("{id}")] //api/activities/createactivity
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
            
        }
    }
}