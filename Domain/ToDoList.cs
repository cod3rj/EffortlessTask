using Domain.Enum;

namespace Domain
{
    public class ToDoList
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsDoing { get; set; }
        public bool IsDone { get; set; }
        public Importance Importance { get; set; }

        // Each Task has a user assigned to it 
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}