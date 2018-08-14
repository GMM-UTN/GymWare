using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GymWare.Entities;

namespace GymWare.Entities.DTO
{
    public class DietaComidaDTO
    {
        public List<DietaComida> DietaComidas { get; set; }
        public Dieta Dieta { get; set; }

    }
}