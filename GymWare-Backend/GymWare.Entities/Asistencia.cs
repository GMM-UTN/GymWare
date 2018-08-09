using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymWare.Entities
{
    public class Asistencia
    {
        public int AsistenciaId { get; set; }
        public virtual Cliente Cliente { get; set; }
        public DateTime FechaHoraIngreso { get; set; }
        public DateTime FechaHoraEgreso { get; set; }
    }
}
