using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }

        // Each user has a list of tasks
        public ICollection<ToDoList> Tasks { get; set; } = new List<ToDoList>();
    }
}