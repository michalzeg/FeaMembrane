using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.Membrane.App.DTO
{
    public class MembraneInputDataDTO
    {
        public IList<VertexInputDTO> Vertices { get; set; }
        public IList<EdgeDTO> Edges { get; set; }

        public MembranePropertiesDTO Properties { get; set; }
    }
}