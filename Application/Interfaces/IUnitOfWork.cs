using Application.Interfaces.Repository;

namespace Application.Interfaces
{
    public interface IUnitOfWork
    {
        IUserAccessor UserAccessor { get; }
    }
}