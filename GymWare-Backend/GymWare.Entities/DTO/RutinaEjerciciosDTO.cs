using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GymWare.Entities;

namespace GymWare.Entities.DTO
{
    public class RutinaEjerciciosDTO
    {
        public List<RutinaEjercicio> RutinaEjercicios { get; set; }
        public Rutina Rutina { get; set; }
        
    }
}