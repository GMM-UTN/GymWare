using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymWare.Entities
{
    public class Membresia
    {
        public int MembresiaId { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public virtual Cliente Cliente { get; set; }
        public virtual ICollection<Cuota> Cuotas { get; set; }
    }
}
