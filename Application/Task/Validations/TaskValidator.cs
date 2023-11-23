using Domain;
using FluentValidation;

namespace Application.Task.Validations
{
    public class TaskValidator : AbstractValidator<ToDoList>
    {
        public TaskValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.DueDate).NotEmpty();
            RuleFor(x => x.Importance).NotEmpty();
        }
    }
}