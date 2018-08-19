using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymWare.Entities
{
    public class Membresia
    {
        public int MembresiaId { get; set; }
        [Column(TypeName = "date")]
        public DateTime FechaInicio { get; set; }
        [Column(TypeName = "date")]
        public DateTime FechaFin { get; set; }
        public virtual Cliente Cliente { get; set; }
        public virtual ICollection<Cuota> Cuotas { get; set; }
    }
}
