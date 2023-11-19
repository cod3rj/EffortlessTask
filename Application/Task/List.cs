using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Task
{
    public class List
    {
        public class Query : IRequest<Result<List<TaskDto>>>
        {
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<TaskDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<TaskDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var Tasks = await _context.ToDoLists
                    .Where(t => t.AppUserId == request.UserId)
                    .ProjectTo<TaskDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                if (Tasks == null) return null;

                if (Tasks.Count == 0) return Result<List<TaskDto>>.Failure("No Tasks found");

                return Result<List<TaskDto>>.Success(Tasks);
            }
        }
    }
}