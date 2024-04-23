using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity,ActivityDTO>()
            .ForMember(d => d.HostUsername, o=> o.MapFrom(s=> s.Attendees
            .FirstOrDefault(x => x.IsHost).AppUser.UserName));
            CreateMap<ActivityAttendee,AttendeeDto>()
            .ForMember(d => d.DisplayName, o=> o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username, o=> o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, o=> o.MapFrom(s => s.AppUser.Bio))
            .ForMember(d => d.Image, s => s.MapFrom(o => o.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<AppUser, Profiles.Profile>()
            .ForMember(d => d.Image, s => s.MapFrom(o => o.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}