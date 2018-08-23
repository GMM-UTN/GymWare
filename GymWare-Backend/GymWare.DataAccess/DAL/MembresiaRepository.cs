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
    public class MembresiaRepository : BaseRepository
    {
        public Membresia InsertUpdateMembresia(MembresiaCuotaDTO membresiaCuotaDTO)
        {
            Membresia mem = _db.Membresias.Where(x => x.Cliente.ClienteId == membresiaCuotaDTO.ClienteId).FirstOrDefault();
            if (mem != null)
            {
                if(mem.FechaFin > DateTime.Today)
                {
                    mem.FechaFin = mem.FechaFin.AddMonths(membresiaCuotaDTO.Cuota.CantidadMeses);
                }
                else
                {
                    mem.FechaInicio = membresiaCuotaDTO.Cuota.FechaPago;
                    mem.FechaFin = mem.FechaInicio.AddMonths(membresiaCuotaDTO.Cuota.CantidadMeses);                    
                }
                mem.Cuotas.Add(membresiaCuotaDTO.Cuota);
                _db.SaveChanges();
                return mem;
            }
            else
            {
                Membresia membresia = new Membresia();
                membresia.FechaInicio = membresiaCuotaDTO.Cuota.FechaPago;
                membresia.FechaFin = membresia.FechaInicio.AddMonths(membresiaCuotaDTO.Cuota.CantidadMeses);
                Cliente cliente = _db.Clientes.Find(membresiaCuotaDTO.ClienteId);
                if (cliente != null)
                {
                    membresia.Cuotas = new List<Cuota>();
                    membresia.Cliente = cliente;
                    membresia.Cuotas.Add(membresiaCuotaDTO.Cuota);
                    _db.Membresias.Add(membresia);
                    _db.SaveChanges();
                    return membresia;
                }
                else
                {
                    return null;
                }
            }
        }
    }
}
