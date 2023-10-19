using AutoMapper;
using FEM2DCommon.DTO;
using FEM2DCommon.ElementProperties;
using StruCal.Membrane.App.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StruCal.Membrane.App.Automapper
{
    public class MembraneProfile : Profile
    {

        public MembraneProfile()
        {
            CreateMap<Edge, EdgeDTO>();
            CreateMap<EdgeDTO, Edge>();

            CreateMap<MembraneInputData, MembraneInputDataDTO>();
            CreateMap<MembraneInputDataDTO, MembraneInputData>();

            CreateMap<MembraneOutputData, MembraneOutputDataDTO>();

            CreateMap<MembraneProperties, MembranePropertiesDTO>();
            CreateMap<MembranePropertiesDTO, MembraneProperties>();

            CreateMap<NodeOutputDetailed, NodeOutputDetailedDTO>();

            CreateMap<NodeOutput, NodeOutputDTO>();

            CreateMap<TriangleOutput, TriangleOutputDTO>();

            CreateMap<VertexInput, VertexInputDTO>();
            CreateMap<VertexInputDTO, VertexInput>();
        }
    }
}