﻿using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimelinesAPI.DataVaults
{
    public class RecordEntity : TableEntity
    {
        public RecordEntity(string yearAsKey)
            : base(yearAsKey, KeyGenerator.NewKey())
        { }

        public RecordEntity() { }

        public DateTime Date { get; set; }
        public string Title { get; set; }
        public string Location { get; set; }
        public string ImageUrl { get; set; }
        public string ThumbnailUrl { get; set; }
    }
}
