using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.Membrane.App.DTO
{
    public class TriangleOutputDTO
    {
        public int Number { get; set; }
        public IEnumerable<NodeOutputDetailedDTO> Nodes { get; set; }
        public double Sxx { get; set; }
        public double Syy { get; set; }
        public double Txy { get; set; }
    }
}