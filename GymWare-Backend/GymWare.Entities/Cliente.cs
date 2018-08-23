using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymWare.Entities
{
    public class Cliente : Usuario
    {
        public int ClienteId { get; set; }
        public int PesoInicial { get; set; }
        public int AlturaInicial { get; set; }
        public int PesoActual { get; set; }
        public int AlturaActual { get; set; }
        //public virtual ICollection<Asistencia> Asistencias { get; set; }
    }
}
