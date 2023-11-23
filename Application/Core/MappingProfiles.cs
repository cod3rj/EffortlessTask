using Application.Task.DTO;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // CreateMap<Source, Destination>();
            // We are mapping from the source ToDoList to the destination TaskDto, e.g., ToDoList.Title to TaskDto.Title
            CreateMap<ToDoList, ToDoList>();

            // Add the reverse mapping if needed
            CreateMap<TaskDto, ToDoList>()
                .ForMember(d => d.AppUserId, o => o.MapFrom(s => s.AppUserId))
                .ReverseMap();
        }
    }
}