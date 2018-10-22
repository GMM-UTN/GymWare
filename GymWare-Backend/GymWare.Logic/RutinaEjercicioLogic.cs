using GymWare.DataAccess.DAL;
using GymWare.Entities;
using GymWare.Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymWare.Logic
{
    public class RutinaEjercicioLogic
    {
        private RutinaEjercicioRepository _re = new RutinaEjercicioRepository();
        private RutinaRepository _ru = new RutinaRepository();
        public List<RutinaEjerciciosDTO> GetAllRutinasConEjercicios()
        {
            var grouped = _re.GetAll().GroupBy(x => x.Rutina).Select(g => new {
                RutinaEjercicios = g.ToList(),
                Rutina = g.Select(site => new {
                    site.Rutina,
                }).FirstOrDefault()
            }).ToList();

            List<RutinaEjerciciosDTO> r = new List<RutinaEjerciciosDTO>();
            foreach (var g in grouped)
            {
                RutinaEjerciciosDTO rutinaEjercicioDTO = new RutinaEjerciciosDTO();
                rutinaEjercicioDTO.Rutina = g.Rutina.Rutina;
                rutinaEjercicioDTO.RutinaEjercicios = g.RutinaEjercicios;
                r.Add(rutinaEjercicioDTO);
            }
            return r;
        }

        public List<RutinaEjercicio> GetRutinaConEjercicios(int id)
        {
            return _re.GetOne(id);
        }

        public string Update(int idRutina, RutinaEjerciciosDTO rutinaEjercicio)
        {
            string resultado = _ru.Update(idRutina, rutinaEjercicio.Rutina);
            if (resultado == "Rutina modificada correctamente")
            {
                return _re.Update(idRutina, rutinaEjercicio.RutinaEjercicios);
            }
            else
            {
                return resultado;
            }
        }

        public string Insert(RutinaEjerciciosDTO rutinaEjercicio)
        {
            Rutina rutina = _ru.Insert(rutinaEjercicio.Rutina);
            if (rutina != null)
            {
                return _re.Insert(rutina, rutinaEjercicio.RutinaEjercicios);
            }
            else
            {
                return "Error al intentar crear la Rutina";
            }
        }

        public string InsertEmpleadoClienteRutina(EmpleadoClienteRutina empleadoClienteRutina)
        {
            return _ru.InsertEmpleadoClienteRutina(empleadoClienteRutina);
        }

        public string Delete(int idRutina)
        {
            return _ru.Delete(idRutina);
        }
    }
}
