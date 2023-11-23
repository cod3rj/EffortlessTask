using Application.Core;
using Application.Task.Validations;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Task
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ToDoList Task { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(a => a.Task).SetValidator(new TaskValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var task = await _context.ToDoLists.FindAsync(request.Task.Id);

                if (task == null) return null;

                _mapper.Map(request.Task, task);

                // Save the changes if the result is greater than 0
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update the task"); // If the result is false we return a failure

                return Result<Unit>.Success(Unit.Value); // If the result is true we return a success with the unit value
            }
        }
    }
}