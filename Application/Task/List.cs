using System.Security.Claims;
using Application.Core;
using Application.Interfaces;
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
            private readonly IUnitOfWork _unitOfWork;

            public Handler(DataContext context, IMapper mapper, IUnitOfWork unitOfWork)
            {
                _unitOfWork = unitOfWork;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<TaskDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var Tasks = await _context.ToDoLists
                    .Where(x => x.AppUserId == _unitOfWork.UserAccessor.GetUsername())
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