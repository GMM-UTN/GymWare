using GymWare.Entities;
using GymWare.Entities.DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymWare.DataAccess.DAL
{
    public class AsistenciaRepository : BaseRepository
    {
        public Asistencia InsertAsistencia(string dni)
        {
            Cliente cliente = _db.Clientes.Where(x => x.Dni == dni).FirstOrDefault();
            if (cliente != null)
            {
                Asistencia asistencia = new Asistencia();
                asistencia.Cliente = cliente;
                asistencia.Fecha = DateTime.Today.Date;
                _db.Asistencias.Add(asistencia);
                _db.SaveChanges();
                return asistencia;
            }
            else
            {
                return null;
            }
        }
    }
}
