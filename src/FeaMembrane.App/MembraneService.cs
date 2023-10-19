using AutoMapper;
using FEM2D.Structures;
using FEM2DCommon.DTO;
using FEM2DOutput.OutputCreator;
using Optional;
using StruCal.Membrane.App.DTO;

namespace StruCal.Membrane.App
{
    public class MembraneService
    {
        private readonly Structure structure;
        private readonly IMapper mapper;

        public MembraneService(IMapper mapper)
        {
            structure = new Structure();
            this.mapper = mapper;
        }

        public Option<MembraneOutputDataDTO> GetResults(MembraneInputDataDTO membraneDataDTO)
        {
            var membraneData = mapper.Map<MembraneInputDataDTO, MembraneInputData>(membraneDataDTO);
            structure.AddMembraneGeometry(membraneData);
            structure.Solve();

            return GenerateOutput(membraneData, structure.Results);
        }

        private Option<MembraneOutputDataDTO> GenerateOutput(MembraneInputData membraneData, FEM2D.Results.ResultFactory result)
        {
            var outputCreator = new OutputCreator(result, membraneData);

            if (outputCreator.HasError)
            {
                return Option.None<MembraneOutputDataDTO>();
            }

            outputCreator.CreateOutput();
            var output = mapper.Map<MembraneOutputData, MembraneOutputDataDTO>(outputCreator.Output);
            return Option.Some(output);
        }
    }
}