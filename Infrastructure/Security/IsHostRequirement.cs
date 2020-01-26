using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistance;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly DataContext _context;

        public IsHostRequirementHandler(IHttpContextAccessor contextAccessor, DataContext context)
        {
            _contextAccessor = contextAccessor;
            _context = context;
        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, 
            IsHostRequirement requirement)
        {
            var currentUsername = _contextAccessor.HttpContext.User.Claims?
                .SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            var activityId = Guid.Parse(_contextAccessor.HttpContext.Request.RouteValues.SingleOrDefault(x => 
                x.Key == "id").Value.ToString());

            var activity = _context.Activities.FindAsync(activityId).Result;

            var host = activity.UserActivities.FirstOrDefault(x => x.IsHost);

            if (host?.AppUser?.UserName == currentUsername)
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}