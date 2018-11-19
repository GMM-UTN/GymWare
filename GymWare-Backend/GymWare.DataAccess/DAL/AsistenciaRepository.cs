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
        public string InsertAsistencia(string dni)
        {
            Cliente cliente = _db.Clientes.Where(x => x.Dni == dni).FirstOrDefault();
            if (cliente != null)
            {
                Membresia membresia = _db.Membresias.Where(x => x.Cliente.ClienteId == cliente.ClienteId).FirstOrDefault();
                if(membresia != null)
                {
                    if(membresia.FechaFin >= DateTime.Today)
                    {
                        Asistencia asistencia = new Asistencia();
                        asistencia.Cliente = cliente;
                        asistencia.Fecha = DateTime.Today.Date;
                        _db.Asistencias.Add(asistencia);
                        _db.SaveChanges();
                        return "Bienvenido de nuevo: " + cliente.Nombre + " !";
                    }
                    else
                    {
                        return "Su membresía se ha vencido. Cuando pague una nueva cuota se autorenovará y podrá registrar la asistencia";
                    }
                }
                else
                {
                    return "El cliente no cuenta con ninguna membresía. Cuando pague su primer cuota se autogenerará y podrá registrar la Asistencia";
                }
            }
            else
            {
                return "El dni ingresado no corresponde a ningún Cliente";
            }
        }

        public List<Asistencia> GetTodayAsistencias()
        {
            return _db.Asistencias.Where(x => x.Fecha == DateTime.Today).ToList();
        }

        public List<Asistencia> GetAsistenciasByUser(int id)
        {
            return _db.Asistencias.Where(x => x.Cliente.ClienteId == id).ToList();
        }
    }
}
