using Domain;
using Domain.Enum;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.ToDoLists.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "John Doe",
                        UserName = "john",
                        Email = "john@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane Doe",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "James",
                        UserName = "james",
                        Email = "james@test.com"
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var Tasks = new List<ToDoList>
                {
                    new ToDoList
                    {
                        Title = "Complete React Tutorial",
                        Category = "Learning",
                        DueDate = DateTime.Now.AddDays(7),
                        IsDoing = false,
                        IsDone = false,
                        Importance = Importance.Medium,
                        AppUserId = users[0].Id
                    },
                    new ToDoList
                    {
                        Title = "Implement User Authentication",
                        Category = "Development",
                        DueDate = DateTime.Now.AddDays(14),
                        IsDoing = true,
                        IsDone = false,
                        Importance = Importance.High,
                        AppUserId = users[1].Id
                    },
                    new ToDoList
                    {
                        Title = "Write API Documentation",
                        Category = "Documentation",
                        DueDate = DateTime.Now.AddDays(10),
                        IsDoing = false,
                        IsDone = false,
                        Importance = Importance.Low,
                        AppUserId = users[2].Id
                    },
                    new ToDoList
                    {
                        Title = "Refactor Task Service",
                        Category = "Development",
                        DueDate = DateTime.Now.AddDays(21),
                        IsDoing = false,
                        IsDone = false,
                        Importance = Importance.Medium,
                        AppUserId = users[2].Id
                    },
                    new ToDoList
                    {
                        Title = "Prepare Presentation",
                        Category = "Planning",
                        DueDate = DateTime.Now.AddDays(5),
                        IsDoing = true,
                        IsDone = false,
                        Importance = Importance.High,
                        AppUserId = users[2].Id
                    }
                };

                await context.ToDoLists.AddRangeAsync(Tasks);
                await context.SaveChangesAsync();
            }
        }
    }
}