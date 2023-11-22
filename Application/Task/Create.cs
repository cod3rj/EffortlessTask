using Application.Core;
using Domain;
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

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            public Handler(DataContext context)
            {
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                throw new NotImplementedException();
            }
        }
    }
}