using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymWare.Entities
{
    public class MembresiaCuotaDTO
    {
        public int ClienteId { get; set; }
        public Cuota Cuota { get; set; }
    }
}
