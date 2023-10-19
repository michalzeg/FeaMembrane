using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.Membrane.App.DTO
{
    public class MembraneOutputDataDTO
    {
        public double TxyPercentile005 { get; set; }
        public double TxyPercentile095 { get; set; }
        public double SyyPercentile005 { get; set; }
        public double SyyPercentile095 { get; set; }
        public double SxxPercentile005 { get; set; }
        public double SxxPercentile095 { get; set; }
        public double MinTxy { get; set; }
        public double MinSyy { get; set; }
        public double MinSxx { get; set; }
        public double MaxTxy { get; set; }
        public double MaxSyy { get; set; }
        public double MaxSxx { get; set; }
        public IEnumerable<TriangleOutputDTO> Triangles { get; set; }
        public IEnumerable<NodeOutputDTO> Nodes { get; set; }

        public MembraneInputDataDTO InputData { get; set; }
        public double MaxUx { get; set; }

        public double MaxUy { get; set; }
    }
}