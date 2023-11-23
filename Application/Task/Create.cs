using Application.Core;
using Application.Interfaces;
using Application.Task.Validations;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Task
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ToDoList Task { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Task).SetValidator(new TaskValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IUnitOfWork _unitOfWork;
            private readonly DataContext _context;
            public Handler(DataContext context, IUnitOfWork unitOfWork)
            {
                _context = context;
                _unitOfWork = unitOfWork;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = _unitOfWork.UserAccessor.GetUsername();

                request.Task.AppUserId = user;

                _context.ToDoLists.Add(request.Task);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create task");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}