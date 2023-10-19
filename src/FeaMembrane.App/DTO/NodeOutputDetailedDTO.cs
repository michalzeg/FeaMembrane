using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.Membrane.App.DTO
{
    public class NodeOutputDetailedDTO : NodeOutputDTO
    {
        public double AvgSxx { get; set; }
        public double AvgSyy { get; set; }
        public double AvgTxy { get; set; }
    }
}