using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymWare.Entities
{
    public class AsistenciaCalendar
    {
        public string title { get; set; }
        public DateTime start { get; set; }
        public DateTime end { get; set; }
    }
}