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
    public class Details
    {
        public class Query : IRequest<Result<TaskDto>>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<TaskDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IHttpContextAccessor _httpContextAccessor;
            public Handler(DataContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor)
            {
                _httpContextAccessor = httpContextAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<TaskDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                var task = await _context.ToDoLists
                    .Where(x => x.AppUserId == user)
                    .ProjectTo<TaskDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<TaskDto>.Success(task);
            }
        }
    }
}