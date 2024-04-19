using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;

namespace Application.Activities
{
    //used to return our data with attendees for each activity when we call activities endpoint
    public class ActivityDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }

        //HostUsername to identify which attendee is host of the activity
        public string HostUsername { get; set; }

        public bool IsCancelled { get; set; }
        public ICollection<Profile> Attendees { get; set; }


    }
}