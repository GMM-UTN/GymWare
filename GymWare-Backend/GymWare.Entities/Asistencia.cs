using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymWare.Entities
{
    public class Asistencia
    {
        public int AsistenciaId { get; set; }
        public virtual Cliente Cliente { get; set; }
        [Column(TypeName = "date")]
        public DateTime Fecha { get; set; }
    }
}
