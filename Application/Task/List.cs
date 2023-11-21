using System.Security.Claims;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Task
{
    public class List
    {
        public class Query : IRequest<Result<List<TaskDto>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<TaskDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public Handler(DataContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor)
            {
                _mapper = mapper;
                _context = context;
                _httpContextAccessor = httpContextAccessor;
            }

            public async Task<Result<List<TaskDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

                var Tasks = await _context.ToDoLists
                    .Where(x => x.AppUserId == user)
                    .OrderByDescending(x => x.Importance)
                    .ThenBy(x => x.DueDate)
                    .ProjectTo<TaskDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                if (Tasks == null) return null;

                if (Tasks.Count == 0) return Result<List<TaskDto>>.Failure("No Tasks found");

                return Result<List<TaskDto>>.Success(Tasks);
            }
        }
    }
}