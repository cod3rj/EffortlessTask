using System.Security.Claims;
using Application.Core;
using Application.Task;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    [AllowAnonymous]
    public class TaskController : BaseApiController
    {

        private readonly IHttpContextAccessor _httpContextAccessor;

        public TaskController(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            // You may want to add validation and error handling here
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(int id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }
    }
}