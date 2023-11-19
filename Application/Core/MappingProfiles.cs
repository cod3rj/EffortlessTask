using Application.Task;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // CreateMap<Source, Destination>();
            // We are mapping from the source ToDoList to the destination TaskDto e.g ToDoList.Title to TaskDto.Title
            CreateMap<ToDoList, TaskDto>()
                .ForMember(d => d.AppUserId, o => o.MapFrom(s => s.AppUserId));
        }
    }
}