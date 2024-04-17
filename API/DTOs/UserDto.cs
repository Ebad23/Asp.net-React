using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UserDto
    {
        //when user is registered or log in we want to send information of these fields to the database
        public string DisplayName  { get; set; }
        public string Token { get; set; }
        public string Image  { get; set; }
        public string Username { get; set; }

    }
}