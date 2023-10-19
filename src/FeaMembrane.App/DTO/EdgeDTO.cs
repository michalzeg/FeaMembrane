using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.Membrane.App.DTO
{
    public class EdgeDTO
    {
        public int Number { get; set; }
        public VertexInputDTO Start { get; set; }
        public VertexInputDTO End { get; set; }
        public int LoadX { get; set; }
        public int LoadY { get; set; }
    }
}