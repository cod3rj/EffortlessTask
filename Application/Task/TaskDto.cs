using Domain;
using Domain.Enum;

namespace Application.Task
{
    public class TaskDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsDoing { get; set; }
        public bool IsDone { get; set; }
        public Importance Importance { get; set; }

        // Additional properties specific to the DTO, if needed
        public string AppUserId { get; set; }
    }
}