﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.Membrane.App.DTO
{
    public class VertexInputDTO
    {
        public int Number { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int LoadX { get; set; }
        public int LoadY { get; set; }
        public bool SupportX { get; set; }
        public bool SupportY { get; set; }
    }
}