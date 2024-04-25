using System.Runtime.InteropServices;
using System.Security.Cryptography.X509Certificates;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command: IRequest<Result<CommentDto>>
        {
            public string Body { get; set; }
            public Guid ActivityId { get; set; }
        }

        public class CommandValiator : AbstractValidator<Command>
        {
            public CommandValiator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<CommentDto>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;    
            }
            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FirstOrDefaultAsync(a => a.Id == request.ActivityId);

                if (activity == null) return null;

                var user = await _context.Users.Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var comments = new Comment
                {
                    Body = request.Body,
                    Activity = activity,
                    Author = user
                };

                activity.Comments.Add(comments);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    return Result<CommentDto>.Success(_mapper.Map<CommentDto>(comments));
                }

                return Result<CommentDto>.Failure("Failed to add comment");
            }
        }
    }
}