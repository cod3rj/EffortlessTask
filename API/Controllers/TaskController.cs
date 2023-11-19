using Application.Task;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class TaskController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
    }
}