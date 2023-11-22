using Application.Interfaces;
using Application.Interfaces.Repository;
using Infrastructure.Security;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private DataContext _db;
        private IHttpContextAccessor _httpContextAccessor;
        public IUserAccessor UserAccessor
        { get; private set; }

        public UnitOfWork(DataContext db, IHttpContextAccessor httpContextAccessor)
        {
            _db = db;
            _httpContextAccessor = httpContextAccessor;
            UserAccessor = new UserAccessor(_httpContextAccessor);
        }
    }
}