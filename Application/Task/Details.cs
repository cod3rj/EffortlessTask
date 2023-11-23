using Application.Core;
using Application.Interfaces;
using Application.Task.DTO;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
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
            private readonly IUnitOfWork _unitOfWork;
            public Handler(DataContext context, IMapper mapper, IUnitOfWork unitOfWork)
            {
                _unitOfWork = unitOfWork;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<TaskDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var task = await _context.ToDoLists
                    .Where(x => x.AppUserId == _unitOfWork.UserAccessor.GetUsername())
                    .ProjectTo<TaskDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<TaskDto>.Success(task);
            }
        }
    }
}