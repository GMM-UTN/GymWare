using GymWare.Entities;
using GymWare.Logic;
using GymWare.Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace GymWare.API.Controllers
{
    public class RutinasController : ApiController
    {
        private RutinaEjercicioLogic _re = new RutinaEjercicioLogic();

        // GET: api/Rutinas
        public List<RutinaEjercicio> GetAllRutinasConEjercicios()
        {
            return _re.GetAllRutinasConEjercicios();
        }

        // GET: api/Rutinas/5
        [ResponseType(typeof(RutinaEjercicio))]
        public IHttpActionResult GetRutinaConEjercicio(int id)
        {
            RutinaEjercicio rutinaEjercicio = _re.GetRutinaConEjercicio(id);
            if (rutinaEjercicio == null)
            {
                return NotFound();
            }

            return Ok(rutinaEjercicio);
        }

        // PUT: api/Rutinas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRutinaConEjercicios(int idRutina, RutinaEjerciciosDTO rutinaEjerciciosDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            if (_re.Update(idRutina, rutinaEjerciciosDTO))
            {
                return Ok("Modificado correctamente");
            }
            else
            {
                return Ok("Error al modificar");
            }
        }

        // POST: api/Ejercicios
        [ResponseType(typeof(Ejercicio))]
        public IHttpActionResult PostEjercicio(Ejercicio ejercicio)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (_ej.Insert(ejercicio))
            {
                return CreatedAtRoute("DefaultApi", new { id = ejercicio.EjercicioId }, ejercicio);
            }
            else
            {
                return NotFound();
            }
        }

        // DELETE: api/Ejercicios/5
        [ResponseType(typeof(Ejercicio))]
        public IHttpActionResult DeleteEjercicio(int id)
        {
            if (_ej.Delete(id))
            {
                return Ok("Eliminado correctamente");
            }
            else
            {
                return Ok("Error al eliminar");
            }

        }
    }
}
