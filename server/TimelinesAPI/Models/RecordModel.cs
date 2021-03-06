﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimelinesAPI.Models
{
    public class RecordModel
    {
        public string Key { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public string Location { get; set; }
        public string ImageUrl { get; set; }
        public string ThumbnailUrl { get; set; }
    }
}
