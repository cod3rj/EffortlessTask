using Application.Task;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TaskController : BaseApiController
    {

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

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTask(int id, ToDoList task)
        {
            task.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Task = task }));
        }
    }
}